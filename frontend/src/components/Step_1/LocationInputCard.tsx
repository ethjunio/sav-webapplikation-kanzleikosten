import React, { forwardRef, useImperativeHandle, useState } from 'react';
import InputField from './InputField';
import InputFieldDropdown from './InputFieldDropdown';
import content from '../../assets/content.json';
import { useLanguage } from '../../context/LanguageContext';
import { languageContentType } from '../../types/languageContentType';
import cn from 'classnames';
import { useForm } from '../../context/FormState';
import { getZodFormValidationLocation } from '../../types/getZodFormValidation';
import { IoMdAlert } from 'react-icons/io';

const LocationInputCard = forwardRef(({ className }: { className?: string }, ref) => {
	const { language } = useLanguage();
	const { state } = useForm();
	const [error, setError] = useState<string | null>(null);

	const ComponentContent = (content as languageContentType)[language as keyof typeof content].locationInputCard;

	const DropdownOptions = [
		'localSwitzerland',
		'regionalSwitzerland',
	];

	const validateForm = () => {
		const schema = getZodFormValidationLocation(language);
		const result = schema.safeParse({
			locationType: state.locationType,
			locationNumber: state.locationNumber,
		});

		if (!result.success) {
			setError(result.error.errors[0].message);
			setTimeout(() => {
				setError(null); // Clear the error after 5 seconds
			}, 3000);
			return false; // Return false if validation fails
		} else {
			setError(null);
			return true; // Return true if validation passes
		}
	};

	useImperativeHandle(ref, () => ({
		validateForm,
	}));

	return (
		<div className={cn('flex flex-col gap-8 p-10 rounded-xl bg-gray-100', className)}>
			<div className="flex flex-col gap-2">
				<span className="font-medium">{ComponentContent?.locationType}</span>

				<InputFieldDropdown options={DropdownOptions} identifier="locationType" />
			</div>
			<div className="flex flex-col gap-2">
				<span className="font-medium">{ComponentContent?.locationNumber}</span>
				<InputField placeholder={ComponentContent?.placeholder} identifier="locationNumber" />
			</div>
			{error && (
				<div className="flex flex-row items-center justify-start text-red-500 gap-1 text-sm">
					<IoMdAlert />
					<div className="">{error}</div>
				</div>
			)}
		</div>
	);
});

export default LocationInputCard;
