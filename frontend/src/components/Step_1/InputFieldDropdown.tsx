import React, { useState } from 'react';
import DropdownOverlay from '../ui/general/DropdownOverlay';
import DropdownItem from '../ui/general/DropdownItem';
import { IoMdArrowDropdown } from 'react-icons/io';

interface InputFieldDropdownProps {
	options: string[]; // Array of options to display in the dropdown
}

const InputFieldDropdown: React.FC<InputFieldDropdownProps> = ({ options }) => {
	const [selectedOption, setSelectedOption] = useState<string | null>(null); // Store the selected option

	// Handle option selection from the dropdown
	const handleOptionSelect = (option: string) => {
		setSelectedOption(option); // Update selected option
	};

	return (
		<DropdownOverlay
			trigger={
				<button
					className="flex flex-row items-center justify-between bg-white w-full px-4 py-3 border border-gray-300 rounded-xl cursor-pointer
      hover:border-primaryFade focus:border-primaryFade focus:shadow-onFocusInput transition-all"
				>
					<span>{selectedOption || 'Select an option'}</span>
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
