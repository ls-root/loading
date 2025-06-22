---
cat: ["Programming", "Python"]
css: img {width: 300px}
who: lsroot
---
> ⚠️ This article was written when I had a different design. It still uses the old image style. If you're curious about what the design looked like: [Image 1](https://cloud.fiosproject.de/legacyblog1.png)  [Image 2](https://cloud.fiosproject.de/legacyblog2.png)  
<br>

On a random Thursday, I thought, "Let's make a programming language." So, I created my own programming language called `SAC`. In this article, I will teach you how programming languages work and give you a little demo of how to use it. It's still in the early stages, and major features like `IF` statements and functions are not implemented yet.
## How normal Programming Languages work.
A programming language can be either `interpreted` or `compiled`. You probably have an idea of how a `compiled` language works. In simple terms, it converts high-level languages like `C++` directly into machine code. This process involves two main steps:
1. **Converting the Code**: The source code is translated into machine code by a compiler.
2. **Running the Machine Code**: The generated machine code is executed by the computer's processor.

![](/files/pl1.png "")

On the other hand, an interpreted language like `Python` first performs lexical analysis to check if the syntax is correct. After verifying the syntax, it builds an Abstract Syntax Tree (AST), which is a tree representation of the structure of the source code. The AST breaks down the code into its constituent parts, representing the hierarchical relationship between different elements, such as expressions, statements, and declarations. This structure allows the interpreter to understand the code's logic and flow. Finally, the interpreter executes the code directly, translating it into machine code on the fly.![](/files/pl2.png "")
## How does my Programming Language Work
I have created my own very stripped-down version of an interpreted language. I go through the source code line by line and execute it without compiling it first.
## Building it
The interpreter is written in `Python` and often uses very similar code. I have a variable where the code to interpret is saved. With a for loop, I go through each line, and then there are a lot of `IF` statements. Here is an example of the echo command:
```python
code = """
; Simple Hello World example
ECHO Hello, World!
"""

for line in code.splitlines():
	line = line.strip()
	if not line or line.startswith(";"):
		continue
	elif line.upper().startswith("ECHO"):
		pstring = line[4:].strip()

		print(pstring)
```
## Demo
In the following table, you can see what my programming language is capable of doing right now and what I'm planning to add.

| Fetuare                                     | Available |
| ------------------------------------------- | --------- |
| ECHO (Printing)                             | Yes       |
| VAR (Variables)                             | Yes       |
| GET (Get input from user)                   | Yes       |
| NL (New Line)                               | Yes       |
| ADD (Addition)                              | Yes       |
| SUB (Subtraction)                           | Yes       |
| MUL (Multiplication)                        | Yes       |
| DIV (Division)                              | Yes       |
| EXPORT (Exporting all Variables to a file)  | Yes       |
| IMPORT (Importing Variables from a file)    | Yes       |
| DVAR (Printing all variables for debugging) | Yes       |
| IF (Conditions)                             | No        |
| FUNC (Function)                             | No        |
| WHILE (While Loops)                         | No        |

I am planning to release it when I have all the features that are currently flagged as `No`.
#### Code Example
```SAC
; Code Example for SAC
IMPORT
ECHO Welcome to the simple calculator. Before continuing, please enter your username.
NL
GET username, How is your username: 
NL
GET a, Enter the first number: 
NL
GET b, Enter the second number: 
NL
ADD a, b, result
ECHO Hey
ECHO username
ECHO The result of both numbers is
ECHO result

; By the way, vars are also supported
VAR message, Hello World
ECHO message

```
Let's go through it line by line (like an interpreter): 
`; Code Example for SAC`: Comment will not be executed.  
`IMPORT`: Imports all variables that were previously saved with `EXPORT`.  
`ECHO Welcome to the simple calculator. Before continuing, please enter your username.`: Prints the message from the first argument.  
`NL`: New line, because it does not make new lines automatically.  
`GET username, How is your username:`: Asks the user for a username and saves it to the variable `username`.  
`GET a, Enter the first number:`: Asks the user for a number and saves it into the variable `a`.  
`GET b, Enter the second number:`: Asks the user for a number and saves it into the variable `b`.  
`ADD a, b, result`: Adds the numbers `a` and `b`; the result will be saved in the variable `result`.  
`ECHO Hey`: Prints "Hey."  
`ECHO username`: Prints the variable `username`.  
`ECHO The result of both numbers is`: Prints the first argument.  
`ECHO result`: Prints the result variable.  
`VAR message, Hello World`: Defines the variable `message` with the value `Hello World`.
## Known Limitations
- When you try to echo something and the last character is a space, it does not print the last space.
- If you try to define a variable and the variable value contains a comma, it only saves the part before the comma. For example: `VAR message, Hello, World!` saves `Hello`.
## Download

You can download it from [here](/files/sac.py). If this link does not work, try [this](https://gist.github.com/FiOS-repo/2bbbdd5e2eab21802ccfc9b399a3f5f0) mirror. It does not require any dependencies; the code needs to be defined in the code variable at the top.








