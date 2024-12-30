// src/components/RadarPlotKanzlei.tsx

import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import {useWindowWidth} from "@/context/WindowWidthContext";
import {roundTo} from "@/utils/roundTo";
import useI18n from "@/translations/i18n";

// Register necessary ChartJS components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// Define props types
interface RadarPlotProps {
  dataSet1: number[];
  dataSet2: number[];
  legendLabel1?: string;
  legendLabel2?: string;
  labels: string[];
  referenceFirmDataAbsolut: number[];
}

const unitArray = ['', '%', '', '', 'CHF', 'CHF'];

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

export default function RadarPlotKanzlei({ dataSet1, legendLabel1, dataSet2, legendLabel2, labels, referenceFirmDataAbsolut }: RadarPlotProps) {
  const { width } = useWindowWidth();
  const translate = useI18n()

  // Transformation function
  const transformData = (data: number[]) => {
    return data.map((value) => Math.log(value + 1));
  };

  // Transform the data
  const transformedDataSet1 = transformData(dataSet1);
  const transformedDataSet2 = transformData(dataSet2);

  // Process labels to wrap text
  const wrappedLabels = labels.map((label) => wrapLabel(label, width > 767 ? 30 : 12)); // Adjust maxChars as needed

  // Radar chart data structure DATASET 1 = UserFirm!
  const data = {
    labels: wrappedLabels, // Use wrapped labels
    datasets: [
      {
        label: legendLabel1 || 'Dataset 1',
        data: transformedDataSet1,
        backgroundColor: 'rgba(40, 76, 147, 0.3)',
        borderColor: 'rgba(40, 76, 147, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(40, 76, 147, 1)',
        pointStyle: 'circle',
        pointRadius: 4,
        pointHoverRadius: 10,
      },
      {
        label: legendLabel2 || 'Dataset 2',
        data: transformedDataSet2,
        backgroundColor: 'rgba(148, 115, 40, 0.1)',
        borderColor: 'rgba(148, 115, 40,0.5)',
        borderWidth: 1,
        pointBackgroundColor: 'rgba(148, 115, 40, 1)',
        pointStyle: 'circle',
        pointRadius: 4,
        pointHoverRadius: 10,
      },
    ],
  };

  // Define the radar chart options
  const options: ChartOptions<'radar'> = {
		responsive: true,
		maintainAspectRatio: false,
		devicePixelRatio: 2,
		scales: {
			r: {
				beginAtZero: true,
				ticks: {
					// Adjust the font size for tick labels
					font: {
						size: width > 767 ? 12 : 8, // Reduced font size
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
						size: width > 767 ? 12 : 8, // Adjust font size as needed
					},
					color: '#4B5563', // Tailwind Gray-700 for better visibility
				},
			},
		},
		plugins: {
			legend: {
				display: false,
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
            const absoluteValue = datasetIndex === 0 ? (referenceFirmDataAbsolut[index] * dataSet1[index]) / 100 : referenceFirmDataAbsolut[index];
            return [
              `${context.dataset.label}: ${originalValue}%`,
              `${translate('firmPlot.absoluteValue')}: ${roundTo(absoluteValue, 0)}${unitArray[index]}`
            ];
					},
				},
			},
			datalabels: {
				display: false,
			},
		},
	};

  return (
    <div className="w-full h-full flex ">
      <div className="w-full h-full">
        <Radar data={data} options={options} />
      </div>
    </div>
  );
}
