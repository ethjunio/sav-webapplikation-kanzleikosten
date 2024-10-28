import { useForm } from '../../context/FormState';
import { useLanguage } from '../../context/LanguageContext';
import content from '../../assets/content.json';
import { languageContentType } from '../../types/languageContentType';
import RadarPlot from './RadarPlotKanzlei';
import { referenceFirm } from '../../assets/referenceFirm';
import { roundTo } from '../../utils/roundTo';
const KanzleiCard = () => {
	const { language } = useLanguage();
	const { state } = useForm();

	const pageContent = (content as languageContentType)[language as keyof typeof content].firmPlot;

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
		pageContent.locationNumberLabel,
		pageContent.processLeadingPersonnelLabel,
		pageContent.partnersCountLabel,
		pageContent.employeesCountLabel,
		pageContent.revenuePerYearLabel,
		pageContent.operatingCostsPerYearLabel,
	];

	return (
		<div className="flex flex-row lg:flex-col w-full gap-10 items-center lg:items-start h-screen rounded-2xl px-0 py-12">
			<div className="flex flex-col w-2/6 lg:w-full">
				<h2 className=" font-bold text-start w-full text-gray-700">{pageContent.titel}</h2>
				<p className="text-xl font-semibold text-start text-gray-500 mb-4">{pageContent.description}</p>
				<p className=" text-lg font-medium text-start text-gray-500  ">
					<div className="ms-9 w-10 inline-block h-4 me-2 bg-[#BFC9DF] border-[#284C93] border rounded-sm"> </div>
					{pageContent.yourFirm}
				</p>

				<p className="text-lg font-medium text-start text-gray-500  ">
					<div className=" ms-9 w-10 inline-block h-4 bg-[#F4F1EA] border border-[#9E720B] rounded-sm me-2"> </div>
					{pageContent.referenceFirm}
				</p>
			</div>
			<div className="flex items-center w-4/6 lg:w-full content-stretch h-full">
				<RadarPlot dataSet1={plotData} dataSet2={[100, 100, 100, 100, 100, 100]} labels={labels} legendLabel1={pageContent.legend1} legendLabel2={pageContent.legend2} />
			</div>
		</div>
	);
};

export default KanzleiCard;
