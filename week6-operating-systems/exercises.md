### 1. When you see a command line prompt and nothing else, you may feel like you’re in a text-based game. If so you are not far off. Your instinct may be to type the word “help”. Does this help? What does the help command do?

Shows you a list of shell commands that are defined internally.

### 2. The cd command allows you to change your current directory. What options are available to the cd command?

| Options | Description                                                                                                       |
| ------- | ----------------------------------------------------------------------------------------------------------------- |
| -L      | force symbolic links to be followed                                                                               |
| -P      | Use physical directory structuer without following symbolic links                                                 |
| -e      | Exits if -P supplied but working directory cannot be found with a non-zero status                                 |
| -@      | on systems which support it, presents a file with extended attributes asa director containing the file attributes |

### 3. What’s the difference between man and help?

_man_ is used to display the user manual of any commands we can run in a terminal. Things like executable programs, system calls, library calls, etc. An example would be man printf where it will return manual pages of the command printf. You can also specify specific sections of manual pages which it should return.

_help_ command lists all the command line utilities which linux provides, in other words helps you learn about any of the built in commands.
