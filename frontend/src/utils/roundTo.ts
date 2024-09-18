// utils/roundTo.ts

export function roundTo(value: any, digits: number): number {
	// Convert the input value to a number
	const num = parseFloat(value);

	// Validate that the input is a number
	if (isNaN(num)) {
		throw new Error('Invalid number input');
	}

	// Validate that digits is a non-negative integer
	if (!Number.isInteger(digits) || digits < 0) {
		throw new Error('Digits must be a non-negative integer');
	}

	const factor = Math.pow(10, digits);

	// Perform the rounding
	return Math.round(num * factor) / factor;
}
