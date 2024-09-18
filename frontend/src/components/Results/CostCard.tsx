// src/App.tsx

import React from 'react';
import StackPlot from './StackPlot';
import { languageContentType } from '../../types/languageContentType';
import content from '../../assets/content.json';
import { useLanguage } from '../../context/LanguageContext';
import { useForm } from '../../context/FormState';

const CostCard: React.FC = () => {
	const { language } = useLanguage();
	const { state } = useForm();

	const pageContent = (content as languageContentType)[language as keyof typeof content].costPlot;
	const labelContent = (content as languageContentType)[language as keyof typeof content].checkboxLabels;

	const labelIdentifier = state.outputParameters;

	const labels: string[] = labelIdentifier.map((value) => {
		const label = labelContent[value];
		return label;
	});

	// Define data for the dataset
	const data = [65, 59, 80, 81, 56, 55];

	// Define the legend label
	const legendLabel = 'Sales 2023';

	return (
		<div className="flex flex-col w-1/2 flex-grow gap-2 items-center min-h-screen bg-slate-100 rounded-2xl  p-8">
			<h2 className=" font-bold text-gray-700">{pageContent.titel}</h2>
			{pageContent.description && <p className="text-center text-sm text-gray-500 mb-4">{pageContent.description}</p>}
			<div className="flex items-center content-stretch flex-grow w-full">
				<StackPlot legendLabel={legendLabel} data={data} labels={labels} />
			</div>
		</div>
	);
};

export default CostCard;
