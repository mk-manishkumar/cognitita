
# THEORY OF COMPUTATION
## Space Complexity & Its Complexity Classes

### Lecture Topic
**Space Complexity measured using Turing Machines**

### Classes Covered

- DSPACE
- L
- NSPACE
- NL
- PSPACE
- NPSPACE
- EXPSPACE

---

# 1. LEARNING OBJECTIVES

After studying this lecture, you should be able to:

1. Define **Space Complexity** using a Turing Machine.
2. Explain what it means for a machine to use **at most `S(n)` space**.
3. Distinguish between:
   - Deterministic Turing Machine
   - Non-Deterministic Turing Machine
4. Understand why the "at most `S(n)`" restriction applies separately to each computation branch of an NTM.
5. Define:
   - DSPACE
   - L
   - NSPACE
   - NL
   - PSPACE
   - NPSPACE
   - EXPSPACE
6. Understand the difference between:
   - Machine type
   - Space bound
7. Understand the relationship:
   - `L ⊂ DSPACE`
   - `NL ⊂ NSPACE`
   - `PSPACE = NPSPACE`
   - `PSPACE ⊂ EXPSPACE`
8. Understand the basic idea of **Savitch's Theorem**.
9. Explain why counting up to `n` requires only `log₂(n)` bits.
10. Distinguish **polynomial space** from **exponential space**.

---

# 2. WHY DO WE STUDY SPACE COMPLEXITY?

In algorithm analysis, **Time Complexity** often receives more attention than Space Complexity.

The lecture gives three reasons:

- Space can be **reused**.
- Space is **expandable**.
- Memory/storage is becoming **cheaper over time**.

Therefore, time is often given preference.

However, this lecture shifts the focus entirely to:

> **Space Complexity**



---

# 3. WHAT IS SPACE COMPLEXITY?

To understand space complexity in this lecture, think in terms of a **Turing Machine (TM)**.

A Turing Machine has a tape divided into cells.

The machine reads/writes information using these cells while performing a computation.

## Definition

> **Space Complexity = the maximum number of tape cells used by a Turing Machine during a computation.**

In other words:

> We ask: **What is the maximum amount of tape space this machine needs?**

If a machine uses:

```text
10 cells
```

at most during a computation, then its space usage is 10 cells for that computation.

The important word is:

> **Maximum**

because we are interested in the maximum amount of space required.



---

# 4. SPACE COMPLEXITY AS A FUNCTION OF INPUT SIZE

Space usage depends on the size of the input.

Let:

```text
n = input length
```

and:

```text
S(n) = space used
```

Then we can say:

> A Turing Machine `M` runs in space `S(n)` if, for every input of length `n`, it uses at most `S(n)` tape cells.

Formally:

```text
For all inputs of length n:

Space used by M ≤ S(n)
```

Therefore:

```text
Space Complexity = S(n)
```

where `S(n)` is a function of the input size `n`.



---

# 5. WHAT DOES "AT MOST S(n)" MEAN?

This phrase is extremely important.

Suppose:

```text
S(n) = 7
```

Then the machine can use:

- 1 cell
- 2 cells
- 5 cells
- 7 cells

but **never more than 7 cells**.

So:

```text
Used Space ≤ S(n)
```

is the key idea.

### Think of it as a maximum limit

```text
S(n) = maximum allowed space
```

It is an **upper bound**.

---

# 6. DETERMINISTIC VS NON-DETERMINISTIC TURING MACHINES

Before understanding the space classes, we need to understand the difference between deterministic and non-deterministic machines.

## Deterministic Turing Machine — DTM

A deterministic machine has:

> **One fixed computation path.**

For a particular:

- current state
- input symbol

there is exactly **one defined next state**.

Conceptually:

```text
State + Input
      ↓
Exactly one next state
```

---

# 7. NON-DETERMINISTIC TURING MACHINE — NTM

A non-deterministic machine can have **multiple possible computation paths**.

For a particular state and input symbol, there could be:

- Choice 1
- Choice 2
- Both possibilities
- Or even no valid transition

For example:

```text
             ┌── Q1
State Q0 ────┤
             └── Q2
```

Therefore:

> **An NTM may branch into multiple possible computation paths.**

This branching is the essence of **non-determinism**.

---

# 8. DTM VS NTM — QUICK COMPARISON

| Feature | DTM | NTM |
|---|---|---|
| Computation | Fixed | Branching |
| Next state | Exactly one | Multiple possibilities / possibly none |
| Paths | Single path | Multiple branches |
| Key idea | Deterministic | Non-deterministic |



---

# 9. THE "AT MOST S(n)" RULE FOR NON-DETERMINISTIC MACHINES

