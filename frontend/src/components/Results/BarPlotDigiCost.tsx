// StackedBarPlotCost.tsx

import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import { PlotEntry } from './CostCard';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import classifyOutput from '../../utils/classifyOutput';
import { title } from 'process';
import { roundTo } from '../../utils/roundTo';
import { useLanguage } from '../../context/LanguageContext';
import content from '../../assets/content.json';
import { languageContentType } from '../../types/languageContentType';

// Register necessary ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels);

interface StackedBarPlotProps {
	dataSet1: PlotEntry[];
	labels: string[];
	labelIdentifier: string[];
}

/**
 * Utility function to split a label into multiple lines based on max characters per line.
 * @param label - The original label string.
 * @param maxChars - Maximum number of characters per line.
 * @returns An array of strings, each representing a line.
 */
const wrapLabel = (label: string, maxChars: number = 15): string[] => {
	const words = label.split(' ');
	const lines: string[] = [];
	let currentLine = '';

	words.forEach((word) => {
		// If adding the next word exceeds the maxChars, push the current line and start a new one
		if ((currentLine + word).length > maxChars) {
			if (currentLine.length > 0) {
				lines.push(currentLine.trim());
				currentLine = '';
			}
		}
		currentLine += `${word} `;
	});

	// Push any remaining text as the last line
	if (currentLine.length > 0) {
		lines.push(currentLine.trim());
	}

	return lines;
};

const StackedBarPlotCost: React.FC<StackedBarPlotProps> = ({ dataSet1, labels, labelIdentifier }) => {
	console.log(dataSet1, labels);

	const { language } = useLanguage();
	const pageContent = (content as languageContentType)[language as keyof typeof content].stackedBarPlotCost;

	// State to manage which dataset is currently displayed
	const [currentData, setCurrentData] = useState<'yearly' | 'onetime'>('yearly');

	// Process labels to wrap text
	const wrappedLabels = labels.map((label) => wrapLabel(label, 30)); // Adjust maxChars as needed

	const tagArray = labelIdentifier.map((item) => {
		const costInfo = classifyOutput(item);
		return costInfo?.costType;
	});

	// Initialize data arrays for values and background colors
	const valuesArray: number[] = [];
	const backgroundColorsArray: string[] = [];
	const typesArray: string[] = [];

	// Map dataSet1 to values and background colors
	for (let i = 0; i < dataSet1.length; i++) {
		const item = dataSet1[i];
		valuesArray.push(item.value);
		typesArray.push(item.type); // Keep track of the type for tooltips
		if (item.type === 'confidence') {
			backgroundColorsArray.push('#A4B4D4');
		} else if (item.type === 'statistics') {
			backgroundColorsArray.push('#ded8ca');
		} else {
			backgroundColorsArray.push('#8997B3'); // Default color
		}
	}

	// Combine all relevant data into an array of objects
	const combinedData = dataSet1.map((item, index) => ({
		label: labels[index],
		wrappedLabel: wrappedLabels[index],
		value: valuesArray[index],
		type: typesArray[index],
		backgroundColor: backgroundColorsArray[index],
		tag: tagArray[index],
	}));

	// Sort the combined data based on the value in descending order
	combinedData.sort((a, b) => b.value - a.value);

	console.log(combinedData);

	// Separate data into yearly and one-time based on the tag
	const yearlyData = combinedData.filter((item) => item.tag === 'jährlich');
	const onetimeData = combinedData.filter((item) => item.tag === 'einmalig');

	console.log(yearlyData, onetimeData);

	// Extract the sorted arrays for yearly data
	const yearlySortedWrappedLabels = yearlyData.map((item) => item.wrappedLabel);
	const yearlySortedValuesArray = yearlyData.map((item) => item.value);
	const yearlySortedBackgroundColorsArray = yearlyData.map((item) => item.backgroundColor);
	const yearlySortedTypesArray = yearlyData.map((item) => item.type);

	// Extract the sorted arrays for one-time data
	const onetimeSortedWrappedLabels = onetimeData.map((item) => item.wrappedLabel);
	const onetimeSortedValuesArray = onetimeData.map((item) => item.value);
	const onetimeSortedBackgroundColorsArray = onetimeData.map((item) => item.backgroundColor);
	const onetimeSortedTypesArray = onetimeData.map((item) => item.type);

	// Bar chart data structures
	const dataYear = {
		labels: yearlySortedWrappedLabels, // Use sorted and wrapped labels
		datasets: [
			{
				label: 'Values',
				data: yearlySortedValuesArray,
				backgroundColor: yearlySortedBackgroundColorsArray,
				borderRadius: 8,
			},
		],
	};

	const dataOnetime = {
		labels: onetimeSortedWrappedLabels, // Use sorted and wrapped labels
		datasets: [
			{
				label: 'Values',
				data: onetimeSortedValuesArray,
				backgroundColor: onetimeSortedBackgroundColorsArray,
				borderRadius: 8,
			},
		],
	};

	// Define the bar chart options
	const options: ChartOptions<'bar'> = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			x: {
				ticks: {
					font: {
						size: 12, // Adjust font size as needed
					},
				},
			},
			y: {
				beginAtZero: true,
				ticks: {
					font: {
						size: 12, // Adjust font size as needed
					},
					callback: function (value) {
						const valueNumber = Number(value);
						return new Intl.NumberFormat('de-CH').format(valueNumber);
					},
				},
			},
		},
		plugins: {
			legend: {
				display: false, // We have only one dataset, so no need for a legend
			},
			tooltip: {
				callbacks: {
					label: function (context) {
						const index = context.dataIndex;
						const type = currentData === 'yearly' ? yearlySortedTypesArray[index] : onetimeSortedTypesArray[index];
						const rawValue = context.raw as number;
						const formattedValue = new Intl.NumberFormat('de-CH').format(rawValue);
						return `${type === 'statistics' ? pageContent.mean : pageContent.model}: ${formattedValue} CHF`;
					},
				},
			},
			datalabels: {
				anchor: 'end',
				align: 'end',
				color: 'gray',
				formatter: function (value) {
					const formattedValue = new Intl.NumberFormat('de-CH').format(value);
					return `${formattedValue} CHF`;
				},
			},
		},
	};

	return (
		<div className="w-full h-full flex items-start flex-col justify-center gap-5">
			{/* Switch Buttons */}
			<div className="flex self-end">
				<button className={`px-4 py-2 mr-2 ${currentData === 'yearly' ? 'bg-primaryFade text-white' : 'bg-gray-200'} rounded-lg`} onClick={() => setCurrentData('yearly')}>
					{pageContent.yearlyCosts}
				</button>
				<button className={`px-4 py-2 ${currentData === 'onetime' ? 'bg-primaryFade text-white' : 'bg-gray-200'} rounded-lg`} onClick={() => setCurrentData('onetime')}>
					{pageContent.oneTimeCosts}
				</button>
			</div>
			{/* <div className="flex self-end flex-row gap-1 items-center">
				<div className="w-10 h-4 bg-yellow-700 rounded-sm"></div>Statistical <sup>1</sup>
				<div className="w-10 h-4 bg-green-700 rounded-sm ms-4"></div> Statistical <sup>2</sup>
			</div> */}
			<div className="w-full h-full flex items-center justify-center">
				<div className="w-full h-full">
					<Bar data={currentData === 'yearly' ? dataYear : dataOnetime} options={options} />
				</div>
			</div>
		</div>
	);
};

export default StackedBarPlotCost;
