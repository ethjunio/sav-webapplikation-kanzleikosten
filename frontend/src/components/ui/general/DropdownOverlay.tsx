import { useState, useRef, ReactNode } from 'react';
import cn from 'classnames';

interface DropdownOverlayProps {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function DropdownOverlay({ trigger, children, className }: DropdownOverlayProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /**
   * NOTE: This ClickOutside Handler does not function within a ShadowDOM and must be rewritten
   * if the functionality is required.
   * > It does not work because the event.target is always the ShadowDOM root
   * > and thus cannot be inside the Ref element. The ShadowDOM is necessary to
   * > maintain a strict css separation between this portlet and liferay
   */
  // Handle closing the dropdown when clicking outside
  // useEffect(() => {
  //   function handleClickOutside(event: MouseEvent) {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
  //       setIsOpen(false);
  //     }
  //   }
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [dropdownRef]);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownClick = () => {
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
}
