import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleLogoClick = (): void => {
    navigate('/');
  };

  const handleLinkClick = (route: string): void => {
    navigate(route);
  };

  return (
    <div className="flex flex-col w-screen bg-primary items-center justify-center h-20">
      <div className="flex flex-col w-full max-w-screen-lg items-center ">
        <div className="flex flex-row gap-4">
          <span className="text-white cursor-pointer" onClick={() => handleLinkClick('/datenschutz')}>
            Datenschutz
          </span>
          <span className="text-white cursor-pointer" onClick={() => handleLinkClick('/policy')}>
            Policy
          </span>
        </div>
        <div className="text-white">&copy; {new Date().getFullYear()} SAV</div>
      </div>
    </div>
  );
};

export default Footer;
