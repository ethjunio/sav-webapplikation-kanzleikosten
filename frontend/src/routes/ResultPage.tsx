import { languageContentType } from '../types/languageContentType';
import content from '../assets/content.json';
import { useLanguage } from '../context/LanguageContext';
import KanzleiCard from '../components/Results/KanzleiCard';
import { useForm } from '../context/FormState';
import Table from '../components/Results/Table';

const ResultPage = () => {
	const { language } = useLanguage();
	const { state } = useForm();

	const pageContent = (content as languageContentType)[language as keyof typeof content].resultPage;

	const dummyDataSet = [65, 59, 90, 81, 56, 55, 40]; // Example dataset
	const dummyLabels = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running']; // Example labels
	const dummyTitle = 'Sample Radar Chart'; // Example title
	const dummyDescription = 'This radar chart shows a sample distribution of activities over a typical day.'; // Example description

	return (
		<div className="flex flex-col gap-3 items-center">
			<div className="flex flex-row gap-12">
				<KanzleiCard />
				<KanzleiCard />
			</div>
			<div className="flex w-2/3">
				<Table
					identifiers={['ITsupport', 'ITMitarbeitende', 'SchulungenSoftware', 'SchulungMitarbeitende', 'InternetMobile', 'EinmaligerHardwareKauf']}
					values={['34', '34', '23', '43', '23', '34']}
				/>
			</div>
		</div>
	);
};

export default ResultPage;
