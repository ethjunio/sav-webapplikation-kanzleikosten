import { languageContentType } from '../types/languageContentType';
import content from '../assets/content.json';
import { useLanguage } from '../context/LanguageContext';
import OutputCard from '../components/Step_2/OutputCard';
import Button from '../components/ui/general/Button';

const OutputPage = () => {
	const { language } = useLanguage();

	const pageContent = (content as languageContentType)[language as keyof typeof content].outputPage;

	function handleBackClick() {
		throw new Error('Function not implemented.');
	}

	function handleNextClick() {
		throw new Error('Function not implemented.');
	}

	return (
		<div className="flex flex-col gap-3 items-center">
			<div className="flex flex-col gap-2 items-center w-1/2">
				<h4>{pageContent.step}</h4>
				<h2>{pageContent.titel}</h2>
				<p className="text-center">{pageContent.description}</p>
			</div>
			<OutputCard />
			<div className="flex flex-row gap-4 w-full">
				<Button
					text={'test'}
					width="100%"
					variant="ghost"
					onClick={() => {
						handleBackClick();
					}}
				/>
				<Button
					text={'test'}
					width="100%"
					onClick={() => {
						handleNextClick();
					}}
				/>
			</div>
		</div>
	);
};

export default OutputPage;
