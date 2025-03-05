---
date: 2013-03-19
aliases:
  - /code-intent-does-it-matter
title: Code intent - does it matter?
slug: Code-intent-does-it-matter
summary: Does it really matter _why_ a piece of code was written, or should function be sufficient?
---

I recently read an [article](http://mikegrouchy.com/blog/2013/03/yes-your-code-does-need-comments.html) which argued the case for code comments. The writer expressed the view, that while comments explaining what code does are mostly useless, comments remain the best way to express the intent of code. On the surface that’s something I’d broadly agree with, the idea that, as it is elsewhere expressed, comments are for “why”, not “how”.
 
However there was something about Mike’s phrasing of it which caught my attention, the use of the word “intent”, and specifically talk of the “original intent”.

A quick dictionary lookup defines intent as “Something that is intended; an aim or purpose”, which when applied to code, would mean how it is intended a piece of code should be used, what its purpose in a wider system is.

Now it may be true that a comment is a fair way of expressing intent, but I’m not sure I should want to know it. Why should I care to what purpose the piece of code I am reading was originally created? Surely, my aim in striving for loosely coupled, tightly focussed code is that consumers don’t need to know or care what use it was originally written for - it should be equally applicable, without surprises, in any other context for which its functionality fits. How the code behaves ought to be our only consideration.

The writer of the piece proposes three reasons we would want to capture the “original intent” of a piece of code:

* It allows a developer, at a glance, to look at a piece of code and know why it exists.
* It reduces situations where a piece of codes original intent isn't clear then gets modified and leads to unintended regressions.
* It reduces the amount of context a developer must hold his/her mind to solve any particular problem that may be contained in a piece of code.

Of these it seems to me that the first is really a restatement of the original position - comments tell us why something was written. Again, this does not justify why I would want to know this.

The second reason probably resonates with most of us. We’ve surely all had to track down and fix bugs which ended up being caused by a developer, perhaps even ourselves, modifying a piece of code they were using without realising that some other code was depending on its original functionality. But where does the mistake really lie in these scenarios and are comments explaining our use of the code really the answer? It seems to me that a better solution revolves around tests. When developers regress our functionality by unintentionally changing the functionality of a class we depend on, then it ought to be caught by the tests for that dependency. If there was no test for that functionality, then there probably ought to have been. If a developer intentionally changes the functionality of a piece of code for their purposes, not realising that we were depending on it, then again a test ought to have picked it up. If we assume that the code in question had tests for all its functionality, and no functionality was added in which was not yet needed, then it should hold that any change of functionality which will break another consumer ought to break a test and should not be performed. This brings us round to the “open closed principle” which encourages us to modify the behaviour of code for new purposes through extension mechanisms which do not interfere with the functionality existing purposes may rely on. Again though, we shouldn’t need a comment, with its inherent fragility, to tell us what other code may be relying on.

The final point I disagree with. Surely comments which tell us about how other consumers use a piece of code is either irrelevant, in which case why burden me with reading it, or is relevant, in which case why is this code so coupled to the original use case that I need to know it. Far from keeping me from having to know too much about the rest of the system, such a comment introduces the, possibly incorrect, idea that I perhaps ought to be loading more context into my head than I want to in order to consume a piece of code.

Of course as with all forms of comments, omitting all “intent” comments is, for me at least, somewhat aspirational. While I’d argue we shouldn’t be happy writing them, there are no-doubt places where I would find myself resorting to them. Such comments feel like an admission of failure to properly decouple my code, but then sometimes there’s a difficult gap between recognising your code has issues to knowing how to actually fix them! So until I become the perfect coder, I guess you’ll probably still see the occasional comment from me too.
