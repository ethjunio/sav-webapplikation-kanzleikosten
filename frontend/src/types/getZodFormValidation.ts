import { z } from 'zod';
import content from '../assets/content.json'; // Path to your content.json file
// Function to generate the schema based on language
export const getZodFormValidation = (language: string) => {
	const errorMessages = (content as any)[language].errorMessages;

	return z.object({
		locationType: z.string().min(1, errorMessages.locationTypeRequired), // Error message from content.json
		locationNumber: z
			.string()
			.min(1, errorMessages.locationNumberRequired) // Ensure the input is provided
			.transform((val) => parseFloat(val)) // Convert the string to a number
			.refine((val) => !isNaN(val), { message: errorMessages.locationNumberInvalid }) // Ensure it's a valid number
			.refine((val) => val > 0, { message: errorMessages.locationNumberGreaterThanZero }) // Ensure it's positive
			.refine((val) => Number.isInteger(val), { message: errorMessages.locationNumberInteger }), // Ensure it's a full integer
	});
};
