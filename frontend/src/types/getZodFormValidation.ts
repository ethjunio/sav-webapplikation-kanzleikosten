import { z } from 'zod';
import content from '../assets/content.json'; // Path to your content.json file
// Function to generate the schema based on language
export const getZodFormValidationLocation = (language: string) => {
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

export const getZodFormValidationProcess = (language: string) => {
	const errorMessages = (content as any)[language].errorMessages;

	return z.object({
		processLeadingPersonnel: z
			.string()
			.min(1, errorMessages.processPersonnelPercentageRequired) // Ensure input is provided
			.transform((val) => parseFloat(val)) // Convert the string to a number
			.refine((val) => !isNaN(val), { message: errorMessages.processPersonnelPercentageInvalid }) // Ensure it's a valid number
			.refine((val) => val >= 0 && val <= 100, { message: errorMessages.processPersonnelPercentageRange }), // Ensure percentage is between 0 and 100
		serviceType: z.string().min(1, errorMessages.serviceTypeRequired), // Ensure an option is selected
		employeesCount: z
			.string()
			.min(1, errorMessages.employeeCountRequired) // Ensure input is provided
			.transform((val) => parseFloat(val)) // Convert the string to a number
			.refine((val) => !isNaN(val), { message: errorMessages.employeeCountInvalid }) // Ensure it's a valid number
			.refine((val) => val > 0, { message: errorMessages.employeeCountGreaterThanZero }) // Ensure it's positive
			.refine((val) => Number.isInteger(val), { message: errorMessages.employeeCountInteger }), // Ensure it's a full integer
		partnersCount: z
			.string()
			.min(1, errorMessages.partnerCountRequired) // Ensure input is provided
			.transform((val) => parseFloat(val)) // Convert the string to a number
			.refine((val) => !isNaN(val), { message: errorMessages.partnerCountInvalid }) // Ensure it's a valid number
			.refine((val) => val > 0, { message: errorMessages.partnerCountGreaterThanZero }) // Ensure it's positive
			.refine((val) => Number.isInteger(val), { message: errorMessages.partnerCountInteger }), // Ensure it's a full integer
	});
};

export const getZodFormValidationFinances = (language: string) => {
	const errorMessages = (content as any)[language].errorMessages;

	return z.object({
		revenuePerYear: z
			.string()
			.min(1, errorMessages.revenuePerYearRequired) // Ensure input is provided
			.transform((val) => parseFloat(val)) // Convert the string to a number
			.refine((val) => !isNaN(val), { message: errorMessages.revenuePerYearInvalid }) // Ensure it's a valid number
			.refine((val) => val > 0, { message: errorMessages.revenuePerYearGreaterThanZero }), // Ensure it's positive
		operatingCostsPerYear: z
			.string()
			.min(1, errorMessages.operatingCostsPerYearRequired) // Ensure input is provided
			.transform((val) => parseFloat(val)) // Convert the string to a number
			.refine((val) => !isNaN(val), { message: errorMessages.operatingCostsPerYearInvalid }) // Ensure it's a valid number
			.refine((val) => val > 0, { message: errorMessages.operatingCostsPerYearGreaterThanZero }), // Ensure it's positive
	});
};
