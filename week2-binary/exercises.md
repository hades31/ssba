# Simple conversion

**1. What are the numbers 9, 136 and 247 in hexadecimal?**

| Decimal | Hexadecimal |
| ------- | ----------- |
| 9       | 0x9         |
| 136     | 0x88        |
| 247     | 0xf7        |

9 = 9r0 => 0x9\
136/16 = 8r8 => 0x88\
247/16 = 15r7 = 0xf7

# CSS colors

**2. In CSS, two ways to specify colors are hexadecimal and rgb. For instance, pure red would be 0xff0000 or rgb(255, 0, 0);. How many colors can be represented in each form?**

Should ideally be the same between hexadecimal and rgb\
In hexadecimal => 16^6 = 16,777,216\
In rgb => 256^3 = 16,777,216\
In binary 2^(4 x 6) = 16,777,216

# Say hello to hellohex

**3. If you were to view a hexadecimal representation of the file, how many hexadecimal characters would you expect? Once you have answered this question, use xxd -p hellohex to confirm.**

hex characters => 17 x 8/4 = 34

8 bits for each byte and each hexadecimal character is 4 bits.

**4. Convert the first 5 bytes in the file by hand to binary. Write these down as you’ll use them again in a later exercise**

68656c6c6f

01101000 01100101 01101100 01101100 01101111

# Basic Conversion

**5. Convert the following decimal numbers to binary**

4 => 0100\
65 => 4r1 => 01000001\
105 => 6r9 => 01101001\
255 => 15r15 => 11111111

**6. Convert the following binary representations of unsigned integers to decimal**

10 => 2^1 = 2\
11 => 2^0 + 2^1 = 3\
1101100 => 6x16 + 12 = 108\
1010101 => 5x16 + 5 = 85

# Unsigned binary addition

**7. Add these two binary numbers and determine the result by doing the addition “in binary”. Convert each number and check that the result matches your expectation.**

11111111 + 00001101

100001100 = 2^8 + 2^3 + 2^2 = 268

255 + 13 = 268

**8. If my registers are only 8 bits wide, what is the value returned from that binary addition? What is this phenomenon called?**
Overflow, when addition of 2 binary numbers results in a number which is too big to fit the available digits.

# Two’s complement conversion

**9. Given the following decimal values, determine their 8 bit two’s complement representations:**\

1. 127 => 7r15 => 01111111
   <br/>
   <br/>

2. -128 => -2^7 = 1000000

- Converting magnitude to binary: 10000000
- Pad 0 to desired bitsize: 10000000
- Invert bits to get 1s complement: 01111111
- Add 1 to get 2s complement: 10000000
  <br/>
  <br/>

3.  -1 => -2^7 + 2^6 + 2^5 + 2^4 + 2^3 + 2^2 + 2^1 + 2^0 = 11111111

- Converting magnitude to binary: 1
- Pad 0 to desired bitsize: 00000001
- Invert bits to get 1s complement: 11111110
- Add 1 to get 2s complement: 11111111
  <br/>
  <br/>

4. 1 => 00000001
   <br/>
   <br/>
5. -14 => -2^7 + 2^6 + 2^5 + 2^4 + 2 ^ 1 = 11110010

- Converting magnitude to binary: 1110
- Pad 0 to desired bitsize: 00001110
- Invert bits to get 1s complement: 11110001
- Add 1 to get 2s complement: 11110010

Method 2:

-14 = -128 + 114\
114 in binary => 7r2 => 01110010\
-128 + 114 = 10000000 + 01110010 = 11110010

**10. Convert the following 8-bit two’s complement numbers to decimal:**

10000011 = -128 + 3 = -125\
11000100 = -128 + 2^6 + 2^2 = -60

# Addition of two’s complement signed integers

**11. What is the sum of the following two signed integers? Does this match your expectations?**

01111111\
10000000+
11111111 = -1 = 127 - 128

**12. How do you negate a number in two’s complement? How can we compute subtraction of two’s complement numbers?**

To negate, flip the bits using 1s complement, then add 1. To compute subtraction, we can negate the nunmber then perform an addition, e.g for 15 - 7

7 in binary is 0000111, -7 is 1111001

So 15 + 7 = 00001111 + 1111001 = 00001000 which is 8.

**13. What is the value of the most significant bit in 8-bit two’s complement? What about 32-bit two’s complement?**
In 8-bit 2's complement -> -2^7 = -128
In 32-bit 2's complement -> -2^(32-1) = -2,147,483,648

# Stretch goal: Integer overflow detection

**14. It can be beneficial for our hardware to be able to detect overflow in two’s complement. To do so, we’d need a rule for determining—based solely on bit patterns—if overflow has occurred. Can you describe such a rule? Consider the following examples:**

If the addition of 2 positive numbers return 0 or a negative number OR if the addition of 2 negative numbers returns a 0 or positive number, an overflow might have occurred.

Notes: Another alternative is to use\
Cn = Cn-1 (no overflow)\
Cn != Cn-1 (overflow)

# Byte ordering

**15. We’ve encoded the number 9001 in the file 9001. Did we use big-endian or little-endian encoding? You may wish to use xxd in either the default (hex) mode or with the -b flag for binary.**

Binary: 0010 0011 0010 1001

Hex: 2329

Method 1:
If little endian used
Value: 2*16^0 + 3*16 + 2*16^2 + 9*16^3 = 37426

If big endian used
Sum: 9*16^0+2*16+3*16^2 + 2*16^3 = 9001

Big endian was used.

Method 2:
Another method is to convert from hex to decimal. 0x2329 => 35 41

**16. The file tcpheader contains the first 16 bytes extracted out of a TCP header. ? Using a diagram of the TCP segment structure, Can you determine the values of the sequence number, acknowledgment number, source port and destination port?**

