import { useEffect, useRef } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { useForm } from '../context/FormState';

const InputPage = () => {
	const navigate = useNavigate();

	const { language } = useLanguage();
	const { state, dispatch } = useForm();
	const { currentProgress, setProgress } = useProgress();

	useEffect(() => {
		if (state.revenuePerYear !== '') {
			setProgress('finances');
		}
	}, []);

	const pageContent = (content as languageContentType)[language].inputPage;

	const locationInputRef = useRef<{ validateForm: () => boolean }>(null);
	const processInputRef = useRef<{ validateForm: () => boolean }>(null);
	const financesInputRef = useRef<{ validateForm: () => boolean }>(null);

	// Define the progress flow order
	const steps = ['location', 'process', 'finances'];

	// Handle the "Next" button logic
	const handleNextClick = () => {
		// If current step is 'location', trigger validation in LocationInputCard
		if (currentProgress === 'location') {
			const isValid = locationInputRef.current?.validateForm();
			if (!isValid) return; // If validation fails, prevent moving to the next step
		} else if (currentProgress === 'process') {
			const isValid = processInputRef.current?.validateForm();
			if (!isValid) return; // If validation fails, prevent moving to the next step
		} else if (currentProgress === 'finances') {
			const isValid = financesInputRef.current?.validateForm();
			if (!isValid) return;
		}

		const currentStepIndex = steps.indexOf(currentProgress);
		if (currentStepIndex < steps.length - 1) {
			setProgress(steps[currentStepIndex + 1] as ProgressContext);
		} else if (currentStepIndex === 2) {
			navigate('/output');
		}
	};

	// Handle the "Back" button logic
	const handleBackClick = () => {
		const currentStepIndex = steps.indexOf(currentProgress);
		if (currentStepIndex > 0) {
			setProgress(steps[currentStepIndex - 1] as ProgressContext);
		} else if (currentStepIndex === 0) {
			navigate('/');
			dispatch({ type: 'RESET_FORM' });
		}
	};

	return (
		<>
			<div className="flex flex-col gap-3 items-center w-3/4 sm:w-full">
				<div className="flex flex-col gap-2 items-center w-full">
					<h4>{pageContent.step}</h4>
					<h2>{pageContent.titel}</h2>
					<ProgressBar className={'w-3/4 sm:w-5/6'} />
				</div>
				{currentProgress === 'location' && <LocationInputCard className="w-full my-6" ref={locationInputRef} />}
				{currentProgress === 'process' && <ProcessInputCard className="w-full my-6" ref={processInputRef} />}
				{currentProgress === 'finances' && <FinanceInputCard className="w-full my-6" ref={financesInputRef} />}
				<div className="flex flex-row sm:flex-col-reverse gap-4 w-full">
					<Button
						text={steps.indexOf(currentProgress) === 0 ? pageContent.button1Abord : pageContent.button1}
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
