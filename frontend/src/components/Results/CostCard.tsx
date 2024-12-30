import { useCalculationResultContext } from '@/context/CalculationResultContext';
import BarPlotCost from './BarPlotDigiCost';
import {useState} from "react";
import classifyOutput from "@/utils/classifyOutput";
import useI18n from "@/translations/i18n";

export interface PlotEntry {
  value: number;
  type: string;
}

export default function CostCard() {
  const { calculationResults } = useCalculationResultContext();
  const [currentData, setCurrentData] = useState<string>('yearly');
  const translate = useI18n()

  // Extract output parameter identifiers from the form state
  const labelIdentifier = Object.keys(calculationResults);

  // Create the labels for the radar plot from the checkbox labels in the content
  const labels: string[] = labelIdentifier.map((value) => translate(`checkboxLabels.${value}`));

  // Map calculation results into datasets for the radar plot
  const dataSet = labelIdentifier.map((identifier) => {
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

  const yearlyDataAvailable = labelIdentifier.some((label) => classifyOutput(label)?.costType === 'jährlich');

  const oneTimeDataAvailable = labelIdentifier.some((label) => classifyOutput(label)?.costType === 'einmalig');

  return (
    <div className="flex flex-col w-full flex-grow  items-start h-screen min-h-[800px] lg:min-h-[1200px] rounded-2xl px-0 py-12">
      <h2 className="font-bold text-start w-2/3 text-gray-700">{translate('costPlot.titel')}</h2>
      <p className="text-xl sm:text-base font-semibold mt-2 text-start text-gray-500 w-2/3 lg:w-full">{translate('costPlot.description')}</p>

      <div id="costLegend" className="flex flex-col gap-3">
        <div className="flex flex-row text-lg md:text-sm font-medium text-start items-start text-gray-500  w-2/3 lg:w-full">
          <div className="ms-9 md:ms-0 mt-1.5 w-10 h-4 me-2 bg-[#ded8ca] rounded-sm"></div>
          <div className="leading-6 w-3/4 md:w-full">{translate('costPlot.descriptionStatistical')}</div>
        </div>

        <div className="flex text-lg font-medium md:text-sm text-start items-start mb-12 text-gray-500  w-2/3 lg:w-full">
          <div className=" ms-9 md:ms-0 mt-1.5 w-10 h-4 bg-[#8997B3] rounded-sm me-2"></div>
          <div className="leading-6 w-3/4 md:w-full">{translate('costPlot.descriptionRegression')}</div>
        </div>
      </div>

      <div id={'costPlot'} className="flex h-full w-full flex-col overflow-visible">
        <div className="flex h-full">
          <BarPlotCost dataSet={dataSet} labels={labels} labelIdentifier={labelIdentifier} currentData={currentData} setCurrentData={setCurrentData} />
        </div>
        {yearlyDataAvailable && (
            <div
                id="costPlotYearly"
                className="flex"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: -20000,
                  width: '2000px',
                  pointerEvents: 'none',
                  height: '900px',
                }}
            >
              <BarPlotCost dataSet={dataSet} labels={labels} labelIdentifier={labelIdentifier} currentData={'yearly'} setCurrentData={setCurrentData} />
            </div>
        )}
        {oneTimeDataAvailable && (
            <div
                id="costPlotOneTime"
                className="flex "
                style={{
                  position: 'absolute',
                  top: 0,
                  left: -10000,
                  width: '2000px',
                  pointerEvents: 'none',
                  height: '900px',
                }}
            >
              <BarPlotCost dataSet={dataSet} labels={labels} labelIdentifier={labelIdentifier} currentData={'oneTime'} setCurrentData={setCurrentData} />
            </div>
        )}
      </div>
    </div>
  );
}
