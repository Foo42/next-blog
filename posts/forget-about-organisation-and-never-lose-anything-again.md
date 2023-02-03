---
date: 2019-09-25
title: Forget About Organisation And Never Lose Anything Again
slug: forget-about-organisation-and-never-lose-anything-again
---

# Forget About Organisation And Never Lose Anything Again

## The Problem
I'm sure all but the most organised of us have at some time been in that situation where we cannot find something we need despite looking in all the "sensible" places for it, and often in many of the senseless ones too. If you're like me you've perhaps wished you could just google your house to find things. This is all the more frustrating when we remember we put it "somewhere safe".

The trouble is of course, that unless we have a clear memory of placing the item, we rely on recreating the logic we used to allocate a place for it in the first place. Such choices are usually a mix of several factors such as size and ease of access not to mention trying to pick from one of many competing ways to categorise the item in order to place it with its kin.

This last factor is often the most challenging to decide on, and hardest to reproduce when looking for the item. I often find that categorising the most ambiguous items takes up a disproportionate amount of energy when tidying, and thus these things make up the lion's share of clutter left on surfaces or shoved in _that_ draw as my tired self defers the decision.

## A Solution?
I remember hearing once (probably while reading "The Everything Store") that Amazon neatly sidesteps the question of categorising their stock in distribution centres by placing items "randomly" wherever there is space for them, and relying on their computer system to recall where that was. In their case this has the additional benefit that pickers are less likely to collect the wrong item when it isn't stored alongside hundred of similar, but incorrect, items.

It occurs to me that a similar approach could be taken to home organisation. If one ensured there was sufficient storage locations in the house, in a variety of sizes, then one could place things anywhere they fit, as long as there was a system to track it.

Such a system would rely on an unambiguous way to identify storage locations and items within them. This could be achieved by allocating some id to each and either inscribing or labelling them with it. All that would then be needed to track everything would be a ledger of item descriptions and placements. For example
```
DEFINE box-a "white shoebox"
DEFINE hammer-a "claw hammer"
PUT hammer-a in box-a
```

Such a ledger could be processed to attain each item's most recent description and placement (via a `reduce`). Any item could then be found by entering a few descriptives words which could be used to search the known items' descriptions to discover the target item's id, then finding that item's last placement, using the description of its container to provide a richer result.

Furthermore, since storage locations themselves have ids, they too could be placed within other locations.
```
DEFINE cupboard-a "Large brown cupboard"
PUT box-a in cupboard-a
```

Perhaps even
```
DEFINE bedroom-1 "Master bedroom"
PUT cupboard-a in bedroom-1
```

Thus defined, any item exists within a tree of locations, in much the same way a file exists within a tree of directories on your computer. Like a file, an item's location can therefore be represented as a path such as `bedroom-1/cupboard-a/box-a` or perhaps more usefully "The claw hammer is in the white shoebox, in the large brown cupboard, in the master bedroom" after substituting the items' descriptions.

## Drawbacks & Implementation Considerations
Like most ideas, this one clearly has some drawbacks, and its effectiveness would be recognised by the degree to which its advantages out weighed its disadvantages. Most obviously it imposes an administrative burden on simply putting something away, and since the systems utility depends upon the ledger being up-to-date there is a risk of the book keeping slipping, and the whole system degrading into a log of where things _once_ lived.

The likely success of such a system therefore depends on the "transaction cost" of updating an entry and thus stands or falls on ease of use. Clearly such a system should be accessible on a mobile device and do everything possible to simplify data entry. A id system which balances density of encoding with an unambiguous character set would go a long way, with pre-printed stickers with bar or QR codes offering a potential further upgrade.

Alternatively, many operations could probably be performed without entering any ids with sufficiently rich descriptions enabling commands such as "put hammer in shoebox" being unambiguously resolved into entries containing the relevant ids. From here it would only be a small jump into voice assistant integration.

## Conclusion
This isn't a system I've attempted yet, but I'm intrigued to build a proof of concept and try it on some subset of items I can rely on being undisturbed by the rest of the family - at least until it's a sufficiently effective and low friction to win their engagement!