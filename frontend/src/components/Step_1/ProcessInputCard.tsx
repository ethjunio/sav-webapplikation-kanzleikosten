import React, { forwardRef, useState } from 'react';
import InputField from './InputField';
import InputFieldDropdown from './InputFieldDropdown';
import content from '../../assets/content.json';
import { useLanguage } from '../../context/LanguageContext';
import { languageContentType } from '../../types/languageContentType';
import cn from 'classnames';
import { useForm } from '../../context/FormState';
import { getZodFormValidation } from '../../types/getZodFormValidation';

const ProcessInputCard = forwardRef(({ className }: { className?: string }, ref) => {
	const { language } = useLanguage();
	const { state } = useForm();
	const [error, setError] = useState<string | null>(null);

	const ComponentContent = (content as languageContentType)[language as keyof typeof content].processInputCard;

	const validateForm = () => {
		const schema = getZodFormValidation(language);
		const result = schema.safeParse({
			processLeadingPersonnel: state.processLeadingPersonnel,
			serviceType: state.serviceType,
			employeesCount: state.employeesCount,
			partnersCount: state.partnersCount,
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
	return (
		<div className={cn('flex flex-col gap-8 p-10 rounded-xl bg-gray-100', className)}>
			<div className="flex flex-col gap-2">
				<span className="font-medium">{ComponentContent?.processLeadingPersonnel}</span>
				<InputField placeholder={ComponentContent?.inputPlaceholderPercentage} identifier="processLeadingPersonnel" />
			</div>
			<div className="flex flex-col gap-2">
				<span className="font-medium">{ComponentContent?.serviceType}</span>
				<InputFieldDropdown options={['option', 'option 2']} identifier="serviceType" />
			</div>
			<div className="flex flex-col gap-2">
				<span className="font-medium">{ComponentContent?.employeesCount}</span>
				<InputField placeholder={ComponentContent?.inputPlaceholderNumber} identifier="employeesCount" />
			</div>
			<div className="flex flex-col gap-2">
				<span className="font-medium">{ComponentContent?.partnersCount}</span>
				<InputField placeholder={ComponentContent?.inputPlaceholderNumber} identifier="partnersCount" />
			</div>
		</div>
	);
});

export default ProcessInputCard;
