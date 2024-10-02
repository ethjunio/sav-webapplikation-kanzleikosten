import { useState } from 'react';
import content from '../../assets/content.json'; // Update with the correct path to your content.json
import { useLanguage } from '../../context/LanguageContext';

interface TagProps {
  type?: 'einmalig' | 'jahrlich'; // Define the types of tags (either 'einmalig' or 'jahrlich')
}

export default function Tag({ type }: TagProps) {
  const [isHovered, setIsHovered] = useState(false); // To handle the hover state
  const { language } = useLanguage(); // Get the current language, e.g., 'en' or 'de'

  // Access content based on current language
  const ComponentContent = (content as any)[language as keyof typeof content].tags;

  // Conditional logic to determine the style, text, and content
  const isJahrlich = type === 'jahrlich';

  // Define the explanation and tag label based on the type and current language
  const explanation = isJahrlich ? ComponentContent.yearlyExplanation : ComponentContent.oneTimeExplanation;
  const label = isJahrlich ? ComponentContent.yearlyLabel : ComponentContent.oneTimeLabel;

  return type ? (
    <div
      className="relative inline-block cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tag UI */}
      <div
        className={`flex flex-row justify-center h-6 items-center px-2 rounded-full ${isJahrlich ? 'bg-orange-100' : 'bg-green-100'}`}
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
