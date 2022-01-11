#include <stdio.h>
#include <stdlib.h>

int sum_to_n(int n);

#define NUM_OF_TIMES 1000000000

int main(int argc, char **argv)
{
  int n = atoi(argv[1]);
  printf("main - %d\n", sum_to_n(n));
  return sum_to_n(5);
}

int sum_to_n(n)
{
  return (n * (n + 1)) / 2;
}
