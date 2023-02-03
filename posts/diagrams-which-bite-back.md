---
date: 2013-02-21
aliases:
  - /diagrams-which-bite-back
title: Diagrams which bite back
slug: Diagrams-which-bite-back
---

One of the key ideas behind executable specifications, is that they form a set of specifications which “bite back”. Rather than just stating how the system should ought to work, and maybe did at some point in history, they can be executed to verify the facts they state still hold true to the reality of the system.
Thinking about this behaviour driven development practice got me wondering if we could extend the idea of documents which bite back beyond specifications - are there other things we produce which have a tendency to become stale which can be held to account through some form of executable bindings?

Now when we were attempting to optimise for agility, we should be following the mantra of “Working software over comprehensive documentation” and focusing on those documents which are actually going to be read and provide some benefit to people. After all, the easiest document to keep up to date is the document you never have to write.

That said however, there are documents which can be useful. Perhaps one of the most useful are UML-ish diagrams representing the system at a high level, or the domain model. When carefully focussed on providing a high level view, rather than trying to be the last word on every detail, these can make it much easier for newcomers to a project to get up to speed and grasp the big picture. Like other documents though, these become worse than useless if they become out of date, and misleading.

So can we borrow some ideas from executable specifications and apply them to diagrams, extracting verifiable facts from them by which they can be held to account against the code?

At this point some people would probably point out that we could go one step further and just generate the diagrams directly from the source. Indeed we could, there are plenty of tools for doing that. But just how useful are those diagrams? We’ve all seen diagrams which lay out every detail without any indication or understand of which are the important parts - the result tries to tell you so much that it tells you nothing. A good diagram’s value is in what the author chooses to leave out. So wouldn’t it be good if we could leave the authoring to people, and repurpose these code analysis engines to be our fact checkers.