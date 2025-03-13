---
date: 2025-03-13
title: Analysing Table Acesss Patterns with Language Server Protocol Scripting
---

## The Problem
I work in a system in which there are a few DynamoDb tables used widely across many of the services. It's he classic "integration on the database" situation with all the tradeoffs that brings.

As a team, we'd like to better understand which parts of the system are using which tables, and furthermore which fields they're reading and writing so we can begin to explore alternatives from a well informed position.

## The Approach
Access to the tables is mediated by a shared library (a python package) which overlays a thin abstraction around common item retrieval patterns and provides a typed wrapper to the items thus retrieved.

Within an individual service, we can investigate whether a given table is being used by finding references to the appropriate wrapper class, and where a field is being accessed by finding references to the appropriate typed item wrapper property.

It occurred to me that these semi-manual investigations are being powered by my editor's interaction with a python LSP (language server protocol... server), but this needn't be such a manual interaction. LSP is a shared protocol understood by a client (my editor in this case) and the LSP server (Pyright), but in theory we could have some sort of script acting as the client, systematically querying within a code-base for references to each property on each wrapper class to discover which sub-set of the table fields that service is using.

## Solution Details
At first I tried looking into how to form the appropriate (JSON-RPC) queries and how to send them to Pyright, but I soon gave up on this in favour of [mulilspy](https://github.com/microsoft/multilspy), a library from Microsoft which describes itself as an "LSP client library in Python to build applications around language servers".

We essentially need two types of LSP queries, one to find the methods of a target class, and another to find references to each of those methods within the codebase of interest.

LSP is a protocol designed for use by editors, and as such the operations it describes are closely matched to that use case. LSP queries are generally addressed at a given notional cursor position, a tuple of filename, line number, and column, while the results are generally described in terms of spans of such positions in which the relevant code is found.

### Finding the target class
Given that LSPs operate in "code space", our first task therefore is actually to discover the file which contains a the target class. This can be achieved using python standard library functionality:
```python
import importlib.util

def find_module_file(module_name: str, project_root: Path) -> Path:
    module_spec = importlib.util.find_spec(module_name)
    assert module_spec
    assert module_spec.origin is not None
    module_file_path = Path(module_spec.origin)
    relative_path = module_file_path.relative_to(project_root)
	return relative_path

```

### Discovering the class methods
Given the path of the file containing the class of interest, we can use multilspy to start the LSP (managed via a python context manager) and query it for the symbols available in the file via 
```python
symbol_list, symbol_tree = lsp.request_document_symbols(target_file_path)
```

Symbols have, among other things, a name, a type (enum value), and a range of text positions (line and column number) in which they are found. Unfortunately, the more useful tree representation of the symbols is not returned for all LSPs, which was the case for me, however we can process the symbol list to find the class and its methods by checking which methods are within the text span of which classes.

### Finding Usages
With a list of symbols representing the method of our target class, we can loop through each, querying the LSP for references, and building up a map of method name to uses. Once again, since LSPs operate on cursor positions, we query for the usage of each method by passing in a file name, line, and column within the name of method definition:
```python
method_position = method_symbol["selectionRange"]["start"]

references = lsp.request_references(
  file_path,
  line=method_position["line"] 
  column=method_position["character"] # note the inconsistency 
)
```

### Tidying up the Results
Given in our use case we are looking for use of several library classes within a code base, we are only interested in the references to those class methods from within _our_ code, not references within the _library_. Thus we can filter the returned results to remove those with a relative path starting with `.venv`.

## Next Steps
The current tool I've built is invoked on a single codebase, with a single target class and returns the references to each of the class' methods. In order to get the overview of which class properties, and by extension table fields, are used in which services usage across our solution the next step is to wire it in to our CI such that each codebase is analysed and the results forwarded to a central store at build time. From that central store we can then combine the results to see which codebases use with properties, and thus which table fields.
