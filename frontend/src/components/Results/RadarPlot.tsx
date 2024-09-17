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

const RadarPlot: React.FC<RadarPlotProps> = ({ dataSet1,legendlabel1, dataSet2,legendlabel2, labels }) => {
	// Transformation function
	const transformData = (data: number[]) => {
		return data.map((value) => Math.log(value + 1));
	};

	// Transform the data
	const transformedDataSet1 = transformData(dataSet1);
	const transformedDataSet2 = transformData(dataSet2);

	// Radar chart data structure
	const data = {
		labels: labels,
		datasets: [
			{
				label: legendlabel1,
				data: transformedDataSet1,
				backgroundColor: 'rgba(40, 76, 147, 0.2)',
				borderColor: 'rgba(40, 76, 147, 1)',
				borderWidth: 2,
				pointBackgroundColor: 'rgba(40, 76, 147, 1)',
			},
			{
				label: legendlabel2,
				data: transformedDataSet2,
				backgroundColor: 'rgba(148, 115, 40, 0.1)',
				borderColor: 'rgba(148, 115, 40, 0)',
				borderWidth: 2,
				pointBackgroundColor: 'rgba(148, 115, 40, 0)',
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
					callback: function (value) {
						// Inverse of the transformation function
						const expValue = Math.exp(Number(value)) - 1;
						// Format the tick labels as needed
						return expValue.toFixed(0);
					},
				},
			},
		},
		plugins: {
			legend: {
				display: true,
				position: 'top',
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
		<div className="flex w-full h-full items-center justify-center">
			<div className="w-full h-full">
				<Radar data={data} options={options} />
			</div>
		</div>
	);
};

export default RadarPlot;
