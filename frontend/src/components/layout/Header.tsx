import React from 'react';
import LangugageSwitch from '../ui/general/LanguageSwitch';
import { Navigate, useNavigate } from 'react-router-dom';
import KanzleiCard from '../Results/KanzleiCard';

const Header = () => {
	const navigate = useNavigate();

	const handlLogoClick = (): void => {
		navigate('/');
	};

	return (
		<div className="sticky top-0 flex flex-row w-screen h-20 bg-primary items-center justify-between px-12 md:px-6 sm:px-4 shadow-md z-50">
			<img src="./images/logo-white.svg" alt="" style={{ height: '50%', cursor: 'pointer' }} onClick={handlLogoClick} />
			{/* <div className="text-white">Kanzleikosten Rechner</div> */}
			<LangugageSwitch />
		</div>
	);
};

export default Header;
