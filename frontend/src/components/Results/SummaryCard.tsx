import React, { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { languageContentType } from '../../types/languageContentType';
import content from '../../assets/content.json';

interface SummeryCardProps {
	totalYearlyCost: string;
	totalOnceCost: string;
}

const SummeryCard: React.FC<SummeryCardProps> = ({ totalYearlyCost, totalOnceCost }) => {
	const { language } = useLanguage();

	const ComponentContent = (content as any)[language as keyof typeof content].summeryCard;

	console.log(totalYearlyCost);

	const parseBold = (text: string) => {
		const parts = text.split(/(\*\*[^*]+\*\*)/g);
		return parts.map((part, index) => {
			if (part.startsWith('**') && part.endsWith('**')) {
				return <strong key={index}>{part.slice(2, -2)}</strong>;
			} else {
				return part;
			}
		});
	};

	return (
		<div className="flex text-primary flex-col items-center sm:items-start justify-center gap-5 rounded-xl mb-4">
			<div className="flex flex-row items-center justify-center gap-2 font-semibold text-6xl md:text-4xl">{ComponentContent?.titel}</div>
			<div id={'summaryText'} className="text-center sm:text-start leading-10 w-2/3 lg:w-full text-4xl md:text-xl">
				{parseBold(ComponentContent?.text?.replace('{totalYearlyCost}', totalYearlyCost.toString()).replace('{totalOnceCost}', totalOnceCost.toString()))}
			</div>
		</div>
	);
};

export default SummeryCard;