af00 bc06 441e 7368 eff2 a002 81ff 5600

Sequence number:\
In hexadecimal -> 441e 7368\
In decimal -> 4*16^7 + 4*16^6 + 16^5 + 14*16^4+ 7*16^3 + 3*16^2 + 6*16^1 + 8 = 1142846312

Acknowledgement number:\
In hexadecimal -> eff2 a002\
In decimal -> 14*16^7 + 15*16^6 + 15*16^5 + 2*16^4 + 10\*16^3 + 2 = 4025655298

Source port:\
In hexadecimal -> af00\
In decimal -> 10*16^3 + 15*16^2 = 44800

Destination port:\
In hexadecimal -> bc06\
In decimal -> 11*16^3 + 12*16^2 + 6 = 48134

**17. As a stretch goal, see if you can determine the specified length of the TCP header in tcpheader (remember, we have shared only the first 16 bytes). Looking at the header specification again, can you determine if ours contained any optional fields?**

Data offset:\
8 (data offset byte) \* 4 = 32

Not too sure if this is the correct way to compute

TCP header = 20 bytes, if this header is 32 bytes, it contains 32 - 20 = 12 bytes of optional data

**18. There are a number of BMP format variants. Which one is these? (they are both the same variant).**\
Windows 3.1x, 95, NT. When running xxd image1.bmp, BM appears in the header.

Note: First 2 bytes also translate to 'BM'. In hexadecimal it is 424d which is 66(B) and 77(M).

**19. There are a number of BMP format variants. Which one is these? (they are both the same variant).**\
0a0e 0000

14x16^4 + 10x16^6 = 168,689,664

**20. What are their respective dimensions?**\

image1.bmp\

Width:\
In hexadecimal: 0018 0000\
In decimal: 16 + 8 = 24 pixels

Height:\
In hexadecimal: 0030 0000
In decimal: 48 pixels

image2.bmp\
Width:\
In hexadecimal: 0020 0000\
In decimal: 16 x 2 = 32 pixels

Height:\
In hexadecimal: 0040 0000\
In decimal: 64 pixels

**21. How much space is required to store each pixel?**
6 hexadecimals x 4 = 24 bits = 3 bytes

**22. Where does the data start?**
Same for both\
8a -> location in hexadecimal: 8x16+ 10 = 138 bytes

**23. What are the contents of each of the files?**
image1.bmp\
All white pixels (ff,ff,ff)

image2.bmp
All red pixels (00,00,ff)

# IEEE Floating Point

**24. Identify the 3 components of this 32-bit IEEE Floating Point Number and their values.**

01000010001010100000000000000000

Using the three components, compute the value this represents.

Sign bit: 0\
Exponent bit: 10000100\
Fraction bit: 01010100000000000000000

Exponent bit in decimal: 2^2 + 2^7 = 132\
e = 132 - 127 = 5\
m = 2^-2+2^-4+2^-6 = 0.328125

Decimal value: (-1)^0 x (1+0.328125) x 2^5 = 42.5

**25. For the largest fixed exponent, 11111110 == 254 - 127 = 127, what is the smallest (magnitude) incremental change that can be made to a number?**

Formula:
(-1)^s x (1 + m) x 2^e

Given that the smallest you can increase the mantissa by is the last bit, which is 2^-23, the increase going moving the last bit from 0 to 1 would be:

2^-23 x 2^127 = 2^104

**26. For the smallest (most negative) fixed exponent, what is the smallest (magnitude) incremental change that can be made to a number?**
Smallest fixed exponent: -1 (because 00000000 reserved), so e = 1 - 127 = -126

Given that the smallest you can increase the mantissa by is the last bit, which is 2^-23, the increase going moving the last bit from 0 to 1 would be:
2^-23 x 2^-126 = 2^-149

**27. What does this imply about the precision of IEEE Floating Point values?**

It loses precision because of the maximum number of bits the 32 bit can represent.

**28. If you echo ☃ > snowman.txt how large do you expect this file to be, considering that the corresponding Unicode code point is U+2603?The echo command won’t write any header information to the file, so the first byte of the file will be the first byte of the snowman. It will however add a newline character at the end, so you may be off by one. The point of this question is to test that you understand a basic aspect of the UTF-8 encoding scheme, which requires multiple bytes to encode a Unicode snowman. Remember to check!**

1 byte + 2 continuation bytes = 3

**29. If you were to hexdump or xxd the file, what exactly do you expect to see? Again, be sure to verify your hypothesis!**

In binary

00000000: 11100010 10011000 10000011 00001010

The last 00001010 is the new line character \n.

**30. The 5 first bytes of hellohex—which you previously converted from hex to binary—are actually characters. What are they? It is cheating to use xxd or hexdump at this point to just read the ASCII interpretation. 😀**

01101000: 2^3 + 2^5 + 2^6 = 104 => h

01100101: 1 + 2^2 + 2^5 + 2^6 = 101 => e

01101100: 2^2 + 2^3 + 2^5 + 2^6 = 108 => l

01101100: 2^2 + 2^3 + 2^5 + 2^6 = 108 => l

01101111: 1 + 2 + 2^2 + 2^3 + 2^5 + 2^6 = 111 => o

hello

**31. What character encoding is used in this file? If we do look at the ASCII interpretation column in xxd or hexdump, we see some dots signifying that these are not printable ASCII characters. Could they still be characters?**

11110000 10011111 10011000 10000000 00001010

UTF-8 character

**32. What if we told you there was a multi-byte Unicode character at the end of the file. Could you figure out what it is? What if we told you it’s encoded in UTF-8?**

11110000 10011111 10011000 10000000 00001010
000 11111 011000 000000

0001 1111 0110 0000 0000

U+1F600 😀
