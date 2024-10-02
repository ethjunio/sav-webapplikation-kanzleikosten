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

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  width = '100%',
  endIcon,
  startIcon,
  text,
  route,
  onClick,
}) => {
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
    secondary: 'bg-gray-500 text-white',
    ghost: 'bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white duration-200',
    danger: 'bg-red-500 text-white',
  };

  return (
    <button
      onClick={handleClick}
      className={`h-14 rounded-xl ${variantClasses[variant]} flex items-center px-8 justify-center`}
      style={{ width }}
    >
      {startIcon && <span className="me-2">{startIcon}</span>}
      {text && <span className="uppercase tracking-wider text-sm font-medium">{text}</span>}
      {endIcon && <span className="ms-2">{endIcon}</span>}
    </button>
  );
};

export default Button;
