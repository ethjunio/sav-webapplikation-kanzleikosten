import React from 'react';
import { languageContentType } from '../../types/languageContentType';
import content from '../../assets/content.json';
import { useLanguage } from '../../context/LanguageContext';
import { useForm } from '../../context/FormState';
import { useCalculationResultContext } from '../../context/CalculationResultContext';
import { EstimateWithConfidence, EstimateWithStatistics } from '../../utils/calculateOutput';
import BarPlotCost from './BarPlotDigiCost';

export interface PlotEntry {
	value: number;
	type: string;
}

const CostCard: React.FC = () => {
	const { language } = useLanguage();
	const { state } = useForm();
	const { calculationResults } = useCalculationResultContext();

	const pageContent = (content as languageContentType)[language as keyof typeof content].costPlot;
	const labelContent = (content as languageContentType)[language as keyof typeof content].checkboxLabels;

	console.log(calculationResults);

	// Extract output parameter identifiers from the form state
	const labelIdentifier = Object.keys(calculationResults);

	// Create the labels for the radar plot from the checkbox labels in the content
	const labels: string[] = labelIdentifier.map((value) => labelContent[value]);

	// Map calculation results into datasets for the radar plot
	const dataSet1 = labelIdentifier.map((identifier) => {
		if (calculationResults[identifier].type === 'confidence') {
			return { value: calculationResults[identifier]?.estimatedCost || 0, type: 'confidence' } as PlotEntry;
		} else if (calculationResults[identifier].type === 'statistics') {
			return { value: calculationResults[identifier]?.estimatedCost || 0, type: 'statistics' } as PlotEntry;
		} else {
			return { value: 0, type: 'error' };
		}
	});

	const ciLower = labelIdentifier.map((identifier) => {
		if (calculationResults[identifier].type === 'confidence') {
			return (calculationResults[identifier] as EstimateWithConfidence)?.CI_lower || 0;
		} else if (calculationResults[identifier].type === 'statistics') {
			return (calculationResults[identifier] as EstimateWithStatistics)?.estimatedCost || 0;
		} else {
			return 0;
		}
	});
	const ciUpper = labelIdentifier.map((identifier) => {
		if (calculationResults[identifier].type === 'confidence') {
			return (calculationResults[identifier] as EstimateWithConfidence)?.CI_upper || 0;
		} else if (calculationResults[identifier].type === 'statistics') {
			return (calculationResults[identifier] as EstimateWithStatistics)?.estimatedCost || 0;
		} else {
			return 0;
		}
	});

	console.log(dataSet1);
	console.log(ciLower);
	console.log(ciUpper);
	return (
		<div className="flex flex-col w-full flex-grow  items-start h-screen rounded-2xl px-0 py-12">
			<h2 className="font-bold text-start w-2/3 text-gray-700">{pageContent.titel}</h2>
			<p className="text-xl font-semibold mt-2 text-start text-gray-500 w-2/3 lg:w-full">{pageContent.description}</p>

			<div className="flex flex-row text-lg font-medium text-start items-start text-gray-500  w-2/3 lg:w-full">
				<div className="ms-9 mt-1.5 w-10 h-4 me-2 bg-[#ded8ca] rounded-sm"></div>
				<div className="w-2/3">{pageContent.descriptionStatistical}</div>
			</div>

			<div className="flex text-lg font-medium text-start items-start mb-12 text-gray-500  w-2/3 lg:w-full">
				<div className=" ms-9 mt-1.5 w-10 h-4 bg-[#8997B3] rounded-sm me-2"></div>
				<div className="w-2/3">{pageContent.descriptionRegression}</div>
			</div>

			<div className="flex items-end self-end content-stretch flex-grow w-full">
				<BarPlotCost dataSet1={dataSet1} labels={labels} labelIdentifier={labelIdentifier} />
			</div>
		</div>
	);
};

export default CostCard;
