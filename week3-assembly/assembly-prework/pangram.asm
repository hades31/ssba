;--------------------------
;0110 0001 (lower a)
;0010 0000  or
;---------
;0110 0001
;
;0100 0001 (upper a)
;0010 0000  or
;---------
;0110 0001
;--------------------------

section .text
global pangram
pangram:
	; rdi: source string
	xor edx, edx
.loop:
	movzx ecx, byte [rdi]	; read next char
	cmp ecx, 0
	je .end
	xor ecx, 32				; doing an or results in lower 'a' staying as 'a' and upper 'A' becoming 'a'. Opposite is XOR
	sub ecx, 'A'
	bts edx, ecx			; set the corresponding bit in our bit set
	inc rdi
	jmp .loop
.end:
	xor eax, eax
	and edx, 0x03ffffff
	cmp edx, 0x03ffffff		; it's a pangram if low order 26 bits are set
	sete al
	ret