// Import React and necessary hooks
import React, { useState, useEffect } from 'react';

// Import types and external assets
import { languageContentType } from '../types/languageContentType';
import content from '../assets/content.json';

// Import context hooks
import { useLanguage } from '../context/LanguageContext';
import { useForm } from '../context/FormState';
import { useCalculationResultContext } from '../context/CalculationResultContext';

// Import UI components
import KanzleiCard from '../components/Results/KanzleiCard';
import CostCard from '../components/Results/CostCard';
import Table from '../components/Results/TableAndSummary';
import Button from '../components/ui/general/Button';

// Import icons and utilities
import { TbReport } from 'react-icons/tb';
import { IoAlertCircle } from 'react-icons/io5';
import calculateOutput from '../utils/calculateOutput';
import GenerateReport from '../utils/generateResultReport';
import { pdf } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';
import { quantum } from 'ldrs';
import { useWindowWidth } from '../context/WindowWidthContext';
import { FaArrowLeft } from 'react-icons/fa';
import { FaArrowRotateLeft } from 'react-icons/fa6';
// Initialize Quantum library
quantum.register();

// ResultPage Component
const ResultPage = () => {
	// --------------------------------------------------------------------------
	// Context and State Hooks
	// --------------------------------------------------------------------------

	// Get the current language from LanguageContext
	const { language } = useLanguage();
	const { width } = useWindowWidth();

	// Get the form state from FormState context
	const { state } = useForm();

	// Get calculation results and updater from CalculationResultContext
	const { calculationResults, updateCalculationResult } = useCalculationResultContext();

	// --------------------------------------------------------------------------
	// Local State Variables
	// --------------------------------------------------------------------------

	// Fetch page content based on the current language
	const pageContent = (content as languageContentType)[language as keyof typeof content].resultPage;

	// Extract necessary content pieces
	const outputIdentifiers = (content as languageContentType)[language as keyof typeof content].checkboxLabels;
	const inputLabels = (content as languageContentType)[language as keyof typeof content].firmPlot;
	const dropdownOptions = (content as languageContentType)[language as keyof typeof content].dropdownOptions;

	// State variables for table values, loading states, warnings, etc.
	const [tableValues, setTableValues] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [loadingReport, setLoadingReport] = useState<boolean>(false);
	const [warning, setWarning] = useState<string[]>([]);

	// --------------------------------------------------------------------------
	// useEffect Hooks
	// --------------------------------------------------------------------------

	// Set loading state on component mount
	useEffect(() => {
		setIsLoading(true);
		// Simulate a short loading delay
		setTimeout(() => setIsLoading(false), 2000);
	}, []);

	// Fetch calculations and populate table values on component mount
	useEffect(() => {
		const fetchCalculations = async () => {
			try {
				// Map over output parameters to perform calculations
				const calculations = state.outputParameters.map((identifier, index) => {
					// Perform calculation for each output parameter
					const result = calculateOutput({
						outputIdentifier: identifier,
						input: state,
					});
					return { index, identifier, result };
				});

				// Wait for all calculations to complete
				const results = await Promise.all(calculations);

				const newTableValues: string[] = [];
				const newWarnings: string[] = [];

				// Process results and update states
				results.forEach(({ index, identifier, result }) => {
					// Update table values and calculation results
					newTableValues[index] = result.estimatedCost.toString();
					updateCalculationResult(identifier, result);
				});

				setWarning(newWarnings);
				setTableValues(newTableValues);
			} catch (err) {
				console.error('Error during calculations:', err);
			}
		};

		fetchCalculations();
	}, []); // Empty dependency array ensures this runs once on mount

	// --------------------------------------------------------------------------
	// Helper Functions
	// --------------------------------------------------------------------------

	/**
	 * Captures an image of a DOM element using html2canvas.
	 * @param elementId - The ID of the DOM element to capture.
	 * @returns A promise that resolves to the image data URL.
	 */
	const captureImage = async (elementId: string): Promise<string | string[]> => {
		const div = document.getElementById(elementId);

		if (!div) {
			console.warn(`Element with id "${elementId}" not found in the DOM.`);
			return '';
		}

		if (elementId === 'costPlot') {
			// Capture both yearly and one-time cost plots
			const yearlyDiv = document.getElementById('costPlotYearly');
			const onetimeDiv = document.getElementById('costPlotOneTime');

			if (yearlyDiv || onetimeDiv) {
				const options = {
					scale: 2,
					ignoreElements: (el: Element) => el.id === 'switchButtons',
				};

				let canvasYearlyString;
				let canvasOneTimeString;

				if (yearlyDiv) {
					const canvasYearly = await html2canvas(yearlyDiv, options);
					canvasYearlyString = canvasYearly.toDataURL();
				} else {
					canvasYearlyString = '';
				}

				if (onetimeDiv) {
					const canvasOnetime = await html2canvas(onetimeDiv, options);
					canvasOneTimeString = canvasOnetime.toDataURL();
				} else {
					canvasOneTimeString = '';
				}

				return [canvasOneTimeString, canvasYearlyString];
			}
		} else {
			// Capture a single element
			const canvas = await html2canvas(div, { scale: 2, imageTimeout: 1500 });
			return canvas.toDataURL();
		}
		return '';
	};

	/**
	 * Gathers all necessary data for generating the report.
	 * @returns A promise that resolves to the complete report data.
	 */
	const updateReportData = async () => {
		try {
			// Capture images of plots and tables
			const images = await Promise.all([captureImage('kanzleiPlot'), captureImage('costPlot'), captureImage('tableYearly'), captureImage('tableOnce')]);

			// Destructure captured images
			const [kanzleiPlotImage, costPlotImages, yearlyTableImage, onceTableImage] = images;

			const [costPlotOnceImage, costPlotYearlyImage] = Array.isArray(costPlotImages) ? costPlotImages : ['', ''];

			// Prepare the report data object
			const newReportData = {
				inputData: {
					name: Object.keys(state).map((key) => inputLabels[`${key}Label`]),
					value: Object.values(state).map((value, index) => {
						// Map dropdown options or convert values to strings
						if (index === 0 || index === 3) {
							return dropdownOptions[value.toString()];
						} else {
							return value.toString();
						}
					}),
					unit: ['', '', '%', '', '', '', 'CHF', 'CHF', ''],
				},
				plotImages: {
					kanzleiPlot: kanzleiPlotImage as string,
					costPlotYearly: costPlotYearlyImage as string,
					costPlotOnce: costPlotOnceImage as string,
				},
				tableImages: {
					yearly: yearlyTableImage as string,
					once: onceTableImage as string,
				},
				summary: {
					text: String(document.getElementById('summaryText')?.textContent),
				},
			};
			return newReportData;
		} catch (error) {
			console.error('Error capturing images:', error);
			return null;
		}
	};

	/**
	 * Handles the click event for generating the report.
	 * Generates a PDF and triggers a download.
	 */
	const handleReportClick = async () => {
		setLoadingReport(true);
		const completeReportData = await updateReportData();

		if (completeReportData) {
			try {
				// Generate the PDF document
				const doc = <GenerateReport reportData={completeReportData} language={language} />;
				const blob = await pdf(doc).toBlob();

				// Create a download link and simulate a click
				const url = URL.createObjectURL(blob);
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', 'SAV_Report.pdf');

				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				URL.revokeObjectURL(url);
			} catch (error) {
				console.error('Error generating PDF:', error);
			} finally {
				setLoadingReport(false);
			}
		} else {
			setLoadingReport(false);
			console.warn('Report generation failed due to missing images.');
		}
	};

	// --------------------------------------------------------------------------
	// Rendering
	// --------------------------------------------------------------------------

	// Display a loading spinner if the component is in a loading state
	if (isLoading) {
		window.scrollTo(0, 0);
		return (
			<div className="flex h-screen w-screen flex-col gap-4 items-center justify-center">
				{/* Loading spinner */}
				<l-quantum size="45" speed="1.75" color="black"></l-quantum>
				<p>{pageContent.loadingMessage}</p>
			</div>
		);
	}

	// Main content rendering
	return (
		<div className="flex flex-col gap-0 items-center ">
			{/* Header Section */}
			<div className="flex flex-col items-start w-full text-center sm:w-full">
				{/* Display warnings if any calculations are out of range */}
				{warning.length > 0 && (
					<div className="flex flex-col p-8 justify-center text-left bg-red-100 rounded-lg w-full gap-3">
						{/* Warning header */}
						<div className="flex flex-row gap-2 items-center text-red-600 border-b border-red-200 pb-3">
							<IoAlertCircle size={20} />
							<span className="text-lg font-semibold">{pageContent.rangeMessageTitel}</span>
						</div>
						{/* Warning messages */}
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
			<div className="flex flex-col gap-12">
				{/* KanzleiCard displays firm-related data */}
				<KanzleiCard />
				{/* CostCard displays cost-related data */}
				<CostCard />
			</div>

			{/* Summary and Table Section */}
			<div className="flex  min-h-[800px] items-center justify-center flex-col w-full gap-4 py-12">
				{/* Display 
				tabl with calculdfstion results */}
				<Table identifiers={Object.keys(calculationResults)} values={tableValues.filter((subArray) => subArray.length > 0)} />
				{/* Action Buttons */}
				<div className="flex flex-col gap-4 w-1/2 lg:w-full py-12 justify-center">
					{/* Button to reset or go back */}
					{/* Button to generate the report */}
					{width > 1000 ? (
						<Button
							startIcon={<TbReport />}
							text={loadingReport ? 'loading...' : pageContent.button2}
							onClick={handleReportClick}
							width="100%"
							variant="primary"
							disable={loadingReport}
						/>
					) : (
						''
					)}
					<div className="w-full flex items-start justify-start h-fit gap-2">
						<Button text={pageContent.buttonBack} width="100%" variant={'secondary'} route="/output" startIcon={<FaArrowLeft />} />
						<Button text={pageContent.button1} width="100%" variant={width > 1000 ? 'secondary' : 'primary'} route="/" startIcon={<FaArrowRotateLeft />} />
					</div>
				</div>
			</div>

			{/* Disclaimer Section */}
			<div className="flex flex-col items-center sm:items-start w-full text-center sm:text-start border-t-2 pt-8 my-12">
				<h1 className="text-xl font-semibold">{pageContent.disclaimerTitel}</h1>
				<p className="-mt-3 w-2/3 lg:w-full">{pageContent.disclaimer}</p>
			</div>
		</div>
	);
};

export default ResultPage;
