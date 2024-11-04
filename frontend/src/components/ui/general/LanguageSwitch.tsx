import React from 'react';
import { FaEarthAfrica } from 'react-icons/fa6';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useLanguage } from '../../../context/LanguageContext';
import DropdownOverlay from './DropdownOverlay';
import DropdownItem from './DropdownItem';
import { useWindowWidth } from '../../../context/WindowWidthContext';

const LangugageSwitch = () => {
	const { language, setLanguage } = useLanguage();
	const { width } = useWindowWidth();

	return (
		<DropdownOverlay
			trigger={
				<div className="flex flex-row items-center gap-3 text-white relative">
					<div className="flex flex-row items-center gap-2">
						<FaEarthAfrica />
						{width > 639 && <div>{language}</div>}
					</div>
					<IoMdArrowDropdown />
				</div>
			}
		>
			<div className="flex flex-col w-full">
				<DropdownItem
					onClick={() => {
						setLanguage('German');
					}}
					languageText="German"
				/>
				<DropdownItem
					onClick={() => {
						setLanguage('English');
					}}
					languageText="English"
				/>
				<DropdownItem
					onClick={() => {
						setLanguage('French');
					}}
					languageText="French"
				/>
				<DropdownItem
					onClick={() => {
						setLanguage('Italian');
					}}
					languageText="Italian"
				/>
			</div>
		</DropdownOverlay>
	);
};

export default LangugageSwitch;
