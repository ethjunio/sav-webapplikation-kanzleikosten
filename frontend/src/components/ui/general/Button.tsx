import React from 'react';
import { useNavigate } from 'react-router-dom'; // Optional, for routing

interface ButtonProps {
	variant?: string;
	endIcon?: React.ReactNode;
	startIcon?: React.ReactNode;
	text?: string;
	route?: string;
	width?: string;
	onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', width = '100%', endIcon, startIcon, text, route, onClick }) => {
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
		primary: 'bg-primary text-white',
		secondary: 'bg-gray-500 text-white',
		danger: 'bg-red-500 text-white',
	};

	return (
		<button onClick={handleClick} className={`h-14 rounded-xl ${variantClasses[variant]} flex items-center justify-center`} style={{ width }}>
			{startIcon && <span>{startIcon}</span>}
			{text && <span className="uppercase">{text}</span>}
			{endIcon && <span className="ms-2">{endIcon}</span>}
		</button>
	);
};

export default Button;