This is one of the most important subtleties in the lecture.

Suppose an NTM has many branches:

```text
                    ┌── Branch 1
                    │
Input → Computation ├── Branch 2
                    │
                    └── Branch 3
```

If the space bound is:

```text
S(n)
```

then:

> **Every individual branch must use at most `S(n)` cells.**

It does **not** mean:

> Add the space used by all branches together.

---

# 10. PER-BRANCH SPACE, NOT TOTAL SPACE ACROSS BRANCHES

Suppose:

```text
S(n) = 7
```

and the NTM has:

```text
Branch 1 → 5 cells
Branch 2 → 7 cells
Branch 3 → 6 cells
```

This is valid.

Why?

Because every individual branch satisfies:

```text
≤ 7
```

But if one branch uses:

```text
8 cells
```

the machine violates the `S(n)=7` space restriction.

### Key rule

> **Space bound for an NTM is applied to each individual computation branch.**

This is **not** a combined total across all branches.



---

# 11. PARTY ANALOGY FOR "AT MOST S(n)"

Imagine your mother tells you:

> "You are allowed to use only 2 rooms for the party."

You have many rooms available.

But:

```text
Allowed = 2 rooms
```

You cannot use 3 rooms.

Similarly:

```text
Allowed = S(n) tape cells
```

You cannot exceed `S(n)` cells.

For an NTM:

> Every computation branch must respect the same maximum.

---

# 12. WHY SPACE CLASSES ARE DIFFERENT

Not every algorithm uses the same amount of space.

Space can grow as:

### Logarithmic

```text
log n
```

### Linear

```text
n
```

### Quadratic

```text
n²
```

### Polynomial

```text
n^k
```

### Exponential

```text
2^n
```

The space classes classify problems according to these kinds of space requirements.

---

# 13. SPACE HIERARCHY — BASIC INTUITION

The lecture emphasizes:

```text
Polynomial Space << Exponential Space
```

Polynomial space has the form:

```text
n^k
```

Examples:

```text
n
n²
n³
n⁴
...
```

Exponential space grows much faster:

```text
2^n
```

Therefore:

> **Exponential space is much larger than polynomial space.**



---

# 14. DSPACE

## Definition

> **DSPACE = the class of all languages that can be decided by a deterministic Turing Machine using at most `S(n)` space.**

Symbolically:

```text
DSPACE(S(n))
```

means:

```text
Deterministic TM
+
S(n) space
```

---

# 15. MEMORY TRICK FOR DSPACE

Whenever you see:

```text
DSPACE
```

immediately think:

```text
D → Deterministic
```

The `D` tells you the **machine type**.

It does **not** tell you the exact growth rate of the space.

---

# 16. DSPACE DOES NOT SPECIFY THE TYPE OF SPACE

This is important.

`DSPACE(S(n))` does not inherently mean:

- logarithmic
- linear
- quadratic
- polynomial
- exponential

The function `S(n)` can be any appropriate space bound.

For example:

```text
DSPACE(log n)
DSPACE(n)
DSPACE(n²)
DSPACE(2^n)
```

are all deterministic-space concepts.

Therefore:

> **D in DSPACE tells you "Deterministic"; `S(n)` tells you the actual space bound.**



---

# 17. L CLASS — LOGARITHMIC SPACE

Now we specify the space bound more precisely.

## L

> **L = deterministic logarithmic space.**

Therefore, L specifies **two things**:

1. Machine = deterministic
2. Space = logarithmic

Conceptually:

```text
L
=
DSPACE(log n)
```

The lecture specifically describes logarithmic space using:

```text
log₂(n)
```

---

# 18. L IS A SUBCLASS OF DSPACE

Since L uses a deterministic machine and is simply a specific space restriction:

```text
L ⊂ DSPACE
```

Visualize:

```text
┌───────────────────────────────┐
│           DSPACE              │
│                               │
│       ┌───────────────┐       │
│       │       L       │       │
│       │               │       │
│       └───────────────┘       │
│                               │
└───────────────────────────────┘
```

Therefore:

> Every L problem belongs to DSPACE, but DSPACE is much broader.



---

# 19. WORKED EXAMPLE FOR L — COUNTING 0s AND 1s

Suppose we have a language/problem where we need to:

> Compare the number of `0`s and the number of `1`s in a string.

We need to keep track of counts.

A useful observation:

> We don't necessarily need to store both counts separately.

If we track one count appropriately, we can determine the comparison.

The important question becomes:

> **How much space does a counter require?**

---

# 20. HOW MANY BITS ARE REQUIRED TO STORE A NUMBER?

A Turing Machine tape cell is treated here as storing:

```text
1 bit
```

A bit has two possible values:

```text
0
1
```

