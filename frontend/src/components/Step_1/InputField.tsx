import React, { useState } from 'react';
import DropdownOverlay from '../ui/general/DropdownOverlay';
import DropdownItem from '../ui/general/DropdownItem';
import { IoMdArrowDropdown } from 'react-icons/io';

interface InputFieldProps {
	placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({ placeholder }) => {
	const [value, setValue] = useState<string | null>(null); // Store the selected option

	return (
		<input
			className="appearance-none flex flex-row items-center justify-between w-full px-4 py-3 border border-gray-300 rounded-xl cursor-pointer
      hover:border-primary focus:border-primary focus:outline-none  focus:shadow-onFocusInput transition-shadow duration-300"
			placeholder={placeholder}
		/>
	);
};

export default InputField;
