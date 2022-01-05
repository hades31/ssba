# Simple conversion

\*\*1. What are the numbers 9, 136 and 247 in hexadecimal?

| Decimal | Hexadecimal |
| ------- | ----------- |
| 9       | 0x9         |
| 136     | 0x88        |
| 247     | 0xf7        |

9 = 9r0 => 0x9\
136/16 = 8r8 => 0x88\
247/16 = 15r7 = 0xf7

# CSS colors

\*\*2. In CSS, two ways to specify colors are hexadecimal and rgb. For instance, pure red would be 0xff0000 or rgb(255, 0, 0);. How many colors can be represented in each form?

Should ideally be the same between hexadecimal and rgb\
In hexadecimal => 16^6 = 16,777,216\
In rgb => 256^3 = 16,777,216\
In binary 2^(4\*6) = 16,777,216\

# Say hello to hellohex

\*\*3. If you were to view a hexadecimal representation of the file, how many hexadecimal characters would you expect? Once you have answered this question, use xxd -p hellohex to confirm.

hex characters => 17\*8/4 = 34

8 bits for each byte and each hexadecimal character is 4 bits.

\*\*4. Convert the first 5 bytes in the file by hand to binary. Write these down as you’ll use them again in a later exercise

68656c6c6f

01101000 01100101 01101100 01101100 01101111
