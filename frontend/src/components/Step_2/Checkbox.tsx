import Tag from './Tag';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import useI18n from '@/translations/i18n';

interface CheckboxProps {
  identifier: string;
  tag?: 'einmalig' | 'jahrlich';
  setSelectedList: Dispatch<SetStateAction<string[]>>;
  selectedList: string[];
  line?: boolean;
  tooManySelected: boolean;
  setTooManySelected: Dispatch<SetStateAction<boolean>>;
}

export default function Checkbox({ identifier, tag, selectedList, setSelectedList, line = true }: CheckboxProps) {
  const [isHovered, setIsHovered] = useState(false);
  const translate = useI18n();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedList((prev) => [...prev, identifier]);
    } else {
      setSelectedList((prev) => prev.filter((item) => item !== identifier));
    }
  };

  return (
    <div className={`flex flex-row items-center justify-between mx-4 ${line ? 'border-b-2 pb-2' : 'border-0'} gap-12`}>
      <div
        className="relative inline-block cursor-default"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-row items-center gap-2">
          <input
            id={identifier}
            className="text-primary focus:ring-primaryFadeMore border-gray-300 border-2 rounded-md w-5 h-5  bg-white "
            type="checkbox"
            onChange={handleChange}
            checked={selectedList.includes(identifier)}
          />
          <label htmlFor={identifier}>{translate(`checkboxLabels.${identifier}`)}</label>
          {isHovered && (
            <div className="absolute bottom-full left-6 flex flex-wrap text-wrap text-start mb-2 py-2 px-2 bg-gray-500 text-white min-w-80 max-w-96 text-xs rounded-lg shadow-lg opacity-0 animate-fade-in-slide-up">
              <div className="absolute w-2 h-2 bg-gray-500 -bottom-1 left-5 rotate-45"></div> {/* Arrow */}
              {translate(`checkboxLabelsDescriptions.${identifier}`)}
            </div>
          )}
        </div>
      </div>
      <Tag type={tag} />
    </div>
  );
}
