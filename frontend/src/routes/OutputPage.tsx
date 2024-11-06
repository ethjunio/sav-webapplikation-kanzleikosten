import { languageContentType } from '../types/languageContentType';
import content from '../assets/content.json';
import { useLanguage } from '../context/LanguageContext';
import OutputCard from '../components/Step_2/OutputCard';
import Button from '../components/ui/general/Button';
import { FaBolt } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../context/FormState';
import { useState } from 'react';
import { IoMdAlert } from 'react-icons/io';

const OutputPage = () => {
	const { language } = useLanguage();
	const { state, dispatch } = useForm();
	const [selectedList, setSelectedList] = useState<string[]>(state.outputParameters);
	const [error, setError] = useState<string|null>(null);

	const navigate = useNavigate();

	const pageContent = (content as languageContentType)[language as keyof typeof content].outputPage;

	function handleBackClick() {
		dispatch({ type: 'SET_OUTPUT_ARRAY', payload: selectedList });
		navigate('/input');
	}

	function handleNextClick() {
		if (selectedList.length > 0) {
			dispatch({ type: 'SET_OUTPUT_ARRAY', payload: selectedList });
			navigate('/result');
		} else {
			setError(pageContent.error);
			setTimeout(() => {
				setError(null); 
			}, 2000);
		}
	}

	return (
		<div className="flex flex-col gap-12 sm:gap-6 items-center">
			<div className="flex flex-col gap-2 items-center w-1/2 sm:w-full">
				<h4>{pageContent.step}</h4>
				<h2>{pageContent.titel}</h2>
				<p className="text-center">{pageContent.description}</p>
			</div>
			<OutputCard selectedList={selectedList} setSelectedList={setSelectedList} />
			<div className="flex flex-row sm:flex-col-reverse gap-4 w-full">
				<Button text={pageContent.button1} width="100%" variant="ghost" onClick={handleBackClick} route="" />
				<div className=" flex w-full flex-col gap-2">
					<Button text={pageContent.button2} startIcon={<FaBolt />} onClick={handleNextClick} width="100%" />
					{error && (
						<div className="flex flex-row items-center justify-center text-red-500 gap-1 text-sm">
							<IoMdAlert />
							<div className="">{error}</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default OutputPage;
