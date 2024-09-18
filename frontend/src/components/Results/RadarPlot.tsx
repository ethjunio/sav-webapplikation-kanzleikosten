// src/components/RadarPlot.tsx

import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, ChartOptions } from 'chart.js';

// Register necessary ChartJS components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// Define props types
interface RadarPlotProps {
	dataSet1: number[];
	dataSet2: number[];
	legendlabel1?: string;
	legendlabel2?: string;
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

const RadarPlot: React.FC<RadarPlotProps> = ({ dataSet1, legendlabel1, dataSet2, legendlabel2, labels }) => {
	// Transformation function
	const transformData = (data: number[]) => {
		return data.map((value) => Math.log(value + 1));
	};

	// Transform the data
	const transformedDataSet1 = transformData(dataSet1);
	const transformedDataSet2 = transformData(dataSet2);

	// Process labels to wrap text
	const wrappedLabels = labels.map((label) => wrapLabel(label, 15)); // Adjust maxChars as needed

	// Radar chart data structure
	const data = {
		labels: wrappedLabels, // Use wrapped labels
		datasets: [
			{
				label: legendlabel1 || 'Dataset 1',
				data: transformedDataSet1,
				backgroundColor: 'rgba(40, 76, 147, 0.3)',
				borderColor: 'rgba(40, 76, 147, 1)',
				borderWidth: 2,
				pointBackgroundColor: 'rgba(40, 76, 147, 1)',
			},
			{
				label: legendlabel2 || 'Dataset 2',
				data: transformedDataSet2,
				backgroundColor: 'rgba(148, 115, 40, 0.1)',
				borderColor: 'rgba(148, 115, 40,0.5)',
				borderWidth: 1,
				pointBackgroundColor: 'rgba(148, 115, 40, 1)',
			},
		],
	};

	// Define the radar chart options
	const options: ChartOptions<'radar'> = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			r: {
				beginAtZero: true,
				ticks: {
					// Adjust the font size for tick labels
					font: {
						size: 12, // Reduced font size
					},
					callback: function (value) {
						// Inverse of the transformation function
						const expValue = Math.exp(Number(value)) - 1;

						// Format the tick labels as needed
						return `${expValue.toFixed(0)} %`;
					},
				},
				// Adjust the font size and padding for point labels
				pointLabels: {
					font: {
						size: 12, // Adjust font size as needed
					},
					color: '#4B5563', // Tailwind Gray-700 for better visibility
				},
			},
		},
		plugins: {
			legend: {
				display: true,
				position: 'top',
				labels: {
					font: {
						size: 14, // Adjusted legend font size
					},
				},
			},
			tooltip: {
				callbacks: {
					label: function (context) {
						const index = context.dataIndex;
						const datasetIndex = context.datasetIndex;
						const originalValue = datasetIndex === 0 ? dataSet1[index] : dataSet2[index];
						return `${context.dataset.label}: ${originalValue}`;
					},
				},
			},
		},
	};

	return (
		<div className="w-full h-full flex items-center justify-center">
			<div className="w-full h-full">
				<Radar data={data} options={options} />
			</div>
		</div>
	);
};

export default RadarPlot;
