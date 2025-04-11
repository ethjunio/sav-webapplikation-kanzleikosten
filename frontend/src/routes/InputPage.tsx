import { useEffect, useMemo, useRef } from 'react';
import Button from '@/components/ui/general/Button';
import LocationInputCard from '@/components/Step_1/LocationInputCard';
import ProgressBar from '@/components/Step_1/ProgressBar';
import ProcessInputCard from '@/components/Step_1/ProcessInputCard';
import { useProgress, ProgressState } from '@/context/ProgressContext';
import FinanceInputCard from '@/components/Step_1/FinanceInputCard';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@/context/FormState';

import { useDictionary } from '@/context/DictionaryContext';
import { useWindowWidth } from '@/context/WindowWidthContext';

const InputPage = () => {
  const navigate = useNavigate();
  const dict = useDictionary();

  const { state, dispatch } = useForm();
  const { currentProgress, setProgress } = useProgress();
  const { width } = useWindowWidth();

  const isMobile = useMemo(() => width < 767, [width]);
  const isSmMobile = useMemo(() => width < 639, [width]);

  useEffect(() => {
    if (state.revenuePerYear !== '') {
      setProgress('finances');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      if (!isValid) {
        return;
      } // If validation fails, prevent moving to the next step
    } else if (currentProgress === 'process') {
      const isValid = processInputRef.current?.validateForm();
      if (!isValid) {
        return;
      } // If validation fails, prevent moving to the next step
    } else if (currentProgress === 'finances') {
      const isValid = financesInputRef.current?.validateForm();
      if (!isValid) {
        return;
      }
    }

    const currentStepIndex = steps.indexOf(currentProgress);
    if (currentStepIndex < steps.length - 1) {
      setProgress(steps[currentStepIndex + 1] as ProgressState);
    } else if (currentStepIndex === 2) {
      navigate('/output');
    }
  };

  // Handle the "Back" button logic
  const handleBackClick = () => {
    const currentStepIndex = steps.indexOf(currentProgress);
    if (currentStepIndex > 0) {
      setProgress(steps[currentStepIndex - 1] as ProgressState);
    } else if (currentStepIndex === 0) {
      navigate('/');
      dispatch({ type: 'RESET_FORM' });
    }
  };

  return (
    <>
      <div className={`flex flex-col gap-3 items-center ${isMobile ? 'w-full' : 'w-3/4'}`}>
        <div className="flex flex-col gap-2 items-center w-full">
          <h4>{dict.inputPage.step}</h4>
          <h2>{dict.inputPage.titel}</h2>
          <ProgressBar className={isSmMobile ? 'w-5/6' : 'w-3/4'} />
        </div>
        {currentProgress === 'location' && <LocationInputCard className="w-full my-6" ref={locationInputRef} />}
        {currentProgress === 'process' && <ProcessInputCard className="w-full my-6" ref={processInputRef} />}
        {currentProgress === 'finances' && <FinanceInputCard className="w-full my-6" ref={financesInputRef} />}
        <div className={`flex gap-4 w-full ${isSmMobile ? 'flex-col-reverse' : ''}`}>
          <Button
            text={steps.indexOf(currentProgress) === 0 ? dict.inputPage.button1Abord : dict.inputPage.button1}
            width="100%"
            variant="ghost"
            onClick={() => {
              handleBackClick();
            }}
          />
          <Button
            text={dict.inputPage.button2}
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
