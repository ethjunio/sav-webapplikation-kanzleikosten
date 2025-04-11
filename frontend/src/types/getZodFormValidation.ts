import { z } from 'zod';
import resolveLanguageKeys from "@/utils/resolveLanguageKeys";

const dict = resolveLanguageKeys();

export const zodFormValidationLocation = z.object({
  locationType: z.string().min(1, dict.errorMessages.locationTypeRequired), // Error message from content.json
  locationNumber: z
    .string()
    .min(1, dict.errorMessages.locationNumberRequired) // Ensure the input is provided
    .transform((val) => parseFloat(val)) // Convert the string to a number
    .refine((val) => !isNaN(val), {
      message: dict.errorMessages.locationNumberInvalid,
    }) // Ensure it's a valid number
    .refine((val) => val > 0, {
      message: dict.errorMessages.locationNumberGreaterThanZero,
    }) // Ensure it's positive
    .refine((val) => Number.isInteger(val), {
      message: dict.errorMessages.locationNumberInteger,
    }), // Ensure it's a full integer
});

export const zodFormValidationProcess = z.object({
  processLeadingPersonnel: z
    .string()
    .min(1, dict.errorMessages.processPersonnelPercentageRequired) // Ensure input is provided
    .transform((val) => parseFloat(val)) // Convert the string to a number
    .refine((val) => !isNaN(val), {
      message: dict.errorMessages.processPersonnelPercentageInvalid,
    }) // Ensure it's a valid number
    .refine((val) => val >= 0 && val <= 100, {
      message: dict.errorMessages.processPersonnelPercentageRange,
    }), // Ensure percentage is between 0 and 100
  serviceType: z.string().min(1, dict.errorMessages.serviceTypeRequired), // Ensure an option is selected
  employeesCount: z
    .string()
    .min(1, dict.errorMessages.employeeCountRequired) // Ensure input is provided
    .transform((val) => parseFloat(val)) // Convert the string to a number
    .refine((val) => !isNaN(val), {
      message: dict.errorMessages.employeeCountInvalid,
    }) // Ensure it's a valid number
    .refine((val) => val > 0, {
      message: dict.errorMessages.employeeCountGreaterThanZero,
    }) // Ensure it's positive
    .refine((val) => Number.isInteger(val), {
      message: dict.errorMessages.employeeCountInteger,
    }), // Ensure it's a full integer
  partnersCount: z
    .string()
    .min(1, dict.errorMessages.partnerCountRequired) // Ensure input is provided
    .transform((val) => parseFloat(val)) // Convert the string to a number
    .refine((val) => !isNaN(val), {
      message: dict.errorMessages.partnerCountInvalid,
    }) // Ensure it's a valid number
    .refine((val) => val > 0, {
      message: dict.errorMessages.partnerCountGreaterThanZero,
    }) // Ensure it's positive
    .refine((val) => Number.isInteger(val), {
      message: dict.errorMessages.partnerCountInteger,
    }), // Ensure it's a full integer
});

export const zodFormValidationFinances = z.object({
  revenuePerYear: z
    .string()
    .min(1, dict.errorMessages.revenuePerYearRequired) // Ensure input is provided
    .transform((val) => parseFloat(val)) // Convert the string to a number
    .refine((val) => !isNaN(val), {
      message: dict.errorMessages.revenuePerYearInvalid,
    }) // Ensure it's a valid number
    .refine((val) => val > 0, {
      message: dict.errorMessages.revenuePerYearGreaterThanZero,
    }), // Ensure it's positive
  operatingCostsPerYear: z
    .string()
    .min(1, dict.errorMessages.operatingCostsPerYearRequired) // Ensure input is provided
    .transform((val) => parseFloat(val)) // Convert the string to a number
    .refine((val) => !isNaN(val), {
      message: dict.errorMessages.operatingCostsPerYearInvalid,
    }) // Ensure it's a valid number
    .refine((val) => val > 0, {
      message: dict.errorMessages.operatingCostsPerYearGreaterThanZero,
    }), // Ensure it's positive
});
