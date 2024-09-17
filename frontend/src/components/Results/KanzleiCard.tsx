import { useForm } from '../../context/FormState';
import { useLanguage } from '../../context/LanguageContext';
import content from '../../assets/content.json';
import { languageContentType } from '../../types/languageContentType';
import RadarPlot from './RadarPlot';
import { referenceFirm } from '../../assets/parameter';
import { FaArrowRightArrowLeft } from 'react-icons/fa6';

const KanzleiCard = () => {
	const { language } = useLanguage();
	const { state } = useForm();

	const pageContent = (content as languageContentType)[language as keyof typeof content].firmPlot;

	const kanzleiDataSetString = [state.locationNumber, state.processLeadingPersonnel, state.partnersCount, state.employeesCount, state.revenuePerYear, state.operatingCostsPerYear];
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
		return (value / referenceFirmData[index]) * 100;
	});

	console.log(plotData);

	const labels = [
		pageContent.locationNumberLabel,
		pageContent.processLeadingPersonnelLabel,
		pageContent.partnersCountLabel,
		pageContent.employeesCountLabel,
		pageContent.revenuePerYearLabel,
		pageContent.operatingCostsPerYearLabel,
	];

	return (
		<div className="flex flex-col flex-grow gap-2 items-center min-h-screen bg-slate-100 rounded-2xl shadow-lg p-7">
			<h2 className="text-lg font-bold text-gray-700">{pageContent.titel}</h2>
			{pageContent.description && <p className="text-sm text-gray-500 mb-4">{pageContent.description}</p>}
			<div className="flex items-center content-stretch flex-grow w-full">
				<RadarPlot dataSet1={plotData} dataSet2={[100, 100, 100, 100, 100, 100]} labels={labels} legendlabel1={pageContent.legend1} legendlabel2={pageContent.legend2} />
			</div>
			<div className="grid grid-cols-2 w-full flex-grow ">
				{/* Location Type Section */}
				<div className="flex flex-col items-center">
					<h3 className="text-gray-700 font-semibold mb-2">Location Type</h3>
					<div className="flex items-center gap-2 text-gray-800">
						<span className="font-medium">{state.locationType}</span>
						<FaArrowRightArrowLeft />
						<span className="font-medium">{referenceFirm.locationType}</span>
					</div>
				</div>

				{/* Service Type Section */}
				<div className="flex flex-col items-center">
					<h3 className="text-gray-700 font-semibold mb-2">Service Type</h3>
					<div className="flex items-center gap-2 text-gray-800">
						<span className="font-medium">{state.serviceType}</span>
						<FaArrowRightArrowLeft />
						<span className="font-medium">{referenceFirm.serviceType}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default KanzleiCard;
