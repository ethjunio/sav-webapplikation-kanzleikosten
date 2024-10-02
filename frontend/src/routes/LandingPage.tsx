import { useEffect } from 'react';
import content from '../assets/content.json';
import { languageContentType } from '../types/languageContentType';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/ui/general/Button';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { useForm } from '../context/FormState';

export default function LandingPage() {
  const { language } = useLanguage();
  const { dispatch } = useForm();

  useEffect(() => {
    dispatch({ type: 'RESET_FORM' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pageContent = (content as languageContentType)[language].landingPage;

  return (
    <div className="flex flex-col w-3/4">
      <h1>{pageContent.h1}</h1>
      <p>{pageContent.p1}</p>
      <p className="font-semibold">{pageContent.p2}</p>
      <div className="flex flex-col mb-5 text-sm ms-6">
        <div className="flex flex-row gap-3">
          <p>1.</p>
          <p>{pageContent.p3}</p>
        </div>
        <div className="flex flex-row gap-3">
          <p>2.</p>
          <p>{pageContent.p4}</p>
        </div>
      </div>
      <Button endIcon={<FaLongArrowAltRight />} text={pageContent.button} route="/input" width="70%" />
    </div>
  );
}
