const fib = function (number) {
  if (number < 0) {
    return fib(number * -1);
  }
  if (number <= 2) return 1;
  else return fib(number - 1) + fib(number - 2);
};

let number = process.argv[2];
console.log(`Fibonacci(${number}) =`, fib(number));
