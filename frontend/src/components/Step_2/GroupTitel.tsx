import React from 'react';
import { IconType } from 'react-icons';
import { FaRegCalendarCheck } from 'react-icons/fa6';
import { FaArrowsRotate } from 'react-icons/fa6';

interface GrouTitelProps {
	titel: string;
	icon: React.ReactNode;
}

const GrouTitel: React.FC<GrouTitelProps> = ({ titel, icon }) => {
	return (
		<div className={`flex flex-row w-full bg-gray-200 px-4 py-2 rounded-xl items-center justify-start gap-2 mb-1 text-lg text-primaryFade`}>
			<span className="text-xl">{icon}</span>
			{titel}
		</div>
	);
};

export default GrouTitel;