Therefore, with:

```text
1 bit → 2 possible values
```

With:

```text
2 bits → 4 possible values
```

With:

```text
3 bits → 8 possible values
```

Generally:

```text
k bits → 2^k possible values
```

---

# 21. THE 1024 EXAMPLE

Suppose we want to represent numbers up to:

```text
1024
```

A beginner might think:

> "I need 1024 bits."

That is incorrect.

We only need enough bits to represent 1024 different values.

Therefore:

```text
2^k = 1024
```

Since:

```text
2^10 = 1024
```

we need:

```text
k = 10 bits
```

Therefore:

```text
log₂(1024) = 10
```

So:

> **1024 does NOT require 1024 bits. It requires only 10 bits to encode the relevant range.**

---

# 22. WHY IS THE LOG BASE 2?

Because the representation is binary.

Each tape cell contains one bit.

Each bit has:

```text
2 possible values
```

Therefore:

```text
2^k possibilities
```

and hence:

```text
k = log₂(n)
```

This is why logarithmic space is measured using base-2 logarithms in the lecture.

---

# 23. APPLYING THIS TO SPACE COMPLEXITY

Suppose:

```text
Input size = 1024
```

Do we need:

```text
1024 tape cells
```

just to store a counter?

No.

We need:

```text
log₂(1024)
=
10
```

cells/bits.

Therefore:

```text
Input size = n
Counter space = O(log n)
```

This is the central idea behind the example.

---

# 24. WHY THE COUNTING PROBLEM BELONGS TO L

The machine:

- is deterministic
- needs only logarithmic space to maintain the counter

Therefore:

```text
Deterministic
+
Logarithmic Space
=
L
```

Since L is part of DSPACE:

```text
L ⊂ DSPACE
```



---

# 25. NSPACE

Now replace:

```text
Deterministic
```

with:

```text
Non-Deterministic
```

## Definition

> **NSPACE(f(n)) = the class of languages decidable by a non-deterministic Turing Machine using at most `f(n)` space.**

The space function is still unspecified.

It could be:

```text
log n
n
n²
n³
2^n
...
```

The important difference is:

```text
DSPACE → DTM
NSPACE → NTM
```



---

# 26. NL — NON-DETERMINISTIC LOGARITHMIC SPACE

Just as:

```text
L
```

is deterministic logarithmic space,

```text
NL
```

is:

> **Non-Deterministic Logarithmic Space**

Therefore:

```text
NL
=
Non-Deterministic
+
Logarithmic Space
```

Conceptually:

```text
NL = NSPACE(log n)
```

The lecture specifically describes the logarithmic bound as:

```text
log₂(n)
```

---

# 27. L VS NL

| Feature | L | NL |
|---|---|---|
| Machine | Deterministic | Non-Deterministic |
| Space | Logarithmic | Logarithmic |
| Parent class | DSPACE | NSPACE |
| Meaning | Deterministic Log Space | Non-Deterministic Log Space |

Relationship:

```text
L ⊂ DSPACE
```

and:

```text
NL ⊂ NSPACE
```

The lecture does not establish equality between L and NL.

---

# 28. PSPACE

Now we explicitly specify the space as **polynomial**.

## Definition

> **PSPACE = the class of languages that can be decided by a deterministic Turing Machine using polynomial space.**

Polynomial space means:

```text
n^k
```

for some appropriate constant `k`.

Examples:

```text
n
n²
n³
n⁴
...
```

---

# 29. WHAT DOES THE P IN PSPACE MEAN?

Here:

```text
P = Polynomial
```

So:

```text
PSPACE
=
Polynomial Space
+
Deterministic TM
```

Important:

> In PSPACE, the `P` refers to the **space bound**, not the time complexity class P.

---

# 30. EXAMPLES OF POLYNOMIAL SPACE

If:

```text
k = 1
```

then:

```text
n^1 = n
```

→ Linear space.

If:

```text
k = 2
```

then:

```text
n²
```

→ Quadratic space.

If:

```text
k = 3
```

then:

```text
n³
```

→ Cubic space.

Therefore:

```text
PSPACE = deterministic polynomial-space computation
```



---

# 31. NPSPACE

Now make the machine non-deterministic.

## Definition

> **NPSPACE = problems decidable by a non-deterministic Turing Machine using polynomial space.**

Therefore:

```text
NPSPACE
=
Non-Deterministic
+
Polynomial Space
```

---

# 32. IMPORTANT: NPSPACE DOES NOT MEAN NON-POLYNOMIAL SPACE

This is an extremely important exam trap.

Do NOT interpret:

```text
NP
```

in NPSPACE as:

```text
Non-Polynomial
```

It means:

