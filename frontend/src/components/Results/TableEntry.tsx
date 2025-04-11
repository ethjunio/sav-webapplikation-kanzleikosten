import { FaPeopleGroup, FaShieldHalved, FaHandshakeSimple, FaKey } from 'react-icons/fa6';
import { IoChatbubbles, IoHardwareChip } from 'react-icons/io5';
import { ReactNode } from 'react';

import { useDictionary } from '@/context/DictionaryContext';
import Dictionary from '@/types/Dictionary';

const iconMap: Record<string, ReactNode> = {
  personalkostenTitel: <FaPeopleGroup />,
  sicherheitTitel: <FaShieldHalved />,
  kommunikationTitel: <FaHandshakeSimple />,
  dienstleistungenTitel: <FaKey />,
  softwareTitel: <IoChatbubbles />,
  hardwareTitel: <IoHardwareChip />,
};

interface TableEntryProps {
  identifier: string;
  value?: string;
  variant?: string;
}

export default function TableEntry({ identifier, value, variant }: TableEntryProps) {
  const dict = useDictionary();

  let variantClass;
  switch (variant) {
    case 'header':
      variantClass = 'uppercase text-m text-gray-400 px-4 sm:px-0';
      break;
    case 'yearlyTotal':
      variantClass = 'text-xl font-semibold pt-2 px-4 sm:px-0 border-t border-black';
      break;
    case 'onceTotal':
      variantClass = 'text-xl font-semibold  pt-2 px-4 sm:px-0 border-t border-black';
      break;
    default:
      variantClass = 'ps-8 pe-4 text-lg sm:ps-0 sm:pe-0';
  }

  let icon;
  if (variant === 'header') {
    icon = iconMap[identifier];
  }

  return (
    <div className={`flex flex-row justify-between items-center w-full sm:gap-12 ${variantClass}`}>
      <div className={`flex flex-row items-center gap-2 sm:text-base  ${icon && 'sm:w-full sm:text-sm '}`}>
        {icon && icon} {dict.checkboxLabels[identifier as keyof Dictionary['checkboxLabels']]}
      </div>
      <div className="whitespace-nowrap sm:text-base ">{value}</div>
    </div>
  );
}
