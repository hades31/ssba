; ----------------------------------------------------------------------------------------
; Answer
;section .text
;global sum_to_n
;sum_to_n:
;	xor rax, rax
;.loop:
;	add rax, rdi ;add first argument to value in rax
;	sub rdi, 1 ;deduct 1 from argument
;	jg .loop	;jump back to loop if greater than
;	ret
; ----------------------------------------------------------------------------------------

section .text
global sum_to_n
sum_to_n:
	mov eax, edi
	mov edx, edi
	mov ecx, 2
	add edx, 1
	mul edx
	div ecx
	ret     