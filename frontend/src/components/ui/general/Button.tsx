import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ButtonProps {
	variant?: string;
	endIcon?: React.ReactNode;
	startIcon?: React.ReactNode;
	text?: string;
	route?: string;
	width?: string;
	onClick?: () => void;
	disable?: boolean;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', width = '100%', endIcon, startIcon, text, route, onClick, disable }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		if (onClick) {
			onClick();
		} else if (route) {
			navigate(route);
		}
	};

	// Apply different classes based on the variant prop
	const variantClasses: { [key: string]: string } = {
		primary: 'bg-primary text-white hover:bg-primaryDark duration-200',
		secondary: 'bg-gray-500 text-white hover:bg-gray-600 duration-200',
		ghost: 'bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white duration-200',
		noBorder: 'bg-white border-0 px-0 justify-start hover:text-primary',
		danger: 'bg-red-500 text-white',
		report: 'bg-[#28942A] text-white hover:bg-primaryDark duration-200',
	};

	// Disabled style
	const disabledClass = 'opacity-70 cursor-not-allowed';

	return (
		<button
			disabled={disable}
			onClick={handleClick}
			className={`h-14 rounded-xl flex items-center px-8 justify-center ${variantClasses[variant]} ${disable ? disabledClass : ''}`}
			style={{ width }}
		>
			{startIcon && <span className="me-2">{startIcon}</span>}
			{text && <span className="uppercase tracking-wider text-sm font-medium">{text}</span>}
			{endIcon && <span className="ms-2">{endIcon}</span>}
		</button>
	);
};

export default Button;
