import React from 'react';
import content from '../assets/content.json';
import { languageContentType } from '../types/languageContentType';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/ui/general/Button';
import { FaLongArrowAltRight } from 'react-icons/fa';


const LandingPage = () => {
	const { language } = useLanguage();
	console.log(language);

	const pageContent = (content as languageContentType)[language].landingPage;

	return (
		<>
			<h1>{pageContent.h1}</h1>
			<p>{pageContent.p1}</p>
			<p className="font-semibold">{pageContent.p2}</p>
			<div className="flex flex-col w-3/4 mb-5 text-sm ms-6">
				<div className="flex flex-row gap-3">
					<p>1.</p>
					<p>{pageContent.p3}</p>
				</div>
				<div className="flex flex-row gap-3">
					<p>2.</p>
					<p>{pageContent.p4}</p>
				</div>
			</div>
			<Button endIcon={<FaLongArrowAltRight />} text={pageContent.button} width="70%" />
		</>
	);
};

export default LandingPage;