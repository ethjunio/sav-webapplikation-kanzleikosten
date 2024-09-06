import React from 'react';
import InputField from './InputField';
import InputFieldDropdown from './InputFieldDropdown';
import content from '../../assets/content.json';
import { useLanguage } from '../../context/LanguageContext';
import { languageContentType } from '../../types/languageContentType';
import cn from 'classnames';

const LocationInputCard: React.FC<{ className?: string }> = ({ className }) => {
	const { language } = useLanguage();

	const ComponentContent = (content as languageContentType)[language as keyof typeof content].locationInputCard;

	return (
		<div className={cn('flex flex-col gap-8 p-10 rounded-xl bg-gray-100', className)}>
			<div className="flex flex-col gap-2">
				<span className="font-medium">{ComponentContent?.locationType}</span>

				<InputFieldDropdown options={['option', 'option 2']} />
			</div>
			<div className="flex flex-col gap-2">
				<span className="font-medium">{ComponentContent?.locationNumber}</span>
				<InputField placeholder={ComponentContent?.placeholder} />{' '}
			</div>
		</div>
	);
};

export default LocationInputCard;
