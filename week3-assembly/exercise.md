# Assembling and running with nasm

Command for mac:
nasm -fmacho64 hello_mac.asm && ld -L/Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/usr/lib -lSystem hello_mac.o && ./a.out

**Some of the questions you will need to answer for yourself to do this:**

1. Which register contains the argument (n)?
   rdi
   In which register will the return value be placed?
   rax
   What instruction is used to do the addition?
   add
   What instruction(s) can be used to construct the loop?
   jump
