import React, { useRef } from 'react';
import content from '../assets/content.json';
import { languageContentType } from '../types/languageContentType';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/ui/general/Button';
import LocationInputCard from '../components/Step_1/LocationInputCard';
import ProgressBar from '../components/Step_1/ProgressBar';
import ProcessInputCard from '../components/Step_1/ProcessInputCard';
import { useProgress } from '../context/ProgressContext';
import { ProgressContext } from '../context/ProgressContext';
import FinanceInputCard from '../components/Step_1/FinanceInputCard';

const InputPage = () => {
	const { language } = useLanguage();
	const { currentProgress, setProgress } = useProgress();

	const pageContent = (content as languageContentType)[language].inputPage;

	const locationInputRef = useRef<{ validateForm: () => boolean }>(null);

	// Define the progress flow order
	const steps = ['location', 'process', 'finances'];

	// Handle the "Next" button logic
	const handleNextClick = () => {
		// If current step is 'location', trigger validation in LocationInputCard
		if (currentProgress === 'location') {
			const isValid = locationInputRef.current?.validateForm();
			if (!isValid) return; // If validation fails, prevent moving to the next step
		}

		const currentStepIndex = steps.indexOf(currentProgress);
		if (currentStepIndex < steps.length - 1) {
			setProgress(steps[currentStepIndex + 1] as ProgressContext);
		}
	};

	// Handle the "Back" button logic
	const handleBackClick = () => {
		const currentStepIndex = steps.indexOf(currentProgress);
		if (currentStepIndex > 0) {
			setProgress(steps[currentStepIndex - 1] as ProgressContext);
		}
	};

	return (
		<>
			<div className="flex flex-col gap-3 items-center w-3/4">
				<h4>{pageContent.step}</h4>
				<h2>{pageContent.titel}</h2>
				<ProgressBar className={'w-3/4'} />
				{currentProgress === 'location' && (
					<LocationInputCard
						className="w-full my-6"
						ref={locationInputRef} // Pass the ref to LocationInputCard
					/>
				)}
				{currentProgress === 'process' && <ProcessInputCard className="w-full my-6" ref={locationInputRef} />}
				{currentProgress === 'finances' && <FinanceInputCard className="w-full my-6" />}
				<div className="flex flex-row gap-4 w-full">
					<Button
						text={pageContent.button1}
						width="100%"
						variant="ghost"
						onClick={() => {
							handleBackClick();
						}}
					/>
					<Button
						text={pageContent.button2}
						width="100%"
						onClick={() => {
							handleNextClick();
						}}
					/>
				</div>
			</div>
		</>
	);
};

export default InputPage;
