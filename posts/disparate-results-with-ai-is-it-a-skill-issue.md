---
date: 2026-05-31
title: Disparate results with AI - Is it a skill issue?
---

It's 2026, and there is a lot of discussion around how good coding agents are. Peruse any hacker news comment section and you'll find one camp saying they are worthless, while the other claims they are producing high quality output at unprecedented pace with an ever growing stable of agents thundering away in parallel. Where these two opinions interact, the latter group routinely accuses the former of skill issues, in more or less polite terms.

As of 2026-05, my opinions are somewhere in between these extremes, but more to the point, I think the focus on users' techniques overlooks 3 other important important factors which influence the degree to which AI can assist. 

In summary, I'd class the four factors as:

1. What your definition of "good" is
2. How well suited the model is
3. How easily you can evaluate the results
4. Your skills and techniques

Each of these is worth breaking down.

## What your definition of "good" is

I haven't practised archery in over 25 years, but I can still hit a blade of grass at 50 paces... just as long as we're not specific about _which_ blade. Likewise anyone can one-shot an app with 2026 AI agents... just so long as they're not too specific about that app.

The more specific the definition of "good" is, the smaller target it is to hit, the less naturally it's going to drop out of an LLM. This applies both to functional requirements (what the code does), and non-functional requirements (how it does it).

Our definition of success for different tasks will depend on varying amounts of precision across different dimensions.

Among the things a task _may_ care about (off the top of my head):
- Happy cases work
- Detecting and handling unhappy cases
- Performance
- Clarity of code
- Adherence to good UX principles
- Actual usefulness to customers
- Onwards extensibility
- Security
- Observability
- Portability 
- Documentation
- Configurability
- Conformity with existing code patterns
- Maintenance of system invariants
- Skills sharpened
- Understanding gained
- Interoperability with existing systems
- etc, etc

Not all tasks have the same requirements, or any requirements, on each of these. 

The fewer of these axis of success a task has requirements on, or the looser those requirements are, the easier it's going to be to get an acceptable output.

When people are confused at the different experiences their fellow developers are having with AI assistance, differences in the requirements for success, may be at the root of it.

### Dunning Kruger
Learning to identify which of these axis matter in a given context, and to what extent, has always been one of the skills an engineer develops with experience. We can all no-doubt identify times from earlier in our careers where we misjudged in one direction of the other, or were totally blind to certain axes which transpired to be relevant. This can be one strand of the Dunning-Kruger effect, in that we fail to assess the shortcomings of our output in terms of criteria we do not have the experience to recognise.

In so far as AI agents allow a user to attempt things otherwise beyond their experience, they also bring a particular vulnerability to delusions of sufficiency. Beware the full consequences of a developer being coaxed too far out of their depth, to say nothing of non-technical executives.

## How Well Suited the Model is to the Problem

### Overall Capabilities
Anyone who has interacted with LLMs knows that they are not all equal. As a general rule, more recent models are more capable than earlier ones and larger models of the same generation tend to achieve what smaller ones cannot.
### Specific Fit
Aside from the general differences in model potency, the results we can get from any given model are also dictated by the problem they are applied to.
#### Novelty
In broad terms, coding models are pre-trained by playing "fill in the blanks" on the corpus of publicly available code, then post trained by completing verifiable coding tasks. In both of these steps, some problems, languages, frameworks, and libraries are going to be represented more than others, and thus the model is going to have more innate experience working in those scenarios. The more that models can draw on this experience while solving a problem, the closer the task resolves to that of decompressing a stored representation, while the further out of distribution a situation is the more they must rely on applying learned generalisations to information in context - a harder task.

To take extreme examples, it's a lot easier for an LLM to create a React todo app, than create a novel algorithm in an esoteric language while integrating with internal company libraries.

If a fellow developer is having a very different experience with LLMs, they may be applying them in a different part of this spectrum than us, and perhaps both have forgotten how wide the spectrum is.

Interestingly, this "weakness" around novel situations compliments human developers well. While developers thrive on the challenge of learning new things, sometimes to a fault, it can be harder to motivate ourselves or others to slog through more repetitive, yet simpler tasks, which are often left languishing on todo lists. 
#### Exceptionality
As discussed above, inference is a statistical process, the outputs are biased towards the average of the training set. Just as LLMs are well trained to emit solutions to well represented problems, so too they most naturally reproduce the general qualities of the training set. The further from the mean our quality requirements are, the less naturally LLMs will meet them. This can be an advantage in axes in which we have lower than average quality requirements, we will likely obtain output with bonus qualities in these areas, but where the situation demands exceptional quality we will have to fight the LLM or intervene in the output.

## Evaluation 
Whether building a solution, by hand or otherwise, an important part of the task is evaluating whether it is good enough in all of the relevant axes of quality.

The relative work required to perform this evaluation is a significant factor in how much benefit can be gained from automated code generation. 

The cost of a single sub-standard output is the sum of: 
1. The time and compute/token costs to produce it
2. The time and compute costs to evaluate it
3. The expectation (likelihood * impact) of it incorrectly slipping past evaluation.
 
Thus: the cheaper it is to evaluate an output, and/or the greater confidence with which we can do so, and/or the lower impact of a misclassification - the greater tolerance we can have of sub-standard outputs.

These factors vary greatly from task to task, especially between those that depend on different axes of quality, as some of these are fundamentally easier to asses than others. In some axes a cheap, deterministic check like a compiler, linter or acceptance test may tell us all we need to know, while others require careful manual review, perhaps even with external parties or users.

We will find the greatest advantage from AI when evaluation is low effort, preferably automatable, and ideally produces directional feedback, which steers in the direction of correct, rather than merely rejects the incorrect.

AI generated solutions will not always produce "good enough" solutions with every attempt, but the quicker solutions can be evaluated, the more failures can be tolerated while still providing a net benefit. For tasks in which the evaluation effort dominates, the strategy for generating the solution should be optimised to produce fewest attempts to evaluate (as per Theory of Constraints), wherever that may lie on the hand crafted, vibe coded spectrum. Conversely, situations in which evaluation is cheap, ideally fully automated, can afford more attempts while remaining beneficial.

## Skills and Techniques

What then of the skills and techniques which advocates swear are the only things holding others back from success? Are they of no value? Certainly not. When we have identified areas in which agents may be suitable there is much that can be done to equip them with the context to attempt a problem and the feedback to correct. No doubt if all further training ceased today we'd still be finding ways to squeeze better and better outcomes from the models we had for years to come. Such things are well covered elsewhere however, and do not need further elaboration here.

## Conclusion

The polarising narrative that AI is either beneficial for everything, or nothing, is simplistic and distracting.

Results with AI are a combination of, yes, approach, but also the specifics of the task at hand and, if we're honest, a degree of luck for good measure.

Understand your problems. Understand your tools. Match the tools and techniques to the job.

Be thoughtful about which dimensions of quality matter for a task and be honest about which of those you are able and willing to evaluate. Avoid presumptions of sufficiency in unevaluated axes. Pay particular attention to subtler dimensions, and when they are called for. A rough AI implementation can reduce a job to a fraction of the time it might otherwise take, but it can just as easily paint your into a difficult corner or cost your company dearly if misapplied.

AI makes mistakes. You make mistakes. Your colleagues make mistakes. Find ways to play to your strengths and overlap your work to cancel out each others weaknesses.
