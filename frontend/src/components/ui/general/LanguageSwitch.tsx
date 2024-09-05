import React from 'react';
import { FaEarthAfrica } from 'react-icons/fa6';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useLanguage } from '../../../context/LanguageContext';

const LangugageSwitch = () => {
	const { setLanguage } = useLanguage();

	return (
		<div className="flex flex-row items-center gap-3 text-white">
			<div className="flex flex-row items-center gap-2">
				<FaEarthAfrica />
				<div>Deutsch</div>
			</div>
			<IoMdArrowDropdown />
		</div>
	);
};

export default LangugageSwitch;
