import {forwardRef, useImperativeHandle, useState} from 'react';
import InputField from './InputField';
import {zodFormValidationFinances} from '@/types/getZodFormValidation';
import cn from 'classnames';
import {IoMdAlert} from 'react-icons/io';
import {useForm} from '@/context/FormState';
import useI18n from "@/translations/i18n";

const FinanceInputCard = ({className}: { className?: string }, ref: any) => {
  const {state} = useForm();
  const [error, setError] = useState<string | null>(null);
  const translate = useI18n();

  const validateForm = () => {
    const result = zodFormValidationFinances.safeParse({
      revenuePerYear: state.revenuePerYear,
      operatingCostsPerYear: state.operatingCostsPerYear,
    });

    if (!result.success) {
      setError(result.error.errors[0].message);
      setTimeout(() => {
        setError(null); // Clear the error after 5 seconds
      }, 3000);
      return false; // Return false if validation fails
    } else {
      setError(null);
      return true; // Return true if validation passes
    }
  };

  useImperativeHandle(ref, () => ({
    validateForm,
  }));

  return (
      <div className={cn('flex flex-col gap-8 p-10 rounded-xl bg-gray-100',
          className)}>
        <div className="flex flex-col gap-2">
          <span className="font-medium">{translate(
              'financialInputCard.revenuePerYear')}</span>
          <InputField placeholder={translate(
              'financialInputCard.inputPlaceholderCurrency')}
                      identifier={'revenuePerYear'} unit={'CHF'}/>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-medium">{translate(
              'financialInputCard.operatingCostsPerYear')}</span>
          <InputField placeholder={translate(
              'financialInputCard.inputPlaceholderCurrency')}
                      identifier={'operatingCostsPerYear'} unit={'CHF'}/>
        </div>
        {error && (
            <div
                className="flex flex-row items-center justify-start text-red-500 gap-1 text-sm">
              <IoMdAlert/>
              <div className="">{error}</div>
            </div>
        )}
      </div>
  );
};

export default forwardRef(FinanceInputCard);
