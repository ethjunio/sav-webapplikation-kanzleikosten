import OutputCard from '@/components/Step_2/OutputCard';
import Button from '@/components/ui/general/Button';
import { FaBolt } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@/context/FormState';
import { useState } from 'react';
import { IoMdAlert } from 'react-icons/io';
import useI18n from '@/translations/i18n';

const OutputPage = () => {
  const { state, dispatch } = useForm();
  const [selectedList, setSelectedList] = useState<string[]>(state.outputParameters);
  const [error, setError] = useState<string | null>(null);
  const translate = useI18n();

  const navigate = useNavigate();

  function handleBackClick() {
    dispatch({ type: 'SET_OUTPUT_ARRAY', payload: selectedList });
    navigate('/input');
  }

  function handleNextClick() {
    if (selectedList.length > 0) {
      dispatch({ type: 'SET_OUTPUT_ARRAY', payload: selectedList });
      navigate('/result');
    } else {
      setError(translate('outputPage.error'));
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  }

  return (
    <div className="flex flex-col gap-12 items-center">
      <div className="flex flex-col gap-2 items-center w-1/2">
        <h4>{translate('outputPage.step')}</h4>
        <h2>{translate('outputPage.titel')}</h2>
        <p className="text-center">{translate('outputPage.description')}</p>
      </div>
      <OutputCard selectedList={selectedList} setSelectedList={setSelectedList} />
      <div className="flex flex-row gap-4 w-full">
        <Button
          text={translate('outputPage.button1')}
          width="100%"
          variant="ghost"
          onClick={handleBackClick}
          route=""
        />
        <div className=" flex w-full flex-col gap-2">
          <Button
            text={translate('outputPage.button2')}
            startIcon={<FaBolt />}
            onClick={handleNextClick}
            width="100%"
          />
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