```text
Non-Deterministic
```

while the space bound remains:

```text
Polynomial
```

Therefore:

```text
PSPACE:
Deterministic + Polynomial Space

NPSPACE:
Non-Deterministic + Polynomial Space
```

The **only difference** is the type of Turing Machine.



---

# 33. PSPACE VS NPSPACE

| Property | PSPACE | NPSPACE |
|---|---|---|
| Machine | Deterministic | Non-Deterministic |
| Space | Polynomial | Polynomial |
| Space form | `n^k` | `n^k` |
| Main difference | No branching | Branching |

Memory trick:

```text
P
↓
Polynomial

N
↓
Non-Deterministic
```

---

# 34. SAVITCH'S THEOREM ⭐

This is one of the most important facts in the lecture.

At first, PSPACE and NPSPACE look different:

```text
PSPACE
↓
Deterministic + Polynomial Space

NPSPACE
↓
Non-Deterministic + Polynomial Space
```

You might expect:

```text
PSPACE ≠ NPSPACE
```

But Savitch proved:

# PSPACE = NPSPACE

---

# 35. WHAT DOES SAVITCH'S THEOREM MEAN?

Savitch showed that:

> **Non-determinism does not provide additional computational power when considering polynomial space.**

Therefore:

```text
PSPACE = NPSPACE
```

This is different from the famous:

```text
P vs NP
```

question in time complexity.

The lecture emphasizes:

> PSPACE and NPSPACE are **proven equal**.

It is not an open question.

---

# 36. DO YOU NEED THE PROOF?

Not for this lecture.

The proof of Savitch's Theorem is stated to be a separate topic/video.

For now, remember:

```text
PSPACE
=
Deterministic Polynomial Space

NPSPACE
=
Non-Deterministic Polynomial Space

Savitch:
PSPACE = NPSPACE
```



---

# 37. EXPSPACE

Now we move beyond polynomial space.

## Definition

**EXPSPACE** refers to problems solvable using **exponential space**.

The space grows exponentially.

A typical form is:

```text
2^f(n)
```

where `f(n)` is an exponential-space-related function as specified in the lecture's formal definition.

The lecture describes EXPSPACE as involving **non-polynomial/exponential space**.

---

# 38. FORMAL EXPSPACE DEFINITION

A language `L` is in EXPSPACE if there exists:

- A Turing Machine `M`
- An exponential function `f(n)`

such that for every input `x`:

```text
M decides whether x ∈ L
```

using at most:

```text
2^f(n)
```

space.

So conceptually:

```text
EXPSPACE
=
Turing Machine
+
Exponential Space
```



---

# 39. WHAT IS THE MEMBERSHIP PROBLEM?

The formal EXPSPACE definition uses:

```text
x ∈ L
```

This represents a **membership question**.

Given:

- A Turing Machine `M`
- A language `L`
- A string `x`

the machine needs to determine:

```text
Does x belong to L?
```

In mathematical notation:

```text
x ∈ L ?
```

The Turing Machine decides the answer.

---

# 40. PSPACE VS EXPSPACE

The basic relationship is:

```text
Polynomial Space
        <
Exponential Space
```

Therefore:

```text
PSPACE ⊆ EXPSPACE
```

The intuition is simple:

> If a problem can be solved using polynomial space, then an algorithm with access to a larger exponential-space bound can also provide at least that much space.

So:

```text
PSPACE
```

is contained within:

```text
EXPSPACE
```

---

# 41. VISUALIZE PSPACE AND EXPSPACE

```text
┌────────────────────────────────────┐
│             EXPSPACE               │
│                                    │
│      ┌──────────────────────┐      │
│      │       PSPACE         │      │
│      │                      │      │
│      └──────────────────────┘      │
│                                    │
└────────────────────────────────────┘
```

Thus:

```text
PSPACE ⊆ EXPSPACE
```



---

# 42. IMPORTANT CLASSIFICATION FRAMEWORK

There are really **two dimensions** being discussed.

## Dimension 1 — Machine Type

```text
D = Deterministic

N = Non-Deterministic
```

## Dimension 2 — Space Bound

```text
logarithmic
polynomial
exponential
```

Combine them:

| Machine | Space | Class |
|---|---|---|
| Deterministic | General `S(n)` | DSPACE |
| Deterministic | Logarithmic | L |
| Non-Deterministic | General `f(n)` | NSPACE |
| Non-Deterministic | Logarithmic | NL |
| Deterministic | Polynomial | PSPACE |
| Non-Deterministic | Polynomial | NPSPACE |
| TM | Exponential | EXPSPACE |

This is one of the easiest ways to organize the entire lecture mentally.

---

# 43. THE CLASSIFICATION MATRIX

