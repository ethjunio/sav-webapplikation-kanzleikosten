import React, { useState, useEffect } from 'react';
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
import { useCalculationResultContext } from '../context/CalculationResultContext';
// import Spinner from '../components/ui/Spinner'; // Assume you have a Spinner component

const ResultPage = () => {
	const { language } = useLanguage();
	const { state } = useForm();
	const { calculationResults, updateCalculationResult } = useCalculationResultContext();
	const pageContent = (content as languageContentType)[language as keyof typeof content].resultPage;

	// State to store calculated table values
	const [tableValues, setTableValues] = useState<string[]>([]);
	// State to manage loading status
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchCalculations = async () => {
			try {
				setIsLoading(true); // Start loading

				// Initiate all calculations in parallel
				const calculations = state.outputParameters.map((identifier, index) => {
					const result = calculateOutput({
						outputIdentifier: identifier,
						input: state,
					});
					console.log(result);

					return { index, identifier, result };
				});

				// Wait for all calculations to complete
				const results = await Promise.all(calculations);

				console.log(results);

				// Prepare new table values and update calculation results
				const newTableValues: string[] = [];
				results.forEach(({ index, identifier, result }) => {
					newTableValues[index] = result.estimatedCost.toString();
					updateCalculationResult(identifier, result);
				});

				// Update state with the new table values
				setTableValues(newTableValues);
			} catch (err) {
				console.error('Error during calculations:', err);
			} finally {
				setIsLoading(false); // Loading finished
			}
		};

		console.log(calculationResults);

		fetchCalculations();
	}, []);

	// Conditional rendering based on loading and error states
	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<span className="ml-4">Calculating results...</span>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-14 items-center">
			{/* Header Section */}
			<div className="flex flex-col items-center w-1/2 text-center">
				<h1 className="text-2xl font-bold">{pageContent.titel}</h1>
				<p className="mt-2">{pageContent.description}</p>
			</div>

			{/* Cards Section */}
			<div className="flex flex-row gap-12">
				<KanzleiCard />
				<CostCard />
			</div>

			{/* Summary and Table Section */}
			<div className="flex flex-col w-2/3 gap-4">
				<SummeryCard
					totalYearlyCost={'3433'} // Ideally, compute these based on tableValues
					totalOnceCost={'23423'} // Ideally, compute these based on tableValues
				/>
				<Table identifiers={state.outputParameters} values={tableValues} />
			</div>

			{/* Buttons Section */}
			<div className="flex flex-row gap-4 w-2/3">
				<Button text={pageContent.button1} width="100%" variant="ghost" />
				<Button startIcon={<TbReport />} text={pageContent.button2} width="100%" />
			</div>

			{/* Disclaimer Section */}
			<div className="flex flex-col items-center w-2/3 text-center border-t-2 pt-8">
				<h1 className="text-xl font-semibold">{pageContent.disclaimerTitel}</h1>
				<p className="mt-2">{pageContent.disclaimer}</p>
			</div>
		</div>
	);
};

export default ResultPage;
