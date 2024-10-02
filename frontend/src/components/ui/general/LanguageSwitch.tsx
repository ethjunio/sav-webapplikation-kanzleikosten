import { FaEarthAfrica } from 'react-icons/fa6';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useLanguage } from '../../../context/LanguageContext';
import DropdownOverlay from './DropdownOverlay';
import DropdownItem from './DropdownItem';

const LangugageSwitch = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownOverlay
      trigger={
        <div className="flex flex-row items-center gap-3 text-white relative">
          <div className="flex flex-row items-center gap-2">
            <FaEarthAfrica />
            <div>{language}</div>
          </div>
          <IoMdArrowDropdown />
        </div>
      }
    >
      <div className="flex flex-col w-full">
        <DropdownItem
          onClick={() => {
            setLanguage('German');
          }}
        >
          German
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            setLanguage('English');
          }}
        >
          English
        </DropdownItem>
        <DropdownItem>French</DropdownItem>
        <DropdownItem>Italian</DropdownItem>
      </div>
    </DropdownOverlay>
  );
};

export default LangugageSwitch;
