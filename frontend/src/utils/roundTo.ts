// utils/roundTo.ts

/**
 * Rounds a number to a specified number of decimal places or to the nearest step.
 *
 * @param value - The value to round. It can be a number or a string representing a number.
 * @param digits - The number of decimal places to round to.
 *                - Positive integers round to decimal places (e.g., 2 for cents).
 *                - Zero rounds to the nearest integer.
 *                - Negative integers round to the nearest 10, 100, 1000, etc.
 * @returns The rounded number.
 *
 * @throws Will throw an error if the input value is not a valid number or if digits is not an integer.
 *
 * @example
 * roundTo("3.14159", 2)    // Returns 3.14
 * roundTo(4345, -2)        // Returns 4300
 * roundTo(4350, -2)        // Returns 4400
 * roundTo(1234.5678, 0)    // Returns 1235
 */
export function roundTo(value: any, digits: number): number {
	// Convert the input value to a number
	const num = parseFloat(value);

	// Validate that the input is a number
	if (isNaN(num)) {
		throw new Error('Invalid number input');
	}

	// Validate that digits is an integer
	if (!Number.isInteger(digits)) {
		throw new Error('Digits must be an integer');
	}

	// Calculate the rounding factor based on digits
	const factor = Math.pow(10, digits);

	// Perform the rounding
	return Math.round(num * factor) / factor;
}
