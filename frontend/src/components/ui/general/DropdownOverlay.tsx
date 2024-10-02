import React, { useState, useRef, useEffect } from 'react';
import cn from 'classnames';

interface DropdownOverlayProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const DropdownOverlay: React.FC<DropdownOverlayProps> = ({ trigger, children, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle closing the dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownClick = (event: React.MouseEvent) => {
    // Close the dropdown when any item inside the dropdown is clicked
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      {/* Trigger element */}
      <div style={{ cursor: 'pointer' }} onClick={handleToggleDropdown}>
        {trigger}
      </div>

      {/* Dropdown content */}
      {isOpen && (
        <div
          ref={dropdownRef}
          onClick={handleDropdownClick} // Close on click inside the dropdown content
          className={cn(
            'absolute top-full right-0 mt-1 p-1 min-w-full w-fit h-fit rounded-xl bg-white border border-gray-200 z-50 shadow',
            className,
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default DropdownOverlay;
