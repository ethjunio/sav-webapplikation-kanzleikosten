// RadarPlotCost.tsx

import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, ChartOptions } from 'chart.js';
import { PlotEntry } from './CostCard';
import { PiTriangleFill } from 'react-icons/pi';
import { FaCircle } from 'react-icons/fa6';
import { index } from 'mathjs';

// Register necessary ChartJS components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface RadarPlotProps {
	dataSet1: PlotEntry[];
	ciUpper?: number[]; // Optional confidence interval upper bound
	ciLower?: number[]; // Optional confidence interval lower bound
	legendLabel1: string;
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

const RadarPlotCost: React.FC<RadarPlotProps> = ({ dataSet1, ciUpper, ciLower, legendLabel1, labels }) => {
	// Process labels to wrap text
	const wrappedLabels = labels.map((label) => wrapLabel(label, 15)); // Adjust maxChars as needed

	// Extract values and types from dataSet1
	const values1 = dataSet1.map((item) => item.value);
	const types1 = dataSet1.map((item) => item.type);

	// Define point styles based on type
	const pointStyles = types1.map((type) => (type === 'confidence' ? 'triangle' : 'circle'));

	// Define point colors based on type
	const pointColors = types1.map((type) => (type === 'confidence' ? 'rgba(255, 99, 132, 1)' : 'rgba(54, 162, 235, 1)'));

	// Radar chart data structure
	const datasets = [
		{
			label: legendLabel1 || 'Dataset 1',
			data: values1,
			backgroundColor: 'rgba(40, 76, 147, 0.3)',
			borderColor: 'rgba(40, 76, 147, 1)',
			borderWidth: 2,
			pointBackgroundColor: pointColors,
			pointStyle: pointStyles,
			pointRadius: 7,
			pointHoverRadius: 14,
		},
	];

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
						size: 14,
					},
				},
			},
			tooltip: {
				callbacks: {
					label: function (context) {
						const value = context.raw;
						return `${context.dataset.label}: ${value} CHF`;
					},
				},
		
			},

		},
	};

	const DataPointLegend = () => {
		return (
			<div className="flex space-x-4 mb-2">
				{/* Confidence Legend */}
				<div className="flex items-center space-x-2">
					{/* Triangle Shape */}
					<PiTriangleFill color="rgba(255, 99, 132, 1)" />
					<span className="text-gray-600 text-sm">Confidence</span>
				</div>
				{/* Statistics Legend */}
				<div className="flex items-center space-x-2">
					{/* Circle Shape */}
					<FaCircle color="rgba(54, 162, 235, 1)" />
					<span className="text-gray-600 text-sm">Statistics</span>
				</div>
			</div>
		);
	};

	return (
		<div className="w-full h-full flex items-center flex-col justify-center">
			<DataPointLegend />
			<div className="w-full h-full flex items-center justify-center">
				<div className="w-full h-full">
					<Radar data={data} options={options} />
				</div>
			</div>
		</div>
	);
};

export default RadarPlotCost;
