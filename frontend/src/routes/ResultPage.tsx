import React, { useState, useEffect } from 'react';
import { languageContentType } from '../types/languageContentType';
import content from '../assets/content.json';
import { useLanguage } from '../context/LanguageContext';
import KanzleiCard from '../components/Results/KanzleiCard';
import CostCard from '../components/Results/CostCard';
import { useForm } from '../context/FormState';
import Table from '../components/Results/TableAndSummary';
import SummeryCard from '../components/Results/SummaryCard';
import Button from '../components/ui/general/Button';
import { TbReport } from 'react-icons/tb';
import calculateOutput from '../utils/calculateOutput';
import { useCalculationResultContext } from '../context/CalculationResultContext';
import { IoAlertCircle } from 'react-icons/io5';
import { quantum } from 'ldrs';

quantum.register();

const ResultPage = () => {
	const { language } = useLanguage();
	const { state } = useForm();
	const { calculationResults, updateCalculationResult } = useCalculationResultContext();
	const pageContent = (content as languageContentType)[language as keyof typeof content].resultPage;
	const outputIdentifiers = (content as languageContentType)[language as keyof typeof content].checkboxLabels;

	// State to store calculated table values
	const [tableValues, setTableValues] = useState<string[]>([]);
	// State to manage loading status
	const [isLoading, setIsLoading] = useState<boolean>();

	const [warning, setWarning] = useState<string[]>([]);

	useEffect(() => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
		}, 3000);
	}, []);

	useEffect(() => {
		const fetchCalculations = async () => {
			try {
				// Initiate all calculations in parallel
				const calculations = state.outputParameters.map((identifier, index) => {
					const result = calculateOutput({
						outputIdentifier: identifier,
						input: state,
					});
					return { index, identifier, result };
				});

				// Wait for all calculations to complete
				const results = await Promise.all(calculations);

				// Prepare new table values and collect warnings
				const newTableValues: string[] = [];
				const newWarnings: string[] = []; // Collect warnings here

				results.forEach(({ index, identifier, result }) => {
					if (result.type === 'outOfRange') {
						newWarnings.push(identifier); // Collect warning
					} else {
						newTableValues[index] = result.estimatedCost.toString();
						updateCalculationResult(identifier, result);
					}
				});

				// Update state once after processing
				setWarning(newWarnings);
				setTableValues(newTableValues);
			} catch (err) {
				console.error('Error during calculations:', err);
			}
		};

		fetchCalculations();
	}, []); // Empty dependency array ensures this runs once on mount

	// Conditional rendering based on loading and error states
	if (isLoading) {
		window.scrollTo(0, 0);

		return (
			// Default values shown
			<div className="flex h-screen w-screen flex-col gap-4 items-center justify-center">
				<l-quantum size="45" speed="1.75" color="black"></l-quantum>
				<p>{pageContent.loadingMessage}</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-0 items-center">
			{/* Header Section */}
			<div className="flex flex-col items-start w-full text-center sm:w-full">
				{/* <h2 className="text-6xl mb-0 font-semibold">{pageContent.titel}</h2> */}
				{/* <p className="mt-2">{pageContent.description}</p> */}
				{warning.length > 0 && (
					<div className="flex flex-col p-8 justify-center text-left bg-red-100 rounded-lg w-full gap-3">
						<div className="flex flex-row gap-2 items-center text-red-600 border-b border-red-200 pb-3">
							<IoAlertCircle size={20} />
							<span className="text-lg font-semibold ">{pageContent.rangeMessageTitel}</span>
						</div>
						<span>
							{pageContent.rangeMessage}
							<ul className="list-inside list-disc">
								{warning.map((identifier) => (
									<li key={identifier}>{outputIdentifiers[identifier]}</li>
								))}
							</ul>
						</span>
					</div>
				)}
			</div>

			{/* Cards Section */}
			<div className="flex  flex-col gap-12">
				<KanzleiCard />
				<CostCard />
			</div>

			{/* Summary and Table Section */}
			<div className="flex min-h-screen items-center justify-center flex-col w-full gap-4 py-12">
				<Table identifiers={Object.keys(calculationResults)} values={tableValues.filter((subArray) => subArray.length > 0)} />
				<div className="flex flex-row gap-4 w-2/3 py-12 justify-center">
					<Button text={pageContent.button1} width="100%" variant="primary" />
					{/* <Button startIcon={<TbReport />} text={pageContent.button2} width="100%" /> */}
				</div>
			</div>

			{/* Buttons Section */}

			{/* Disclaimer Section */}
			<div className="flex flex-col items-center w-full text-center border-t-2 pt-8 my-12">
				<h1 className="text-xl font-semibold">{pageContent.disclaimerTitel}</h1>
				<p className="mt-2 w-2/3">{pageContent.disclaimer}</p>
			</div>
		</div>
	);
};

export default ResultPage;
