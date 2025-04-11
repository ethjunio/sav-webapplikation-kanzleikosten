import { useState } from 'react';

import { useDictionary } from '@/context/DictionaryContext';

interface TagProps {
  type?: 'einmalig' | 'jahrlich'; // Define the types of tags (either 'einmalig' or 'jahrlich')
}

export default function Tag({ type }: TagProps) {
  const [isHovered, setIsHovered] = useState(false); // To handle the hover state
  const dict = useDictionary();

  // Conditional logic to determine the style, text, and content
  const isJahrlich = type === 'jahrlich';

  // Define the explanation and tag label based on the type and current language
  const explanation = isJahrlich ? dict.tags.yearlyExplanation : dict.tags.oneTimeExplanation;
  const label = isJahrlich ? dict.tags.yearlyLabel : dict.tags.oneTimeLabel;

  return type ? (
    <div
      className="relative inline-block cursor-default text-nowrap"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tag UI */}
      <div
        className={`flex flex-row justify-center h-6 items-center px-2 rounded-full ${
          isJahrlich ? 'bg-orange-100' : 'bg-green-100'
        }`}
      >
        {/* {isJahrlich ? <FaArrowsRotate className="text-xs text-orange-600" /> : <FaRegCalendarCheck className="text-xs text-green-600" />} */}
        <span className={` text-xs font-normal ${isJahrlich ? 'text-orange-600' : 'text-green-600'}`}>{label}</span>
      </div>

      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-full text-center mb-2 py-1 px-2 bg-gray-500 text-white w-32 text-xs rounded-lg shadow-lg opacity-0 animate-fade-in-slide-up">
          {explanation}
          <div className="absolute w-2 h-2 bg-gray-500 left-1/3 transform -translate-x-1/2 rotate-45"></div>{' '}
          {/* Arrow */}
        </div>
      )}
    </div>
  ) : null;
}
