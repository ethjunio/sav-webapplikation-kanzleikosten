import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

interface DropdownItemProps {
	children?: React.ReactNode; // The content of the dropdown item (text, icon, etc.)
	onClick?: () => void; // Optional onClick handler for the dropdown item
	languageText?: string;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ children, onClick, languageText }) => {
	const { language } = useLanguage();
	const isSelected = language === languageText;

	return (
		<div onClick={onClick} className={`cursor-pointer py-2 px-4  hover:bg-gray-100 rounded-xl ${isSelected && 'text-primary'}`}>
			{languageText} {!languageText && children}
		</div>
	);
};

export default DropdownItem;
