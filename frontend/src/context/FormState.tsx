import React, { createContext, useReducer, useContext, ReactNode } from 'react';

// Define the structure of your form's state
interface FormState {
	locationType: string;
	locationNumber: string;
	processLeadingPersonnel: string;
	serviceType: string;
	partnersCount: string;
	employeesCount: string;
	revenuePerYear: string;
	operatingCostsPerYear: string;
}

const initialFormState: FormState = {
	locationType: '',
	locationNumber: '',
	processLeadingPersonnel: '',
	serviceType: '',
	partnersCount: '',
	employeesCount: '',
	revenuePerYear: '',
	operatingCostsPerYear: '',
};

// Define all possible action types
type ActionType =
	| { type: 'SET_LOCATION_TYPE'; payload: string }
	| { type: 'SET_LOCATION_NUMBER'; payload: string }
	| { type: 'SET_PROCESS_LEADING_PERSONNEL'; payload: string }
	| { type: 'SET_SERVICE_TYPE'; payload: string }
	| { type: 'SET_PARTNERS_COUNT'; payload: string }
	| { type: 'SET_EMPLOYEES_COUNT'; payload: string }
	| { type: 'SET_REVENUE_PER_YEAR'; payload: string }
	| { type: 'SET_OPERATING_COSTS_PER_YEAR'; payload: string };

// Reducer to update the form state
function formReducer(state: FormState, action: ActionType): FormState {
	switch (action.type) {
		case 'SET_LOCATION_TYPE':
			return { ...state, locationType: action.payload };
		case 'SET_LOCATION_NUMBER':
			return { ...state, locationNumber: action.payload };
		case 'SET_PROCESS_LEADING_PERSONNEL':
			return { ...state, processLeadingPersonnel: action.payload };
		case 'SET_SERVICE_TYPE':
			return { ...state, serviceType: action.payload };
		case 'SET_PARTNERS_COUNT':
			return { ...state, partnersCount: action.payload };
		case 'SET_EMPLOYEES_COUNT':
			return { ...state, employeesCount: action.payload };
		case 'SET_REVENUE_PER_YEAR':
			return { ...state, revenuePerYear: action.payload };
		case 'SET_OPERATING_COSTS_PER_YEAR':
			return { ...state, operatingCostsPerYear: action.payload };
		default:
			return state;
	}
}

const FormContext = createContext<{
	state: FormState;
	dispatch: React.Dispatch<ActionType>;
}>({
	state: initialFormState,
	dispatch: () => null,
});

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [state, dispatch] = useReducer(formReducer, initialFormState);

	return <FormContext.Provider value={{ state, dispatch }}>{children}</FormContext.Provider>;
};

export const useForm = () => useContext(FormContext);
