/**
 * Parses and validates a string of digits for Luhn algorithm processing
 *
 * @param {string} string - Input string potentially containing digits and spaces
 * @returns {number[]|boolean} - Array of digits if valid, false if invalid
 *
 * Steps:
 * 1. Convert input to string and remove all whitespace
 * 2. Check for invalid conditions:
 *    - Empty string
 *    - String shorter than 13 digits (minimum card length)
 *    - String longer than 19 digits (maximum card length)
 *    - All digits are zeros (trivial case)
 * 3. Verify all characters are valid digits
 * 4. Convert valid string to array of numbers
 */
const parseDigits = (string) => {
  // Normalize input: ensure string type and remove all whitespace
  string = String(string);
  string = string.replace(/\s+/g, "");
  const numList = string.split("");

  // Define validation conditions (any true condition makes input invalid)
  const conditions = [
    string === "", // Case 1: Empty string
    string.length < 13, // Case 2: Too short for any valid card
    string.length > 19, // Case 3: Too long for any valid card
    numList.every((char) => char === "0"), // Case 4: All zeros (trivial invalid)
  ];

  // If any condition is true, input is invalid
  if (conditions.some((condition) => condition)) return false;

  // Check if any character is NOT a digit (NaN check)
  const isValidString = numList.some((char) => isNaN(char));
  if (isValidString) return false;

  // Convert array of digit strings to array of numbers
  return numList.map(Number);
};

/**
 * Applies the Luhn algorithm to an array of digits
 *
 * @param {number[]} digits - Array of digits to process
 * @returns {number} - Sum after applying Luhn transformation
 *
 * Algorithm:
 * 1. Process digits from right to left (reduceRight)
 * 2. For every second digit (odd positions from right):
 *    - Double the digit
 *    - If result > 9, subtract 9 (same as adding digits)
 * 3. Sum all transformed digits
 */
const luhnHandler = (digits) =>
  digits.reduceRight((total, num, i) => {
    // Calculate position from right (0-based)
    const reverseIndex = digits.length - 1 - i;

    // Check if this is an "even" position from right (second, fourth, etc.)
    if (reverseIndex % 2 === 1) {
      const doubled = num * 2;
      // Luhn special case: if doubled > 9, subtract 9 (equivalent to digit sum)
      return total + (doubled > 9 ? doubled - 9 : doubled);
    }
    // Odd positions from right remain unchanged
    return total + num;
  }, 0);

/**
 * Validates a card number using the Luhn algorithm
 *
 * @param {string} cardNumber - The card number as a string (may contain spaces)
 * @returns {boolean} - True if valid according to Luhn, false otherwise
 *
 * Process:
 * 1. Parse and validate input digits
 * 2. Apply Luhn algorithm transformation
 * 3. Check if sum is divisible by 10 (valid Luhn number)
 *
 * Note: This validates format only, not card authenticity or issuer.
 *
 * @example
 * luhnAlgorithm("4539 1488 0343 6467") // returns true
 * luhnAlgorithm("1234 5678 9012 3456") // returns false
 */
export const luhnAlgorithm = (cardNumber) => {
  // Step 1: Parse input into digit array or get false if invalid
  const digits = parseDigits(cardNumber);
  if (!digits) return false;

  // Step 2: Apply Luhn algorithm to get checksum
  const result = luhnHandler(digits);

  // Step 3: Valid if checksum is divisible by 10
  return result % 10 === 0;
};
