// src/components/StackPlot.tsx

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define the props for the StackPlot component
interface StackPlotProps {
  legendLabel: string;
  data: number[];
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

const StackPlot: React.FC<StackPlotProps> = ({ legendLabel, data, labels }) => {
  const chartData: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: legendLabel,
        data,
        backgroundColor: 'rgba(40, 76, 147, 0.6)',
        borderColor: 'rgba(40, 76, 147, 1)',
        borderWidth: 1,
        borderRadius: 10,
        barPercentage: 0.7,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        position: 'top',
        display: false,
        labels: {
          usePointStyle: false,
          font: {
            size: 16,
          },
        },
      },
      tooltip: {
        // Optional: Customize tooltip appearance if needed
      },
    },
    scales: {
      y: {
        ticks: {
          // Use the wrapLabel function to split labels into multiple lines
          callback: function (value, index, ticks) {
            const label = this.getLabelForValue(value as any);
            return wrapLabel(label as string, 15); // Adjust maxChars as needed
          },
          font: {
            size: 14, // Adjust font size if necessary
          },
        },
      },
      x: {
        // Optional: Customize x-axis if needed
      },
    },
    // Optional: Add layout padding if labels are too close to the edges
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
      },
    },
  };

  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="w-full h-full">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default StackPlot;
