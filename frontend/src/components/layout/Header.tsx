import React from 'react';
import LangugageSwitch from '../ui/general/LanguageSwitch';

const Header = () => {

	return (
		<div className=" flex felx-row w-screen h-20 bg-primary items-center justify-between px-6">
			<img src="./images/logo-white.svg" alt="" style={{ height: '50%' }} />
			<LangugageSwitch />
		</div>
	);
};

export default Header;
