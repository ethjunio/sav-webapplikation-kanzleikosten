import useI18n from '@/translations/i18n';
import { z } from 'zod';

const translate = useI18n();

export const zodFormValidationLocation = z.object({
  locationType: z.string().min(1, translate('errorMessages.locationTypeRequired')), // Error message from content.json
  locationNumber: z
    .string()
    .min(1, translate('errorMessages.locationNumberRequired')) // Ensure the input is provided
    .transform((val) => parseFloat(val)) // Convert the string to a number
    .refine((val) => !isNaN(val), {
      message: translate('errorMessages.locationNumberInvalid'),
    }) // Ensure it's a valid number
    .refine((val) => val > 0, {
      message: translate('errorMessages.locationNumberGreaterThanZero'),
    }) // Ensure it's positive
    .refine((val) => Number.isInteger(val), {
      message: translate('errorMessages.locationNumberInteger'),
    }), // Ensure it's a full integer
});

export const zodFormValidationProcess = z.object({
  processLeadingPersonnel: z
    .string()
    .min(1, translate('errorMessages.processPersonnelPercentageRequired')) // Ensure input is provided
    .transform((val) => parseFloat(val)) // Convert the string to a number
    .refine((val) => !isNaN(val), {
      message: translate('errorMessages.processPersonnelPercentageInvalid'),
    }) // Ensure it's a valid number
    .refine((val) => val >= 0 && val <= 100, {
      message: translate('errorMessages.processPersonnelPercentageRange'),
    }), // Ensure percentage is between 0 and 100
  serviceType: z.string().min(1, translate('errorMessages.serviceTypeRequired')), // Ensure an option is selected
  employeesCount: z
    .string()
    .min(1, translate('errorMessages.employeeCountRequired')) // Ensure input is provided
    .transform((val) => parseFloat(val)) // Convert the string to a number
    .refine((val) => !isNaN(val), {
      message: translate('errorMessages.employeeCountInvalid'),
    }) // Ensure it's a valid number
    .refine((val) => val > 0, {
      message: translate('errorMessages.employeeCountGreaterThanZero'),
    }) // Ensure it's positive
    .refine((val) => Number.isInteger(val), {
      message: translate('errorMessages.employeeCountInteger'),
    }), // Ensure it's a full integer
  partnersCount: z
    .string()
    .min(1, translate('errorMessages.partnerCountRequired')) // Ensure input is provided
    .transform((val) => parseFloat(val)) // Convert the string to a number
    .refine((val) => !isNaN(val), {
      message: translate('errorMessages.partnerCountInvalid'),
    }) // Ensure it's a valid number
    .refine((val) => val > 0, {
      message: translate('errorMessages.partnerCountGreaterThanZero'),
    }) // Ensure it's positive
    .refine((val) => Number.isInteger(val), {
      message: translate('errorMessages.partnerCountInteger'),
    }), // Ensure it's a full integer
});

export const zodFormValidationFinances = z.object({
  revenuePerYear: z
    .string()
    .min(1, translate('errorMessages.revenuePerYearRequired')) // Ensure input is provided
    .transform((val) => parseFloat(val)) // Convert the string to a number
    .refine((val) => !isNaN(val), {
      message: translate('errorMessages.revenuePerYearInvalid'),
    }) // Ensure it's a valid number
    .refine((val) => val > 0, {
      message: translate('errorMessages.revenuePerYearGreaterThanZero'),
    }), // Ensure it's positive
  operatingCostsPerYear: z
    .string()
    .min(1, translate('errorMessages.operatingCostsPerYearRequired')) // Ensure input is provided
    .transform((val) => parseFloat(val)) // Convert the string to a number
    .refine((val) => !isNaN(val), {
      message: translate('errorMessages.operatingCostsPerYearInvalid'),
    }) // Ensure it's a valid number
    .refine((val) => val > 0, {
      message: translate('errorMessages.operatingCostsPerYearGreaterThanZero'),
    }), // Ensure it's positive
});
