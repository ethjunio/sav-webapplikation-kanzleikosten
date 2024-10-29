import React, { useState, useRef, createRef } from 'react';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, ChartConfiguration, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import 'chartjs-chart-error-bars';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { IErrorBarYDataPoint, BarWithErrorBar } from 'chartjs-chart-error-bars';
import { PlotEntry } from './CostCard';
import classifyOutput from '../../utils/classifyOutput';
import { useLanguage } from '../../context/LanguageContext';
import content from '../../assets/content.json';
import { languageContentType } from '../../types/languageContentType';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels, BarWithErrorBar);

interface StackedBarPlotProps {
	dataSet1: PlotEntry[];
	labels: string[];
	labelIdentifier: string[];
	CI_upper: number[];
	CI_lower: number[];
}

const wrapLabel = (label: string, maxChars: number = 15): string[] => {
	const words = label.split(' ');
	const lines: string[] = [];
	let currentLine = '';

	words.forEach((word) => {
		if ((currentLine + word).length > maxChars) {
			if (currentLine.length > 0) {
				lines.push(currentLine.trim());
				currentLine = '';
			}
		}
		currentLine += `${word} `;
	});

	if (currentLine.length > 0) {
		lines.push(currentLine.trim());
	}

	return lines;
};

const StackedBarPlotCost: React.FC<StackedBarPlotProps> = ({ dataSet1, labels, labelIdentifier, CI_upper, CI_lower }) => {
	const { language } = useLanguage();
	const pageContent = (content as languageContentType)[language as keyof typeof content].stackedBarPlotCost;
	  const canvasRef = createRef<HTMLCanvasElement>();


	const [currentData, setCurrentData] = useState<'yearly' | 'onetime'>('yearly');

	const wrappedLabels = labels.map((label) => wrapLabel(label, 30));

	const tagArray = labelIdentifier.map((item) => {
		const costInfo = classifyOutput(item);
		return costInfo?.costType;
	});

	const dataPoints: IErrorBarYDataPoint[] = dataSet1.map((item, index) => ({
		y: item.value,
		yMin: CI_lower[index],
		yMax: CI_upper[index],
	}));

	const combinedData = dataSet1.map((item, index) => ({
		label: labels[index],
		wrappedLabel: wrappedLabels[index],
		value: dataPoints[index],
		type: item.type,
		backgroundColor: item.type === 'confidence' ? '#A4B4D4' : item.type === 'statistics' ? '#ded8ca' : '#8997B3',
		tag: tagArray[index],
	}));

	combinedData.sort((a, b) => b.value.y - a.value.y);

	const yearlyData = combinedData.filter((item) => item.tag === 'jährlich');
	const onetimeData = combinedData.filter((item) => item.tag === 'einmalig');

	const options: ChartConfiguration<'barWithErrorBars'>['options'] = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			x: { ticks: { font: { size: 12 } } },
			y: {
				beginAtZero: true,
				ticks: {
					font: { size: 12 },
					callback: (value) => new Intl.NumberFormat('de-CH').format(Number(value)),
				},
			},
		},
		plugins: {
			legend: { display: false },
			// tooltip: {
			// 	callbacks: {
			// 		label: (context) => {
			// 			const index = context.dataIndex;
			// 			const type = currentData === 'yearly' ? yearlyData[index].type : onetimeData[index].type;
			// 			const rawValue = context.raw as IErrorBarYDataPoint;
			// 			const formattedValue = new Intl.NumberFormat('de-CH').format(rawValue.y);
			// 			const ciLower = new Intl.NumberFormat('de-CH').format(rawValue.yMin);
			// 			const ciUpper = new Intl.NumberFormat('de-CH').format(rawValue.yMax);
			// 			return `${type === 'statistics' ? pageContent.mean : pageContent.model}: ${formattedValue} CHF (CI: ${ciLower} - ${ciUpper} CHF)`;
			// 		},
			// 	},
			// },
			datalabels: {
				anchor: 'end',
				align: 'end',
				color: 'gray',
				formatter: (value: IErrorBarYDataPoint) => `${new Intl.NumberFormat('de-CH').format(value.y)} CHF`,
			},
		},
	};
	const canvas = canvasRef.current;

	if (canvas) {
		const ctx = canvas.getContext('2d');
		if (ctx) {
			const chartConfig: ChartConfiguration<'barWithErrorBars'> = {
				type: 'barWithErrorBars',
				data: {
					labels: yearlyData.map((item) => item.wrappedLabel),
					datasets: [
						{
							data: yearlyData.map((item) => item.value),
							backgroundColor: yearlyData.map((item) => item.backgroundColor),
							borderRadius: 8,
						},
					],
				},
				options: options,
			};
			new Chart(ctx, chartConfig);
		}
	}

	const dataOnetimeConfig: ChartConfiguration<'barWithErrorBars'> = {
		type: 'barWithErrorBars',
		data: {
			labels: onetimeData.map((item) => item.wrappedLabel),
			datasets: [
				{
					data: onetimeData.map((item) => item.value),
					backgroundColor: onetimeData.map((item) => item.backgroundColor),
					borderRadius: 8,
				},
			],
		},
		options: options,
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
			<div className="w-full h-full flex items-center justify-center">
				<div className="w-full h-full">
					{/* <Chart {...(currentData === 'yearly' ? dataYearConfig : dataOnetimeConfig)} /> */}
					<canvas ref={canvasRef} />
				</div>
			</div>
		</div>
	);
};

export default StackedBarPlotCost;
