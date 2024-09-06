import React from 'react';

interface DropdownItemProps {
	children: React.ReactNode; // The content of the dropdown item (text, icon, etc.)
	onClick?: () => void; // Optional onClick handler for the dropdown item
}

const DropdownItem: React.FC<DropdownItemProps> = ({ children, onClick }) => {
	return (
		<div onClick={onClick} className="cursor-pointer py-2 px-4 rounded-xl hover:bg-gray-100">
			{children}
		</div>
	);
};

export default DropdownItem;
