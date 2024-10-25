// StackedBarPlotCost.tsx

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { PlotEntry } from './CostCard';

// Register necessary ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface StackedBarPlotProps {
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

const StackedBarPlotCost: React.FC<StackedBarPlotProps> = ({
  dataSet1,
  ciUpper,
  ciLower,
  legendLabel1,
  labels,
}) => {
  // Process labels to wrap text
  const wrappedLabels = labels.map((label) => wrapLabel(label, 15)); // Adjust maxChars as needed

  // Initialize data arrays for 'confidence' and 'statistics'
  const confidenceValues: number[] = [];
  const statisticsValues: number[] = [];

  // Map dataSet1 to confidence and statistics values
  for (let i = 0; i < dataSet1.length; i++) {
    const item = dataSet1[i];
    if (item.type === 'confidence') {
      confidenceValues.push(item.value);
      statisticsValues.push(0);
    } else if (item.type === 'statistics') {
      confidenceValues.push(0);
      statisticsValues.push(item.value);
    }
  }

  // Bar chart data structure
  const datasets = [
    {
      label: 'Confidence',
      data: confidenceValues,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Statistics',
      data: statisticsValues,
      backgroundColor: 'rgba(79, 204, 102, 0.5)',
    },
  ];

  const data = {
    labels: wrappedLabels, // Use wrapped labels
    datasets,
  };

  // Define the bar chart options
  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        ticks: {
          font: {
            size: 12, // Adjust font size as needed
          },
        },
      },
      y: {
        stacked: true,
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