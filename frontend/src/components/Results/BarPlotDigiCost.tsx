import React, { SetStateAction } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import { PlotEntry } from './CostCard';
import classifyOutput from '@/utils/classifyOutput';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useWindowWidth } from '@/context/WindowWidthContext';

import { useDictionary } from '@/context/DictionaryContext';

// Register necessary ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels);

/**
 * Utility function to split a label into multiple lines based on max characters per line.
 * @param label - The original label string.
 * @param maxChars - Maximum number of characters per line.
 * @returns An array of strings, each representing a line.
 */
const wrapLabel = (label: string, maxChars: number): string[] => {
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

interface Props {
  dataSet: PlotEntry[];
  labels: string[];
  labelIdentifier: string[];
  currentData: string;
  setCurrentData: React.Dispatch<SetStateAction<string>>;
}

export default function StackedBarPlotCost({ dataSet, labels, labelIdentifier, currentData, setCurrentData }: Props) {
  const { width } = useWindowWidth();
  const dict = useDictionary();

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
  for (let i = 0; i < dataSet.length; i++) {
    const item = dataSet[i];
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
  const combinedData = dataSet.map((item, index) => ({
    label: labels[index],
    wrappedLabel: wrappedLabels[index],
    value: valuesArray[index],
    type: typesArray[index],
    backgroundColor: backgroundColorsArray[index],
    tag: tagArray[index],
  }));

  // Sort the combined data based on the value in descending order
  combinedData.sort((a, b) => b.value - a.value);

  // Separate data into yearly and one-time based on the tag
  const yearlyData = combinedData.filter((item) => item.tag === 'jährlich');
  const onetimeData = combinedData.filter((item) => item.tag === 'einmalig');

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

  const indexAxis = width > 767 ? 'x' : 'y';
  const valueAxis = indexAxis === 'x' ? 'y' : 'x';
  const categoryAxis = indexAxis === 'x' ? 'x' : 'y';

  // Define the bar chart options
  const options: ChartOptions<'bar'> = {
    responsive: true,
    devicePixelRatio: 2,
    indexAxis: indexAxis,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 40,
      },
    },
    scales: {
      [valueAxis]: {
        beginAtZero: true,
        ticks: {
          font: {
            size: width > 767 ? 16 : 8,
          },
          callback: function (value) {
            const valueNumber = Number(value);
            return new Intl.NumberFormat('de-CH').format(valueNumber);
          },
        },
      },
      [categoryAxis]: {
        ticks: {
          font: {
            size: width > 767 ? 16 : 8,
          },
          autoSkip: false, // erzwingt die Anzeige aller Labels
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
            return `${
              type === 'statistics' ? dict.stackedBarPlotCost.mean : dict.stackedBarPlotCost.model
            }: ${formattedValue} CHF`;
          },
        },
      },
      datalabels: {
        anchor: 'end',
        align: function (context) {
          const currentValue = Number(context.dataset.data[context.dataIndex] ?? 0);
          const firstValue = Number(context.dataset.data[0] ?? 0);
          const factor = width > 767 ? 0.1 : 0.25;

          if (
            currentValue === firstValue ||
            context.dataIndex === 0 ||
            firstValue - currentValue < factor * firstValue
          ) {
            return 'start';
          } else {
            return 'end';
          }
        },
        color: 'gray',
        formatter: function (value) {
          const formattedValue = new Intl.NumberFormat('de-CH').format(value);
          return `${formattedValue} CHF`;
        },
      },
    },
  };

  return (
    <div className="w-full flex items-start flex-col justify-center sm:gap-5">
      {/* Switch Buttons */}
      <div id="switchButtons" className="flex self-end md:self-start">
        <button
          className={`px-4 py-2 mr-2 ${
            currentData === 'yearly' ? 'bg-primaryFade text-white' : 'bg-gray-200'
          } rounded-lg`}
          onClick={() => setCurrentData('yearly')}
        >
          {dict.stackedBarPlotCost.yearlyCosts}
        </button>
        <button
          className={`px-4 py-2 ${
            currentData === 'onetime' || currentData === 'oneTimeImage' ? 'bg-primaryFade text-white' : 'bg-gray-200'
          } rounded-lg`}
          onClick={() => setCurrentData('onetime')}
        >
          {dict.stackedBarPlotCost.oneTimeCosts}
        </button>
      </div>
      <div className="w-full h-full flex items-center justify-center overflow-visible">
        <div className="w-full h-full">
          <Bar
            data={currentData === 'yearly' || currentData === 'yearlyImage' ? dataYear : dataOnetime}
            options={options}
          />
        </div>
      </div>
    </div>
  );
}