```text
                    SPACE BOUND
               ┌───────────────────────┐
               │                       │
               │ General     Log       │
               │             Polynomial │
               │             Exponential
               │                       │
MACHINE        │                       │
TYPE            │                       │
───────────────┼───────────────────────┤
Deterministic  │ DSPACE      L  PSPACE │
               │                       │
Non-           │ NSPACE      NL NPSPACE│
Deterministic  │                       │
               │                       │
               └───────────────────────┘
```

This helps separate:

> **Who is computing?**

from:

> **How much space is available?**

---

# 44. MEMORY TRICKS

## DSPACE

```text
D → Deterministic
```

---

## NSPACE

```text
N → Non-Deterministic
```

---

## L

```text
L → Logarithmic
```

---

## NL

```text
N + L
↓
Non-Deterministic Logarithmic
```

---

## PSPACE

```text
P → Polynomial
SPACE → Space
```

So:

```text
PSPACE
=
Deterministic Polynomial Space
```

---

## NPSPACE

```text
N → Non-Deterministic
P → Polynomial
SPACE → Space
```

So:

```text
NPSPACE
=
Non-Deterministic Polynomial Space
```

NOT:

```text
Non-Polynomial Space ❌
```

---

## EXPSPACE

```text
EXP → Exponential
SPACE → Space
```

Therefore:

```text
EXPSPACE
=
Exponential Space
```

---

# 45. REAL-LIFE ANALOGY — LIBRARY

The lecture provides a library analogy to make the classes easier to visualize.

This section is optional if the mathematical definitions are already clear.

---

# 46. PSPACE — LIBRARY NOTEBOOK

Imagine you are searching for a book in a library.

You have a small notebook.

The notebook represents your:

```text
Polynomial amount of space
```

You follow a fixed sequence:

```text
Step 1 → Check Shelf 1
Step 2 → Check Shelf 4
Step 3 → Check Shelf 5
...
```

These are predetermined steps.

That represents:

```text
Deterministic computation
```

Therefore:

```text
PSPACE
=
Deterministic
+
Polynomial Space
```

---

# 47. NPSPACE — BRANCHING LIBRARY SEARCH

You still have the same limited/polynomial-sized notebook.

But now you can make choices:

```text
Check Shelf 1

OR

Check Shelf 2

OR

Check Shelf 3
```

The computation branches.

But:

> You are still restricted to the same polynomial amount of notebook space.

Therefore:

```text
NPSPACE
=
Non-Deterministic
+
Polynomial Space
```

---

# 48. EXPSPACE — ENTIRE LIBRARY

Now imagine you need to track/search an enormous library:

```text
Shelf 1
Shelf 2
Shelf 3
...
thousands of shelves
...
```

A small notebook is no longer enough.

You need an enormous amount of space to keep track of everything.

This represents:

```text
Exponential Space
```

or:

```text
EXPSPACE
```

The analogy is intended only as intuition; the formal definitions remain the important part.



---

# 49. MASTER CLASS TABLE

| Class | Machine Type | Space Bound | Key Idea |
|---|---|---|---|
| **DSPACE(S(n))** | Deterministic | `S(n)` | General deterministic space |
| **L** | Deterministic | `log₂(n)` | Deterministic logarithmic space |
| **NSPACE(f(n))** | Non-Deterministic | `f(n)` | General non-deterministic space |
| **NL** | Non-Deterministic | `log₂(n)` | Non-deterministic logarithmic space |
| **PSPACE** | Deterministic | `n^k` | Deterministic polynomial space |
| **NPSPACE** | Non-Deterministic | `n^k` | Non-deterministic polynomial space |
| **EXPSPACE** | Turing Machine | `2^f(n)` | Exponential space |



---

# 50. CLASS RELATIONSHIPS

The lecture establishes these relationships:

## Relationship 1

```text
L ⊂ DSPACE
```

L is a subclass of DSPACE.

---

## Relationship 2

```text
NL ⊂ NSPACE
```

NL is a subclass of NSPACE.

---

## Relationship 3

```text
PSPACE = NPSPACE
```

This is established by:

> **Savitch's Theorem**

---

## Relationship 4

```text
PSPACE ⊂ EXPSPACE
```

Polynomial space is contained within exponential space.



---

# 51. COMPLETE RELATIONSHIP MAP

A useful mental picture:

```text
                    EXPSPACE
                ┌───────────────────┐
                │                   │
                │     PSPACE        │
                │   ┌─────────┐     │
                │   │ NPSPACE │     │
                │   └─────────┘     │
                │      =             │
                │     PSPACE         │
                │                   │
                └───────────────────┘
```

More precisely, the key proven relationships from this lecture are:

