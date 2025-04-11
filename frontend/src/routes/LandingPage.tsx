import { useEffect } from 'react';
import Button from '@/components/ui/general/Button';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { useForm } from '@/context/FormState';

import { useDictionary } from '@/context/DictionaryContext';

export default function LandingPage() {
  const { dispatch } = useForm();
  const dict = useDictionary();

  useEffect(() => {
    dispatch({ type: 'RESET_FORM' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <h1>{dict.landingPage.h1}</h1>
      <p>{dict.landingPage.p1}</p>
      <p className="font-semibold">{dict.landingPage.p2}</p>
      <div className="mb-5 text-sm ms-6">
        <div className="flex flex-row gap-3">
          <p>1.</p>
          <p>{dict.landingPage.p3}</p>
        </div>
        <div className="flex flex-row gap-3">
          <p>2.</p>
          <p>{dict.landingPage.p4}</p>
        </div>
      </div>
      <Button endIcon={<FaLongArrowAltRight />} text={dict.landingPage.button} route="/input" width="100%" />
    </section>
  );
}
