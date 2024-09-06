import React, { useState } from 'react';
import { useForm } from '../../context/FormState';
import { FormState } from '../../context/FormState';
import { ActionType } from '../../context/FormState';

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

interface InputFieldProps {
	placeholder?: string;
	identifier: keyof FormState; 
}

const InputField: React.FC<InputFieldProps> = ({ placeholder, identifier }) => {
	const [error, setError] = useState<string | null>(null);
	const { state, dispatch } = useForm();

	// Dispatch the corresponding action based on the identifier (key in FormState)
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		// Automatically map the identifier to the correct action type
		dispatch({
			type: actionTypeMap[identifier], // Use the map to get the correct action type
			payload: value,
		});
	};

	return (
		<input
			className="appearance-none flex flex-row items-center justify-between w-full px-4 py-3 border border-gray-300 rounded-xl
      hover:border-primary focus:border-primary focus:outline-none focus:shadow-onFocusInput transition-shadow duration-300"
			placeholder={placeholder}
			onChange={handleChange}
			value={state[identifier]} // Dynamically access the value from the FormState based on the identifier
		/>
	);
};

export default InputField;
