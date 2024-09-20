import { languageContentType } from '../types/languageContentType';
import content from '../assets/content.json';
import { useLanguage } from '../context/LanguageContext';
import KanzleiCard from '../components/Results/KanzleiCard';
import CostCard from '../components/Results/CostCard';
import { useForm } from '../context/FormState';
import Table from '../components/Results/Table';
import SummeryCard from '../components/Results/SummaryCard';
import Button from '../components/ui/general/Button';
import { TbReport } from 'react-icons/tb';
import calculateOutput from '../utils/calculateOutput';

const ResultPage = () => {
	const { language } = useLanguage();
	const { state } = useForm();
	const pageContent = (content as languageContentType)[language as keyof typeof content].resultPage;

	calculateOutput({
		outputIdentifier: 'ITsupport',
		input: {
			employeesCount: '23',
			locationNumber: '23',
			locationType: 'regionalSwitzerland',
			operatingCostsPerYear: '23432',
			outputParameters: ['ITsupport'],
			partnersCount: '34',
			processLeadingPersonnel: '23',
			revenuePerYear: '2343',
			serviceType: 'bespokeStandard',
		},
	});

	return (
		<div className="flex flex-col gap-14 items-center">
			<div className="flex flex-col items-center w-1/2 text-center">
				<h1>{pageContent.titel}</h1>
				<p>{pageContent.description}</p>
			</div>
			<div className="flex flex-row gap-12">
				<KanzleiCard />
				<CostCard />
			</div>
			<div className="flex flex-col w-2/3 gap-4">
				<SummeryCard totalYearlyCost={'3433'} totalOnceCost={'23423'} />
				<Table identifiers={state.outputParameters} values={['34', '34', '2233', '43', '23', '34']} />
			</div>
			<div className="flex flex-row gap-4 w-2/3 text-pretty">
				<Button text={pageContent.button1} width="100%" variant="ghost" />
				<Button startIcon={<TbReport />} text={pageContent.button2} width="100%" />
			</div>
			<div className="flex flex-col items-center w-2/3 text-center border-t-2 pt-8">
				<h1>{pageContent.disclaimerTitel}</h1>
				<p>{pageContent.disclaimer}</p>
			</div>
		</div>
	);
};

export default ResultPage;
