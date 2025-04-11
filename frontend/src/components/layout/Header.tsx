import { usePortletProps } from '@/context/PortletPropsContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const { contextPath } = usePortletProps();

  const handlLogoClick = (): void => {
    navigate('/');
  };

  return (
    <div className="flex flex-row h-20 bg-primary items-center justify-between px-12 shadow-md">
      <img
        src={`${contextPath}/images/logo-white.svg`}
        alt="Brand logo"
        style={{ height: '50%', cursor: 'pointer' }}
        onClick={handlLogoClick}
      />
    </div>
  );
};

export default Header;
