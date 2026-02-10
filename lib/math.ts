/**
 * Generates the first n numbers in the Fibonacci sequence
 * @param n - Number of Fibonacci numbers to generate (0-indexed)
 * @returns Array of Fibonacci numbers, starting with [0, 1, 1, 2, 3, 5, 8, ...]
 * @example
 * fibonacci(7) // returns [0, 1, 1, 2, 3, 5, 8]
 * fibonacci(0) // returns []
 * fibonacci(1) // returns [0]
 */
export function fibonacci(n: number): number[] {
  if (n === 0) return [];
  if (n === 1) return [0];
  
  const result: number[] = [0, 1];
  
  for (let i = 2; i < n; i++) {
    result.push(result[i - 1] + result[i - 2]);
  }
  
  return result;
}

/**
 * Checks if a number is prime
 * @param n - Number to check
 * @returns true if the number is prime, false otherwise
 * @example
 * isPrime(7) // returns true
 * isPrime(4) // returns false
 * isPrime(1) // returns false
 * isPrime(2) // returns true
 */
export function isPrime(n: number): boolean {
  if (n <= 1) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  
  const sqrt = Math.sqrt(n);
  for (let i = 3; i <= sqrt; i += 2) {
    if (n % i === 0) return false;
  }
  
  return true;
}

/**
 * Filters an array to return only prime numbers
 * @param arr - Array of numbers to filter
 * @returns Array containing only prime numbers from the input, preserving order
 * @example
 * filterPrimes([2, 4, 7, 9, 11]) // returns [2, 7, 11]
 * filterPrimes([1, 4, 6, 8]) // returns []
 */
export function filterPrimes(arr: number[]): number[] {
  return arr.filter(isPrime);
}

/**
 * Computes the greatest common divisor (GCD) of two numbers using Euclidean algorithm
 * @param a - First number
 * @param b - Second number
 * @returns The GCD of a and b
 * @example
 * gcd(24, 36) // returns 12
 * gcd(17, 5) // returns 1
 */
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  
  return a;
}

/**
 * Computes the highest common factor (HCF) of an array of numbers
 * @param arr - Array of positive integers
 * @returns The HCF of all numbers in the array
 * @example
 * computeHCF([24, 36, 60]) // returns 12
 * computeHCF([7]) // returns 7
 */
export function computeHCF(arr: number[]): number {
  if (arr.length === 0) return 0;
  if (arr.length === 1) return arr[0];
  
  return arr.reduce((acc, num) => gcd(acc, num));
}

/**
 * Computes the least common multiple (LCM) of two numbers
 * @param a - First number
 * @param b - Second number
 * @returns The LCM of a and b
 */
function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

/**
 * Computes the least common multiple (LCM) of an array of numbers
 * @param arr - Array of positive integers
 * @returns The LCM of all numbers in the array
 * @example
 * computeLCM([12, 18, 24]) // returns 72
 * computeLCM([7]) // returns 7
 */
export function computeLCM(arr: number[]): number {
  if (arr.length === 0) return 0;
  if (arr.length === 1) return arr[0];
  
  return arr.reduce((acc, num) => lcm(acc, num));
}