```text
L ⊂ DSPACE

NL ⊂ NSPACE

PSPACE = NPSPACE

PSPACE ⊂ EXPSPACE
```

Do **not** infer additional relationships that were not established in this lecture.

---

# 52. THE MOST IMPORTANT DISTINCTION: MACHINE VS SPACE

This is probably the single best conceptual framework for remembering the lecture.

When you see a class, ask two questions:

### Question 1

> **What kind of machine is being used?**

```text
D → Deterministic
N → Non-Deterministic
```

### Question 2

> **How much space is available?**

```text
logarithmic
polynomial
exponential
general S(n)
```

Then combine them.

For example:

```text
N + Polynomial Space
=
NPSPACE
```

and:

```text
D + Logarithmic Space
=
L
```

---

# 53. THE 1024 → 10 BITS EXAMPLE — MUST KNOW

This example is particularly important because it demonstrates why logarithmic space is small.

Suppose:

```text
n = 1024
```

To count up to 1024:

```text
2^10 = 1024
```

Therefore:

```text
log₂(1024) = 10
```

So:

```text
1024 input size
```

does **not** automatically mean:

```text
1024 cells
```

for every task.

If you only need a counter:

```text
10 bits/cells
```

are enough.

General idea:

```text
To represent a number up to n:

Space ≈ log₂(n)
```

This is the intuition behind logarithmic-space algorithms.



---

# 54. WHY LOGARITHMIC SPACE IS POWERFUL

Suppose the input has:

```text
1,000,000
```

elements.

You don't necessarily need:

```text
1,000,000
```

memory cells just to maintain a counter.

A counter capable of representing the relevant range needs approximately:

```text
log₂(1,000,000)
```

bits.

So the required storage grows very slowly compared with `n`.

This is why:

```text
O(log n)
```

is considered extremely space-efficient.

---

# 55. ACTIVE RECALL — FUNDAMENTAL QUESTIONS

Do not read the answers immediately.

Close the notes and answer:

### Definitions

1. What is Space Complexity?
2. How is Space Complexity measured on a Turing Machine?
3. What does `S(n)` represent?
4. What does "at most `S(n)` cells" mean?
5. Why is space complexity a function of `n`?

### Turing Machines

6. What is a deterministic Turing Machine?
7. What is a non-deterministic Turing Machine?
8. How many computation paths can a DTM have?
9. Why can an NTM have multiple branches?
10. What happens to the space bound when an NTM branches?

### Classes

11. What does the `D` in DSPACE mean?
12. What does DSPACE specify?
13. Does DSPACE necessarily mean logarithmic space?
14. What is L?
15. Why is L a subset of DSPACE?
16. What does NSPACE mean?
17. What is NL?
18. What is PSPACE?
19. What does the `P` in PSPACE mean?
20. What is NPSPACE?
21. Does `NP` in NPSPACE mean "Non-Polynomial"?
22. What is EXPSPACE?

### Theorems and relationships

23. What does Savitch's Theorem state?
24. Is `PSPACE = NPSPACE` proven or an open problem?
25. What is the relationship between PSPACE and EXPSPACE?
26. What is the relationship between L and DSPACE?
27. What is the relationship between NL and NSPACE?

---

# 56. ACTIVE RECALL — NUMERICAL QUESTIONS

Try these without looking at the notes.

### Q1

How many bits are required to represent 8 possible values?

### Q2

How many bits are required to represent 16 possible values?

### Q3

How many bits are required for 1024 possible values?

### Q4

Express the number of bits required to represent values up to `n`.

### Q5

Why does counting up to `n` suggest logarithmic space?

### Q6

If a machine uses `S(n)=7` cells as its maximum, can one computation branch use 8?

### Q7

If an NTM has 100 branches and each branch uses at most 7 cells, does the definition automatically mean 700 cells of space?

The crucial answer:

> The lecture's definition is applied **per individual computation branch**, not by summing all branches.

---

# 57. ACTIVE RECALL — CLASSIFICATION QUESTIONS

Given the description, identify the class.

### A

```text
Deterministic + arbitrary S(n)
```

→ ?

### B

```text
Deterministic + logarithmic space
```

→ ?

### C

```text
Non-deterministic + arbitrary f(n)
```

→ ?

### D

```text
Non-deterministic + logarithmic space
```

→ ?

### E

```text
Deterministic + polynomial space
```

→ ?

### F

```text
Non-deterministic + polynomial space
```

→ ?

### G

```text
Exponential space
```

→ ?

Answers:

```text
A → DSPACE
B → L
C → NSPACE
D → NL
E → PSPACE
F → NPSPACE
G → EXPSPACE
```

---

# 58. EXAM-STYLE DEFINITIONS

