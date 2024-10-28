import { IoMdCheckmark } from 'react-icons/io';
import Tag from './Tag';
import { useLanguage } from '../../context/LanguageContext';
import content from '../../assets/content.json';
import { languageContentType } from '../../types/languageContentType';
import { useState } from 'react';

interface CheckboxProps {
	identifier: string;
	tag?: 'einmalig' | 'jahrlich';
	setSelectedList: React.Dispatch<React.SetStateAction<string[]>>;
	selectedList: string[];
	line?: boolean;
	tooManySelected: boolean;
	setTooManySelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const Checkbox: React.FC<CheckboxProps> = ({ identifier, tag, selectedList, setSelectedList, line = true, tooManySelected, setTooManySelected }) => {
	const { language } = useLanguage();
	const [isHovered, setIsHovered] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const isChecked = e.target.checked;
		if (isChecked) {
			// if (selectedList.length >= 8) {
			// 	setTooManySelected(true);
			// 	return;
			// } else
			setSelectedList((prev) => [...prev, identifier]);
		} else {
			setSelectedList((prev) => prev.filter((item) => item !== identifier));
		}
	};

	const checkboxLabel = (content as languageContentType)[language as keyof typeof content].checkboxLabels[identifier];
	const checkboxLabelDescriptions = (content as languageContentType)[language as keyof typeof content].checkboxLabelsDescriptions[identifier];

	return (
		<div className={`flex flex-row items-center justify-between mx-4 ${line ? 'border-b-2 pb-2' : 'border-0'} gap-12`}>
			<div className="relative inline-block cursor-default" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
				<div className="flex flex-row items-center gap-2">
					<input
						id={identifier}
						className="text-primary focus:ring-primaryFadeMore border-gray-300 border-2 rounded-md w-5 h-5  bg-white "
						type="checkbox"
						onChange={handleChange}
						checked={selectedList.includes(identifier)}
					/>
					<label htmlFor={identifier}>{checkboxLabel}</label>
					{isHovered && (
						<div className="absolute bottom-full left-6 flex flex-wrap text-wrap text-start mb-2 py-2 px-2 bg-gray-500 text-white min-w-80 max-w-96 text-xs rounded-lg shadow-lg opacity-0 animate-fade-in-slide-up">
							<div className="absolute w-2 h-2 bg-gray-500 -bottom-1 left-5 rotate-45"></div> {/* Arrow */}
							{checkboxLabelDescriptions}
						</div>
					)}
				</div>
			</div>
			<Tag type={tag} />
		</div>
	);
};

export default Checkbox;
