import { useEffect } from 'react';
import Button from '@/components/ui/general/Button';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { useForm } from '@/context/FormState';
import useI18n from '@/translations/i18n';

export default function LandingPage() {
  const { dispatch } = useForm();
  const translate = useI18n();

  useEffect(() => {
    dispatch({ type: 'RESET_FORM' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>{translate('landingPage.h1')}</h1>
      <p>{translate('landingPage.p1')}</p>
      <p className="font-semibold">{translate('landingPage.p2')}</p>
      <div className="mb-5 text-sm ms-6">
        <div className="flex flex-row gap-3">
          <p>1.</p>
          <p>{translate('landingPage.p3')}</p>
        </div>
        <div className="flex flex-row gap-3">
          <p>2.</p>
          <p>{translate('landingPage.p4')}</p>
        </div>
      </div>
      <Button endIcon={<FaLongArrowAltRight />} text={translate('landingPage.button')} route="/input" width="100%" />
    </>
  );
}
