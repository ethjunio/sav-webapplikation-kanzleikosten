import { useForm } from '@/context/FormState';
import RadarPlot from './RadarPlotKanzlei';
import { referenceFirm } from '@/assets/referenceFirm';
import { roundTo } from '@/utils/roundTo';

import { useDictionary } from '@/context/DictionaryContext';

export default function KanzleiCard() {
  const { state } = useForm();
  const dict = useDictionary();

  const kanzleiDataSetString = [
    state?.locationNumber || '0',
    state?.processLeadingPersonnel || '0',
    state?.partnersCount || '0',
    state?.employeesCount || '0',
    state?.revenuePerYear || '0',
    state?.operatingCostsPerYear || '0',
  ];

  const kanzleiDataSet = kanzleiDataSetString.map((value) => parseInt(value, 10));
  const referenceFirmData = [
    referenceFirm.locationNumber,
    referenceFirm.processLeadingPersonnel,
    referenceFirm.partnersCount,
    referenceFirm.employeesCount,
    referenceFirm.revenuePerYear,
    referenceFirm.operatingCostsPerYear,
  ];

  const plotData = kanzleiDataSet.map((value, index) => {
    return roundTo((value / referenceFirmData[index]) * 100, 1);
  });

  const labels = [
    dict.firmPlot.locationNumberLabel,
    dict.firmPlot.processLeadingPersonnelLabel,
    dict.firmPlot.partnersCountLabel,
    dict.firmPlot.employeesCountLabel,
    dict.firmPlot.revenuePerYearLabel,
    dict.firmPlot.operatingCostsPerYearLabel,
  ];

  return (
    <div className="flex flex-row lg:flex-col w-full gap-10 items-center lg:items-start h-screen min-h-[800px] rounded-2xl px-0 py-12">
      <div className="flex flex-col w-2/6 lg:w-full">
        <h2 className=" font-bold text-start w-full text-gray-700">{dict.firmPlot.titel}</h2>
        <p className="text-xl sm:text-base font-semibold text-start text-gray-500 mb-4">{dict.firmPlot.description}</p>
        <div id="kanzleiLegend" className="ms-9 md:ms-0  flex flex-col items-start">
          <div className="flex flex-row items-center mb-2 text-lg md:text-sm font-medium text-start text-gray-500">
            <div className=" w-10 inline-block h-4 me-2 bg-[#BFC9DF] border-[#284C93] border rounded-sm"></div>
            <div>{dict.firmPlot.yourFirm}</div>
          </div>

          <div className="flex flex-row items-center text-lg md:text-sm font-medium text-start text-gray-500  ">
            <div className=" w-10 inline-block h-4 bg-[#F4F1EA] border border-[#9E720B] rounded-sm me-2"></div>
            {dict.firmPlot.referenceFirm}
          </div>
        </div>
      </div>
      <div id="kanzleiPlot" className="flex items-center w-4/6 lg:w-full content-stretch h-full">
        <RadarPlot
          referenceFirmDataAbsolut={referenceFirmData}
          dataSet1={plotData}
          dataSet2={[100, 100, 100, 100, 100, 100]}
          labels={labels}
          legendLabel1={dict.firmPlot.legend1}
          legendLabel2={dict.firmPlot.legend2}
        />
      </div>
    </div>
  );
}
