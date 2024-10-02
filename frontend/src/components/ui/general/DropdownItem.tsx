import { ReactNode } from 'react';

interface DropdownItemProps {
  children: ReactNode; // The content of the dropdown item (text, icon, etc.)
  onClick?: () => void; // Optional onClick handler for the dropdown item
}

export default function DropdownItem({ children, onClick }: DropdownItemProps) {
  return (
    <div onClick={onClick} className="cursor-pointer py-2 px-4 rounded-xl hover:bg-gray-100">
      {children}
    </div>
  );
}
