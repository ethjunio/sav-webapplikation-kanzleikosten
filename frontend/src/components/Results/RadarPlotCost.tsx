import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, ChartOptions } from 'chart.js';

// Register necessary ChartJS components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// Define props types
interface RadarPlotProps {
	dataSet1: number[];
	dataSet2?: number[]; // Optional second dataset
	ciUpper?: number[]; // Optional confidence interval upper bound
	ciLower?: number[]; // Optional confidence interval lower bound
	legendLabel1: string;
	legendLabel2?: string;
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

const RadarPlot: React.FC<RadarPlotProps> = ({ dataSet1, dataSet2, ciUpper, ciLower, legendLabel1, legendLabel2, labels }) => {
	// Process labels to wrap text
	const wrappedLabels = labels.map((label) => wrapLabel(label, 15)); // Adjust maxChars as needed

	// Radar chart data structure
	const datasets = [
		{
			label: legendLabel1 || 'Dataset 1',
			data: dataSet1,
			backgroundColor: 'rgba(40, 76, 147, 0.3)',
			borderColor: 'rgba(40, 76, 147, 1)',
			borderWidth: 2,
			pointBackgroundColor: 'rgba(40, 76, 147, 1)',
		},
	];

	// If dataSet2 is provided, add it to datasets
	if (dataSet2) {
		datasets.push({
			label: legendLabel2 || 'Dataset 2',
			data: dataSet2,
			backgroundColor: 'rgba(148, 115, 40, 0.1)',
			borderColor: 'rgba(148, 115, 40, 0.5)',
			borderWidth: 1,
			pointBackgroundColor: 'rgba(148, 115, 40, 1)',
		});
	}

	// If confidence intervals are provided, add them to the datasets
	if (ciLower) {
		datasets.push({
			label: 'CI Lower Bound',
			data: ciLower,
			backgroundColor: 'rgba(76, 187, 23, 0.05)',
			borderColor: 'rgba(76, 187, 23, 0.5)',
			borderWidth: 1,
			pointBackgroundColor: 'rgba(76, 187, 23, 1)',
			borderDash: [5, 5],
			fill: '-1', // Fill between this dataset and the previous one
		} as any);
	}

	if (ciUpper) {
		datasets.push({
			label: 'CI Upper Bound',
			data: ciUpper,
			backgroundColor: 'rgba(255, 99, 132, 0.05)',
			borderColor: 'rgba(255, 99, 132, 0.5)',
			borderWidth: 1,
			pointBackgroundColor: 'rgba(255, 99, 132, 1)',
			borderDash: [5, 5],
			fill: '+1', // Fill between this dataset and the next one
		} as any);
	}

	const data = {
		labels: wrappedLabels, // Use wrapped labels
		datasets,
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
						let originalValue;
						if (datasetIndex === 0) {
							originalValue = dataSet1[index];
						} else if (datasetIndex === 1 && dataSet2) {
							originalValue = dataSet2[index];
						} else if (datasetIndex === 2 && ciLower) {
							originalValue = ciLower[index];
						} else if (datasetIndex === 3 && ciUpper) {
							originalValue = ciUpper[index];
						} else {
							originalValue = context.raw;
						}
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
