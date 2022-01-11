section .text
global pangram
pangram:
	xor edx, edx
.loop:
	movzx ecx, byte [rdi]	; read next char
	or ecx, 32
	sub ecx, 'a'
	cmp ecx, 0
	je .end
.end:
	xor eax, eax
	and edx, 0x03ffffff
	cmp edx, 0x03ffffff		; it's a pangram if low order 26 bits are set
	sete al
	ret
