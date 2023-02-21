# Study-Projects


## Exam example:
Exam project is an example of Question and answer system.

Test with 10 questions, each of them has 4 alternatives (ABCD), only one will be correct.

Rules:

The student has 3 chances to take the test.

Average >=6 approved
below failed

If at the first chance the student takes the grade with the average sufficient to be approved, then the program ends (if) the student wishes. If he wants to try to get a higher grade, he will have the option to continue.

The highest note value is what will remain with the final result.

At the end, it should contain an option to see the answers that the student got right and wrong (it's up to you if you want to put the right answer to the question you got wrong)

Concepts and good practices that I used:

The S of SOLID principles. Single principle responsability.

I tried to separate some roles according to context and responsibility.

Recursion, where I call the same function passing modified params according to each interaction.

Good practice to write in a clear way to improve the readability.