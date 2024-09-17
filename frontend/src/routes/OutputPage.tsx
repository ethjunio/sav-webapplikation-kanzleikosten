import { languageContentType } from '../types/languageContentType';
import content from '../assets/content.json';
import { useLanguage } from '../context/LanguageContext';
import OutputCard from '../components/Step_2/OutputCard';
import Button from '../components/ui/general/Button';
import { FaBolt } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../context/FormState';
import { useState } from 'react';

const OutputPage = () => {
	const { language } = useLanguage();
	const { state, dispatch } = useForm();
	const [selectedList, setSelectedList] = useState<string[]>(state.outputParameters);

	const navigate = useNavigate();

	const pageContent = (content as languageContentType)[language as keyof typeof content].outputPage;

	function handleBackClick() {
		dispatch({ type: 'SET_OUTPUT_ARRAY', payload: selectedList });
		navigate('/input');
	}

	function handleNextClick() {
		dispatch({ type: 'SET_OUTPUT_ARRAY', payload: selectedList });
		navigate('/result');
	}

	return (
		<div className="flex flex-col gap-12 items-center">
			<div className="flex flex-col gap-2 items-center w-1/2">
				<h4>{pageContent.step}</h4>
				<h2>{pageContent.titel}</h2>
				<p className="text-center">{pageContent.description}</p>
			</div>
			<OutputCard selectedList={selectedList} setSelectedList={setSelectedList} />
			<div className="flex flex-row gap-4 w-full">
				<Button text={pageContent.button1} width="100%" variant="ghost" onClick={handleBackClick} route="" />
				<Button text={pageContent.button2} startIcon={<FaBolt />} onClick={handleNextClick} width="100%" />
			</div>
		</div>
	);
};

export default OutputPage;
