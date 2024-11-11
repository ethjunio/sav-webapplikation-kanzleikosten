import React, { useState } from 'react';
import { useForm } from '../../context/FormState';
import { FormState } from '../../context/FormState';
import { ActionType } from '../../context/FormState';

// Define a mapping from identifiers to action creators
const actionCreators: Record<Exclude<keyof FormState, 'outputParameters'>, (value: string) => ActionType> = {
	locationType: (value) => ({ type: 'SET_LOCATION_TYPE', payload: value as 'localSwitzerland' | 'regionalSwitzerland' | '' }),
	locationNumber: (value) => ({ type: 'SET_LOCATION_NUMBER', payload: value }),
	processLeadingPersonnel: (value) => ({ type: 'SET_PROCESS_LEADING_PERSONNEL', payload: value }),
	serviceType: (value) => ({ type: 'SET_SERVICE_TYPE', payload: value as 'repetitiveTasksIndividualizedOfferings' | 'bespokeStandard' | 'bespokeHighEnd' | '' }),
	partnersCount: (value) => ({ type: 'SET_PARTNERS_COUNT', payload: value }),
	employeesCount: (value) => ({ type: 'SET_EMPLOYEES_COUNT', payload: value }),
	revenuePerYear: (value) => ({ type: 'SET_REVENUE_PER_YEAR', payload: value }),
	operatingCostsPerYear: (value) => ({ type: 'SET_OPERATING_COSTS_PER_YEAR', payload: value }),
};

interface InputFieldProps {
	placeholder?: string;
	identifier: Exclude<keyof FormState, 'outputParameters'>; // Exclude outputParameters
	unit?: string;
}

const InputField: React.FC<InputFieldProps> = ({ placeholder, identifier, unit }) => {
	const [error, setError] = useState<string | null>(null);
	const { state, dispatch } = useForm();

	// Dispatch the corresponding action based on the identifier (key in FormState)
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		dispatch(actionCreators[identifier](value));
	};

	return (
		<div className="relative">
			<input
				className="appearance-none w-full px-4 py-3 border border-gray-300 rounded-xl
          hover:border-primary focus:border-primary focus:outline-none focus:shadow-onFocusInput transition-shadow duration-300 pr-8"
				placeholder={placeholder}
				onChange={handleChange}
				value={state[identifier] as string}
			/>
			{unit && <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">{unit}</span>}
		</div>
	);
};

export default InputField;
