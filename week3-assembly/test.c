#include <stdio.h>
extern int pangram(char *phrase);

int main(int argc, char **argv)
{
  printf("%d\n", pangram(argv[1]));
}
