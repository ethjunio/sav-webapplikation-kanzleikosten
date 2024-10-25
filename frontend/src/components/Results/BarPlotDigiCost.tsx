// StackedBarPlotCost.tsx

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import { PlotEntry } from './CostCard';

// Register necessary ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface StackedBarPlotProps {
	dataSet1: PlotEntry[];
	labels: string[];
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

const StackedBarPlotCost: React.FC<StackedBarPlotProps> = ({ dataSet1, labels }) => {
	console.log(dataSet1, labels);
	// Process labels to wrap text
	const wrappedLabels = labels.map((label) => wrapLabel(label, 15)); // Adjust maxChars as needed

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
			backgroundColorsArray.push('rgba(255, 99, 132, 0.5)');
		} else if (item.type === 'statistics') {
			backgroundColorsArray.push('rgba(79, 204, 102, 0.5)');
		} else {
			backgroundColorsArray.push('rgba(0, 0, 0, 0.5)'); // Default color
		}
	}

	// Combine all relevant data into an array of objects
	const combinedData = dataSet1.map((item, index) => ({
		label: labels[index],
		wrappedLabel: wrappedLabels[index],
		value: valuesArray[index],
		type: typesArray[index],
		backgroundColor: backgroundColorsArray[index],
	}));

	// Sort the combined data based on the value in ascending order
	combinedData.sort((a, b) => b.value - a.value);

	// Extract the sorted arrays
	const sortedWrappedLabels = combinedData.map((item) => item.wrappedLabel);
	const sortedValuesArray = combinedData.map((item) => item.value);
	const sortedBackgroundColorsArray = combinedData.map((item) => item.backgroundColor);
	const sortedTypesArray = combinedData.map((item) => item.type);

	// Bar chart data structure
	const datasets = [
		{
			label: 'Values',
			data: sortedValuesArray,
			backgroundColor: sortedBackgroundColorsArray,
		},
	];

	const data = {
		labels: sortedWrappedLabels, // Use sorted and wrapped labels
		datasets,
	};

	console.log(data);

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
						const type = sortedTypesArray[index];
						const value = context.raw;
						return `${type.charAt(0).toUpperCase() + type.slice(1)}: ${value} CHF`;
					},
				},
			},
		},
	};

	return (
		<div className="w-full h-full flex items-center flex-col justify-center">
			<div className="w-full h-full flex items-center justify-center">
				<div className="w-full h-full">
					<Bar data={data} options={options} />
				</div>
			</div>
		</div>
	);
};

export default StackedBarPlotCost;
