---
date: 2016-05-21
title: Functional Programming - Keep the Outside, Outside
slug: functional-programming-outside-outside
summary: Looking at the functional programming pattern of keeping the messy details of the real world at the periphery of the system
---

In this post I'd like to continue looking at patterns used within functional programming.

## Pure Functions
Prominent among the "functional" ideas is a preference for "pure" functions as the core building blocks of solutions. Such functions have one role, to return a consistent result from their given arguments, with no side effects or hidden inputs. This preference contrasts starkly with the object oriented style, in which functions are recommended or forced to exist as "methods" acting on and upon state encapsulated within the host object.

For those coming from an object oriented background this can feel like cutting off our hands at first. We may question how our application is supposed to *do* anything if it can neither change it's own state, or the environment in runs in through it's pure functions?

In our previous post we looked at how we can "update" state by reducing over a stream of inputs. Now we turn our attention to how a functional program can affect the outside world. The patterns which address this  will vary from language to language but essentially involve arranging code such that the smallest amount need care about such "impure" matters.

## Example
Let's take for example an application which subscribes to and sends messages via RabbitMQ.

Separation of concerns would lead thoughtful developers in any paradigm to try and keep the details of the external service segregated from the primary application logic. OOP developers would generally create a class representing the service and call it from the business logic. Those with an eye on testability would most likely consider the dependency inversion principle and write their business code against an abstraction which would be injected from without.

At this point we would have done a lot to make our code more maintainable, yet our business code would still be indirectly calling code with side effects, and thus would itself be impure. In fact the OOP approach of wrapping externals in abstractions and passing them inwards, tends to result in external effects occurring at the deepest layers of the callstack, with the greatest amount of code made impure.

A common pattern for limiting the contagion of impurity and its disadvantages, is to turn the call stack on its head and have the business logic occupy the inner levels of the stack while the mucky real world is kept at the surface.

In this pattern we write our business logic as pure functions, similar to the reducers we considered in the previous post. Like reducers these functions are passed some representation of an event from the outside world, along with any state, from which they are expected to return new state. This gives us a way to update state in response to external events, but we still need a way for our business logic to initiate changes *to* the outside world. Fortunately only a small embellishment to the reducer pattern is required. Rather than simply returning updated state after each invocation, we now return a tuple containing both the updated state, plus a list describing any actions we wish to initiate. These actions can then be interpreted further up the callstack to be executed outside of our pure code. This pattern is at the heart of Erlang's GenServer, the Elm architecture and React's Redux store among others.

To use the RabbitMQ example I recently encountered in an Elixir personal project, I structured things such that the RabbitMQ logic lived in a module which could wrap a business module, much the same way the OTP GenServer code wraps other user code. The RabbitMQ module would receive messages from queues and pass them into the pure business code along with any state from previous invocations. The business code would then return with a tuple of new state, plus a list of any actions to perform, such as messages to send or topics to subscribe to. Testing this business code then becomes trivial. There are no stubs or mocks to pass into the business code, we can just call it with some starting state, and a message and assert our expectations of its returns.
