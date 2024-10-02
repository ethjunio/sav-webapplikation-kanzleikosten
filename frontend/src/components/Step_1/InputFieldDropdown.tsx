import DropdownOverlay from '../ui/general/DropdownOverlay';
import DropdownItem from '../ui/general/DropdownItem';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useForm, FormState, ActionType } from '../../context/FormState';
import { useLanguage } from '../../context/LanguageContext';
import { languageContentType } from '../../types/languageContentType';
import content from '../../assets/content.json';

// Exclude 'outputParameters' from the identifiers
type FormStateKey = Exclude<keyof FormState, 'outputParameters'>;

// Define a mapping from identifiers to action creators
const actionCreators: Record<FormStateKey, (value: string) => ActionType> = {
  locationType: (value) => ({
    type: 'SET_LOCATION_TYPE',
    payload: value as 'localSwitzerland' | 'regionalSwitzerland' | '',
  }),
  locationNumber: (value) => ({ type: 'SET_LOCATION_NUMBER', payload: value }),
  processLeadingPersonnel: (value) => ({
    type: 'SET_PROCESS_LEADING_PERSONNEL',
    payload: value,
  }),
  serviceType: (value) => ({
    type: 'SET_SERVICE_TYPE',
    payload: value as 'repetitiveTasksIndividualizedOfferings' | 'bespokeStandard' | 'bespokeHighEnd' | '',
  }),
  partnersCount: (value) => ({ type: 'SET_PARTNERS_COUNT', payload: value }),
  employeesCount: (value) => ({ type: 'SET_EMPLOYEES_COUNT', payload: value }),
  revenuePerYear: (value) => ({ type: 'SET_REVENUE_PER_YEAR', payload: value }),
  operatingCostsPerYear: (value) => ({
    type: 'SET_OPERATING_COSTS_PER_YEAR',
    payload: value,
  }),
};

interface InputFieldDropdownProps {
  options: string[]; // Array of options to display in the dropdown
  identifier: FormStateKey; // Use the updated type here
}

export default function InputFieldDropdown({ options, identifier }: InputFieldDropdownProps) {
  const { state, dispatch } = useForm();
  const { language } = useLanguage();

  const ComponentContent = (content as languageContentType)[language as keyof typeof content].dropdownComponent;
  const dropdownOptions = (content as languageContentType)[language as keyof typeof content].dropdownOptions as any;

  // Handle option selection from the dropdown
  const handleOptionSelect = (option: string) => {
    dispatch(actionCreators[identifier](option));
  };

  return (
    <DropdownOverlay
      trigger={
        <button
          className="flex flex-row items-center text-nowrap justify-between bg-white w-full px-4 py-3 border border-gray-300 rounded-xl cursor-pointer
      hover:border-primaryFade focus:border-primaryFade focus:shadow-onFocusInput transition-all "
        >
          <span className="text-start overflow-hidden">
            {dropdownOptions[state[identifier]] || ComponentContent?.placeholder}
          </span>
          <div className="">
            <IoMdArrowDropdown />
          </div>
        </button>
      }
    >
      {options.map((option) => (
        <DropdownItem
          onClick={() => {
            handleOptionSelect(option);
          }}
        >
          {dropdownOptions[option]}
        </DropdownItem>
      ))}
    </DropdownOverlay>
  );
}
