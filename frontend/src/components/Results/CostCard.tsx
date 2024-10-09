import { languageContentType } from '@/types/languageContentType';
import content from '@/assets/content.json';
import { useLanguage } from '@/context/LanguageContext';
import { useCalculationResultContext } from '@/context/CalculationResultContext';
import RadarPlotCost from './RadarPlotCost';
import { EstimateWithConfidence, EstimateWithStatistics } from '@/utils/calculateOutput';

export interface PlotEntry {
  value: number;
  type: string;
}

export default function CostCard() {
  const { language } = useLanguage();
  const { calculationResults } = useCalculationResultContext();

  const pageContent = (content as languageContentType)[language as keyof typeof content].costPlot;
  const labelContent = (content as languageContentType)[language as keyof typeof content].checkboxLabels;

  // Extract output parameter identifiers from the form state
  const labelIdentifier = Object.keys(calculationResults);

  // Create the labels for the radar plot from the checkbox labels in the content
  const labels: string[] = labelIdentifier.map((value) => labelContent[value]);

  // Map calculation results into datasets for the radar plot
  const dataSet1 = labelIdentifier.map((identifier) => {
    if (calculationResults[identifier].type === 'confidence') {
      return {
        value: calculationResults[identifier]?.estimatedCost || 0,
        type: 'confidence',
      } as PlotEntry;
    } else if (calculationResults[identifier].type === 'statistics') {
      return {
        value: calculationResults[identifier]?.estimatedCost || 0,
        type: 'statistics',
      } as PlotEntry;
    } else {
      return { value: 0, type: 'error' };
    }
  });

  const ciLower = labelIdentifier.map((identifier) => {
    if (calculationResults[identifier].type === 'confidence') {
      return (calculationResults[identifier] as EstimateWithConfidence)?.CI_lower || 0;
    } else if (calculationResults[identifier].type === 'statistics') {
      return (calculationResults[identifier] as EstimateWithStatistics)?.estimatedCost || 0;
    } else {
      return 0;
    }
  });
  const ciUpper = labelIdentifier.map((identifier) => {
    if (calculationResults[identifier].type === 'confidence') {
      return (calculationResults[identifier] as EstimateWithConfidence)?.CI_upper || 0;
    } else if (calculationResults[identifier].type === 'statistics') {
      return (calculationResults[identifier] as EstimateWithStatistics)?.estimatedCost || 0;
    } else {
      return 0;
    }
  });

  return (
    <div className="flex flex-col w-full flex-grow gap-2 items-center h-screen bg-slate-100 rounded-2xl p-8">
      <h2 className="font-bold text-gray-700">{pageContent.titel}</h2>
      {pageContent.description && <p className="text-center text-sm text-gray-500 mb-4">{pageContent.description}</p>}
      <div className="flex items-center content-stretch flex-grow w-full">
        <RadarPlotCost
          dataSet1={dataSet1}
          ciLower={ciLower}
          ciUpper={ciUpper}
          legendLabel1="Estimated Costs"
          labels={labels}
        />
      </div>
    </div>
  );
}
