---
date: 2016-12-15
title: Typescript Initial Impressions
---

This last week I've been using TypeScript to write a small service at work. I've not previously used TypeScript, but had been planning to try it for some time.

In short, I found it a surprisingly pleasant experience overall. Initially of course I was slowed down compared to familiar JavaScript, but I'd estimate by the end of day two, I was already experiencing a net speed up. It was surprising how many small mistakes I was making, and TypeScript was picking up, eliminating many test (or execute) and debug cycles. In fact I believe I only experienced two occasions of unexpected run-time behaviour while developing the whole service, and both of these were edge cases.

The type system *generally* feels like it's on your side rather than working against you.

For the last few years I've primarily worked in node.js using JavaScript, however I've also written a fair amount in functional languages on personal projects, and prior to both started out in static languages such as C++ and C#.

Like many, in JavaScript I found a great deal of freedom and valued the ability to express things which seemed impossible in static languages, but at the cost of the compiler's safety and the convenience of static tooling. As I began to explore typed functional languages however, I started to realise that much of the "freedom" available in dynamically typed JavaScript was actually still available in these static languages. Much of the resistance to static languages many people feel, is in fact a reflection of how poor many common type systems are.

While I'm still an advocate of functional languages, they bring quite a few ideas new to many developers, and as such can require quite a jump for many dev teams to adopt. TypeScript's type system however borrows many ideas from functional languages and so can bring some of the power of algebraic types to a much more familiar environment with excellent JavaScript interop.

Overall I anticipate reaching for TypeScript again in the next project I begin.
