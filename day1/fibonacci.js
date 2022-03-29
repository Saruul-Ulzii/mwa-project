function fibonacci(number) {
  console.log(number);
  if (number < 0) {
    return fibonacci(number * -1);
  }
  if (number <= 2) return 1;
  else return fibonacci(number - 1) + fibonacci(number - 2);
}

console.log(fibonacci(number));