## DSPACE

> DSPACE is the class of languages decidable by a deterministic Turing Machine using at most `S(n)` space.

---

## L

> L is the class of languages decidable by a deterministic Turing Machine using logarithmic space.

---

## NSPACE

> NSPACE is the class of languages decidable by a non-deterministic Turing Machine using at most `f(n)` space.

---

## NL

> NL is the class of languages decidable by a non-deterministic Turing Machine using logarithmic space.

---

## PSPACE

> PSPACE is the class of languages decidable by a deterministic Turing Machine using polynomial space `n^k`.

---

## NPSPACE

> NPSPACE is the class of languages decidable by a non-deterministic Turing Machine using polynomial space `n^k`.

---

## EXPSPACE

> EXPSPACE contains decision problems solvable by a Turing Machine using exponential space, expressed in the lecture as at most `2^f(n)` space.

---

# 59. COMMON EXAM TRAPS

## Trap 1 — NPSPACE = Non-Polynomial Space

❌ Wrong.

`N` means:

> **Non-Deterministic**

`P` means:

> **Polynomial**

Therefore:

```text
NPSPACE
=
Non-Deterministic Polynomial Space
```

---

## Trap 2 — DSPACE means polynomial space

❌ Not necessarily.

DSPACE only specifies:

```text
D = Deterministic
```

The space function can be:

```text
log n
n
n²
2^n
...
```

---

## Trap 3 — L means any deterministic space

❌ No.

L specifically means:

```text
Deterministic + Logarithmic Space
```

---

## Trap 4 — NL means non-linear space

❌ No.

NL means:

```text
Non-Deterministic Logarithmic Space
```

---

## Trap 5 — PSPACE and NPSPACE are different classes

For this lecture:

❌ No.

Savitch's Theorem establishes:

```text
PSPACE = NPSPACE
```

---

## Trap 6 — An NTM's space is the sum of all branches

❌ No.

The restriction is:

> At most `S(n)` cells on **each individual computation branch**.

---

## Trap 7 — Input size 1024 requires 1024 cells

❌ Not necessarily.

For a counter:

```text
log₂(1024)
=
10
```

cells/bits are sufficient.

---

## Trap 8 — EXPSPACE and PSPACE are the same

❌ No.

The lecture establishes:

```text
PSPACE ⊂ EXPSPACE
```

---

# 60. WHAT YOU SHOULD MEMORIZE

### Absolute essentials

```text
DSPACE → Deterministic + S(n)

L → Deterministic + Logarithmic

NSPACE → Non-Deterministic + f(n)

NL → Non-Deterministic + Logarithmic

PSPACE → Deterministic + Polynomial

NPSPACE → Non-Deterministic + Polynomial

EXPSPACE → Exponential
```

---

# 61. RELATIONSHIPS TO MEMORIZE

```text
L ⊂ DSPACE

NL ⊂ NSPACE

PSPACE = NPSPACE

PSPACE ⊂ EXPSPACE
```

And:

```text
Savitch's Theorem
        ↓
PSPACE = NPSPACE
```

---

# 62. THE SPACE GROWTH PICTURE

Think:

```text
Logarithmic
     ↓
Polynomial
     ↓
Exponential
```

Conceptually:

```text
log n
  <
n^k
  <
2^f(n)
```

So:

```text
L / NL
   ↓
PSPACE / NPSPACE
   ↓
EXPSPACE
```

This is a conceptual growth hierarchy, while the exact class relationships should be remembered separately from the growth intuition.

---

# 63. BLANK-PAGE TEST

Close your notes.

On a blank sheet, reproduce this:

```text
                 SPACE COMPLEXITY
                        │
          ┌─────────────┴─────────────┐
          │                           │
      DETERMINISTIC             NON-DETERMINISTIC
          │                           │
       DSPACE                     NSPACE
          │                           │
          ├── Log → L                ├── Log → NL
          │                           │
          └── Poly → PSPACE          └── Poly → NPSPACE
                                             │
                                             │
                                   Savitch's Theorem
                                             │
                                             ▼
                                     PSPACE = NPSPACE

                         Exponential Space
                                ↓
                            EXPSPACE
```

Then separately write:

```text
L ⊂ DSPACE
NL ⊂ NSPACE
PSPACE = NPSPACE
PSPACE ⊂ EXPSPACE
```

If you can reconstruct this without looking, you understand the architecture of the lecture.

---

# 64. SPACED REVIEW PLAN

Use the same learning cycle as the previous lecture.

## Review 1 — Same day

Recall without looking:

- Definition of space complexity
- `S(n)`
- DTM vs NTM
- DSPACE
- L
- NSPACE
- NL
- PSPACE
- NPSPACE
- EXPSPACE

