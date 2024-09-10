import React, { useState } from 'react';
import DropdownOverlay from '../ui/general/DropdownOverlay';
import DropdownItem from '../ui/general/DropdownItem';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useForm, FormState, ActionType } from '../../context/FormState';
import { useLanguage } from '../../context/LanguageContext';
import { languageContentType } from '../../types/languageContentType';
import content from '../../assets/content.json';

// Mapping from form state keys to action types
const actionTypeMap: Record<keyof FormState, ActionType['type']> = {
	locationType: 'SET_LOCATION_TYPE',
	locationNumber: 'SET_LOCATION_NUMBER',
	processLeadingPersonnel: 'SET_PROCESS_LEADING_PERSONNEL',
	serviceType: 'SET_SERVICE_TYPE',
	partnersCount: 'SET_PARTNERS_COUNT',
	employeesCount: 'SET_EMPLOYEES_COUNT',
	revenuePerYear: 'SET_REVENUE_PER_YEAR',
	operatingCostsPerYear: 'SET_OPERATING_COSTS_PER_YEAR',
};

interface InputFieldDropdownProps {
	options: string[]; // Array of options to display in the dropdown
	identifier: keyof FormState;
}

const InputFieldDropdown: React.FC<InputFieldDropdownProps> = ({ options, identifier }) => {
	const { state, dispatch } = useForm();
	const { language } = useLanguage();

	const ComponentContent = (content as languageContentType)[language as keyof typeof content].dropdownComponent;

	// Handle option selection from the dropdown
	const handleOptionSelect = (option: string) => {
		dispatch({ type: actionTypeMap[identifier], payload: option });
	};

	return (
		<DropdownOverlay
			trigger={
				<button
					className="flex flex-row items-center justify-between bg-white w-full px-4 py-3 border border-gray-300 rounded-xl cursor-pointer
      hover:border-primaryFade focus:border-primaryFade focus:shadow-onFocusInput transition-all"
				>
					<span>{state[identifier] || ComponentContent?.placeholder}</span>
					<IoMdArrowDropdown />
				</button>
			}
		>
			{options.map((option, index) => (
				<DropdownItem
					onClick={() => {
						handleOptionSelect(option);
					}}
				>
					{option}
				</DropdownItem>
			))}
		</DropdownOverlay>
	);
};

export default InputFieldDropdown;
