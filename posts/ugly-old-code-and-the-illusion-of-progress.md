---
date: 2011-05-03
aliases:
  - /ugly-old-code-and-the-illusion-of-progress
title: Ugly Old Code and the Illusion of Progress
slug: Ugly-Old-Code-and-the-Illusion-of-Progress
---

I’ve seen the opinion thrown out quite a few times in various forums such as StackOverflow answers and comments, that one way you can tell your improving as a developer is if you look back at code your wrote some time ago and find it ugly. The implication being that, since you found the code acceptable at the time, but now see fault in it, your skills must have improved in the interim.
 
I disagree. It can mean your skills have improved, but it doesn’t necessarily mean that. Lets consider a few of things that can change between writing code and reading it again.

* Your skills can improve
* You can learn more about the framework / libraries you are using
* You can learn more about the problem space
* The requirements can change
* You can forget things

Hopefully the first of these is happening to some degree, and as suggested will often lend a certain odor to older code. Crucially however, improved abilities aught to mainifest themselves with ideas of a better solution, generally taking into account prinicples and truths with you discovered or learnt since the code was first written. I find early code of mine often makes over eager use of inheritance over composition and lumps together disperate responsibilities which really aught to be seperate classes, not to mention the lack of unit tests. These are all smells with a clear path to improvement. Of course on finding such code, rather than just patting yourself on the back for your improved abilities, the smart thing to do is to add the tests (if not present) and refactor it!
 
The same goes for the second and third reasons, such increased understanding of systems and problems is a natural consequence of working with them, and should over time lead to more idiomatic solutions which map more naturally to the domain. Again, refactoring is a smart response.
As for requirements changing, its a fact of life. If we did things right, (and were a little bit lucky) our earlier decisions shouldn't make too many obstacles for us, but something’s still going to be out of date or missing somewhere.

Perhaps the last of these possibilities is the dark horse though, the reason which is behind more old code smells than we perhaps realise. When we read anything, especially code, what we are actually reading is the information contained in what is written, combined with the knowledge we already have in our heads. Thus, reading code we are actively working on, we are benefitting from a relatively good understanding of the problem and solution already contained in our heads. When we come back to it later however, we are going in dark, with only the code to guide us. The resulting feel we get for the code is likely to be a lot more objective than our initial satisfaction.

This distance imposed by time is especially tough on abstractions. Good abstractions walk a fine line between revealing too much, and saying too little, which can be difficult to judge when we already know what lies behind them. Of course its not just our interfaces and classes which are abstractions, its our method signatures and variable names too. Unfortunately, that pretty much covers all our code!

So what should we do about this stinky old code? As with the other changes, we can make use of our new perspective and refactor the code now that we’ve found it. Going forward however, we should bear in mind that the perceived clarity of today's code may be an illusion, and ensure that we are being proactive about refining our skills rather than misreading old code as a sign that they are. Furthermore we can try to short-circuit the process of digging up old code and seek out the more distant perspective early on, both by critical reading, and more effectively through code review. This is perhaps an aspect where code review has an edge over pair programming, as the reviewer is likely to come to the code colder than an co-programmer and thus have a more distant, objective opinion of it.