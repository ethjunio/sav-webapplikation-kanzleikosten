import React from 'react';
import { languageContentType } from '../../types/languageContentType';
import content from '../../assets/content.json';
import { useLanguage } from '../../context/LanguageContext';
import { useForm } from '../../context/FormState';
import { useCalculationResultContext } from '../../context/CalculationResultContext';
import RadarPlotCost from './RadarPlotCost';

const CostCard: React.FC = () => {
	const { language } = useLanguage();
	const { state } = useForm();
	const { calculationResults } = useCalculationResultContext();

	const pageContent = (content as languageContentType)[language as keyof typeof content].costPlot;
	const labelContent = (content as languageContentType)[language as keyof typeof content].checkboxLabels;

	// Extract output parameter identifiers from the form state
	const labelIdentifier = state.outputParameters;

	// Create the labels for the radar plot from the checkbox labels in the content
	const labels: string[] = labelIdentifier.map((value) => labelContent[value]);

	// Map calculation results into datasets for the radar plot
	const dataSet1 = labelIdentifier.map((identifier) => calculationResults[identifier]?.estimatedCost || 0);
	const ciLower = labelIdentifier.map((identifier) => calculationResults[identifier]?.CI_lower || 0);
	const ciUpper = labelIdentifier.map((identifier) => calculationResults[identifier]?.CI_upper || 0);

	return (
		<div className="flex flex-col w-1/2 flex-grow gap-2 items-center min-h-screen bg-slate-100 rounded-2xl p-8">
			<h2 className="font-bold text-gray-700">{pageContent.titel}</h2>
			{pageContent.description && <p className="text-center text-sm text-gray-500 mb-4">{pageContent.description}</p>}
			<div className="flex items-center content-stretch flex-grow w-full">
				{/* <RadarPlotCost dataSet1={dataSet1} ciLower={ciLower} ciUpper={ciUpper} legendLabel1="Estimated Costs" labels={labels} /> */}
			</div>
		</div>
	);
};

export default CostCard;
