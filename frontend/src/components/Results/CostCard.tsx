import React, { useEffect, useState } from 'react';
import { languageContentType } from '../../types/languageContentType';
import content from '../../assets/content.json';
import { useLanguage } from '../../context/LanguageContext';
import { useForm } from '../../context/FormState';
import { useCalculationResultContext } from '../../context/CalculationResultContext';
import { EstimateWithConfidence, EstimateWithStatistics } from '../../utils/calculateOutput';
import BarPlotCost from './BarPlotDigiCost';
import classifyOutput from '../../utils/classifyOutput';

export interface PlotEntry {
	value: number;
	type: string;
}

const CostCard: React.FC = () => {
	const { language } = useLanguage();
	const { state } = useForm();
	const { calculationResults } = useCalculationResultContext();
	const [currentData, setCurrentData] = useState<string>('yearly');

	const pageContent = (content as languageContentType)[language as keyof typeof content].costPlot;
	const labelContent = (content as languageContentType)[language as keyof typeof content].checkboxLabels;

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

	// const ciLower = labelIdentifier.map((identifier) => {
	// 	if (calculationResults[identifier].type === 'confidence') {
	// 		return (calculationResults[identifier] as EstimateWithConfidence)?.CI_lower || 0;
	// 	} else if (calculationResults[identifier].type === 'statistics') {
	// 		return (calculationResults[identifier] as EstimateWithStatistics)?.estimatedCost || 0;
	// 	} else {
	// 		return 0;
	// 	}
	// });
	// const ciUpper = labelIdentifier.map((identifier) => {
	// 	if (calculationResults[identifier].type === 'confidence') {
	// 		return (calculationResults[identifier] as EstimateWithConfidence)?.CI_upper || 0;
	// 	} else if (calculationResults[identifier].type === 'statistics') {
	// 		return (calculationResults[identifier] as EstimateWithStatistics)?.estimatedCost || 0;
	// 	} else {
	// 		return 0;
	// 	}
	// });

	const yearlyDataAvailable = labelIdentifier.some((label) => classifyOutput(label)?.costType === 'jährlich');

	const oneTimeDataAvailable = labelIdentifier.some((label) => classifyOutput(label)?.costType === 'einmalig');

	console.log(yearlyDataAvailable, oneTimeDataAvailable);

	return (
		<div className="flex flex-col w-full flex-grow  items-start h-screen min-h-[800px] lg:min-h-[1200px] rounded-2xl px-0 py-12">
			<h2 className="font-bold text-start w-2/3 text-gray-700">{pageContent.titel}</h2>
			<p className="text-xl sm:text-base font-semibold mt-2 text-start text-gray-500 w-2/3 lg:w-full">{pageContent.description}</p>

			<div id="costLegend" className="flex flex-col gap-3">
				<div className="flex flex-row text-lg md:text-sm font-medium text-start items-start text-gray-500  w-2/3 lg:w-full">
					<div className="ms-9 md:ms-0 mt-1.5 w-10 h-4 me-2 bg-[#ded8ca] rounded-sm"></div>
					<div className="leading-6 w-3/4 md:w-full">{pageContent.descriptionStatistical}</div>
				</div>

				<div className="flex text-lg font-medium md:text-sm text-start items-start mb-12 text-gray-500  w-2/3 lg:w-full">
					<div className=" ms-9 md:ms-0 mt-1.5 w-10 h-4 bg-[#8997B3] rounded-sm me-2"></div>
					<div className="leading-6 w-3/4 md:w-full">{pageContent.descriptionRegression}</div>
				</div>
			</div>

			<div id={'costPlot'} className="flex h-full w-full flex-col overflow-visible">
				<div className="flex h-full">
					<BarPlotCost dataSet1={dataSet1} labels={labels} labelIdentifier={labelIdentifier} currentData={currentData} setCurrentData={setCurrentData} />
				</div>
				{yearlyDataAvailable && (
					<div
						id="costPlotYearly"
						className="flex"
						style={{
							position: 'absolute',
							top: 0,
							left: -20000,
							width: '2000px',
							pointerEvents: 'none',
							height: '900px',
						}}
					>
						<BarPlotCost dataSet1={dataSet1} labels={labels} labelIdentifier={labelIdentifier} currentData={'yearly'} setCurrentData={setCurrentData} />
					</div>
				)}
				{oneTimeDataAvailable && (
					<div
						id="costPlotOneTime"
						className="flex "
						style={{
							position: 'absolute',
							top: 0,
							left: -10000,
							width: '2000px',
							pointerEvents: 'none',
							height: '900px',
						}}
					>
						<BarPlotCost dataSet1={dataSet1} labels={labels} labelIdentifier={labelIdentifier} currentData={'oneTime'} setCurrentData={setCurrentData} />
					</div>
				)}
			</div>
		</div>
	);
};

export default CostCard;