---

## Review 2 — Next day

From memory, draw:

```text
DSPACE
L
NSPACE
NL
PSPACE
NPSPACE
EXPSPACE
```

Then write the relationship of each.

---

## Review 3 — 3–4 days later

Redo:

```text
1024 → log₂(1024) = 10
```

and explain **why** the answer isn't 1024.

---

## Review 4 — One week later

Answer all active-recall questions without notes.

---

## Review 5 — Before examination

Review only:

1. Class table
2. Relationships
3. Savitch's Theorem
4. `1024 → 10 bits`
5. Common traps

---

# 65. ONE-PAGE MASTER CHEAT SHEET

## Space Complexity

```text
Space Complexity
=
Maximum number of tape cells used
by a TM for an input of size n
```

Form:

```text
Space ≤ S(n)
```

For NTM:

```text
Each computation branch ≤ S(n)
```

---

## Machine Types

```text
D → Deterministic

N → Non-Deterministic
```

---

## Classes

```text
DSPACE(S(n))
→ Deterministic + general S(n)

L
→ Deterministic + log₂(n)

NSPACE(f(n))
→ Non-Deterministic + general f(n)

NL
→ Non-Deterministic + log₂(n)

PSPACE
→ Deterministic + n^k

NPSPACE
→ Non-Deterministic + n^k

EXPSPACE
→ Exponential space
→ 2^f(n)
```

---

## Relationships

```text
L ⊂ DSPACE

NL ⊂ NSPACE

PSPACE = NPSPACE

PSPACE ⊂ EXPSPACE
```

---

## Theorem

```text
Savitch's Theorem

PSPACE = NPSPACE
```

---

## Binary Representation

```text
k bits → 2^k values
```

Therefore:

```text
k = log₂(n)
```

Example:

```text
1024
= 2^10

Therefore:

log₂(1024) = 10
```

---

# 66. FINAL CONCEPT MAP

```text
                         SPACE COMPLEXITY
                                │
              Maximum TM tape cells used
                                │
                                ▼
                             S(n)
                                │
                  ┌─────────────┴─────────────┐
                  │                           │
             DETERMINISTIC              NON-DETERMINISTIC
                  │                           │
               DSPACE                      NSPACE
                  │                           │
          ┌───────┴───────┐          ┌───────┴───────┐
          │               │          │               │
       General          Log       General           Log
          │               │          │               │
          │               L          │               NL
          │                          │
          │                          │
       Polynomial                  Polynomial
          │                          │
       PSPACE                     NPSPACE
          │                          │
          └──────────────┬───────────┘
                         │
                         ▼
                Savitch's Theorem
                         │
                         ▼
                PSPACE = NPSPACE

                         │
                         ▼
                   Exponential
                         │
                         ▼
                     EXPSPACE
```

---

# 67. THE ENTIRE LECTURE IN 12 SENTENCES

1. **Space Complexity** measures the maximum number of Turing Machine tape cells used during computation.
2. The amount of allowed space is represented by a function such as `S(n)`.
3. "At most `S(n)`" means the machine can never exceed that space bound.
4. For a non-deterministic machine, the bound applies to **each individual computation branch**.
5. **DSPACE** describes deterministic computation with a general space bound `S(n)`.
6. **L** is deterministic logarithmic space and is a subset of DSPACE.
7. **NSPACE** is the non-deterministic counterpart of DSPACE.
8. **NL** is non-deterministic logarithmic space and is a subset of NSPACE.
9. **PSPACE** consists of deterministic polynomial-space computation.
10. **NPSPACE** consists of non-deterministic polynomial-space computation; its `NP` does **not** mean non-polynomial.
11. **Savitch's Theorem** proves `PSPACE = NPSPACE`.
12. **EXPSPACE** concerns exponential space, and the lecture establishes `PSPACE ⊂ EXPSPACE`.

---

# 68. FINAL MEMORY PALACE

If you remember only one structure from this lecture, remember:

```text
              WHAT MACHINE?
              /           \
             /             \
      Deterministic    Non-Deterministic
           |                  |
        DSPACE              NSPACE
           |                  |
        Log → L            Log → NL
           |                  |
      Polynomial          Polynomial
           |                  |
        PSPACE            NPSPACE
             \              /
              \            /
               \          /
              Savitch
                  ↓
           PSPACE = NPSPACE

                  ↓
          Exponential Space
                  ↓
              EXPSPACE
```

And remember the single most useful numerical fact:

```text
1024 = 2^10

Therefore:

log₂(1024) = 10
```

That example captures the fundamental intuition behind **logarithmic space**.

**End of Lecture — Space Complexity & Its Classes**