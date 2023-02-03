---
date: 2016-05-15
title: Functional Programming - Reducing Your Problem
slug: functional-programming-reducing-your-problem
---


## Elixir
Recently I've been tending to think and build in Elixir. To a first approximation Elixir is a new front-end to the Erlang language and run time, and as such carries with it many of Erlang's properties such as a penchant for robust concurrency and many ideas with a functional leaning.

## Functional Programming
The canonical set of properties required make a language "functional" is often argued by those who wish to make spoken language as clear cut as code, while the reality is somewhat more blurred. There are however a number of beneficial traits which do tend compliment one another and can be usefully termed "functional". Elixir and co have several, though not all, of these and as a result require and promote a different approach to problem solving than more "OOP" or procedural environments.

As I've increasingly leaned to a functional style for several years and have picked up a few functional languages in the last few years I thought I'd write a post or two on some of the patterns I've picked up.

## Reduce
In this post I'd like to take a moment to discuss the reduce function. Many of us first come across the reduce function as the more confusing sibling of `map` and `filter` the other 2 workhorses of functional programming which have snuck into most modern languages. Initially most people find `map` and especially `filter` more directly useful as they solve problems they are used to solving with explicit loops with less ceremony. However, the more we begin to adopt a functional approach or languages in which mutation of state is avoided or forbidden, the more we begin to see the utility of reduce.

As a quick refresher, the reduce function acts upon a sequence of items and returns a single 'reduced' value. To start the process we supply an initial value, sometimes called the state or accumulator, which is then evolved by passing to a user supplied 'reducer' function for each item in the sequence. Each time our reducer is called it is passed both the current value of the accumulator, and the current sequence item, and is expected to return a new value for the accumulator which has incorporated any information we chose from that item. Once our reducer has been called for each item, reduce returns the final value.

At a first glance the reduce function may seem a slightly cumbersome way to find the min or max of a collection, or turn a list into a dictionary, yet when we look closer it's significance is more fundamental.

If we think of the state of our problem domain as the accumulator, then the sequence items become the events by which it can change, and our reducer a specification for how these changes are made. The essence of a state machine.

This is the way Erlang's OTP framework encourages us to build our applications. We essentially customise a generic server (or GenServer) by supplying a reduce function which teaches it how to update its state for each type of message it might return.

Of course we don't have to be using Erlang, Elixir or even a functional programming language to make use of this pattern, it can clarify our thinking and our code in many situations.
