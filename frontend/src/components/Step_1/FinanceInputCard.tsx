import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import InputField from './InputField';
import { zodFormValidationFinances } from '@/types/getZodFormValidation';
import cn from 'classnames';
import { IoMdAlert } from 'react-icons/io';
import { useForm } from '@/context/FormState';

import { useDictionary } from '@/context/DictionaryContext';
import { useWindowWidth } from '@/context/WindowWidthContext';

const FinanceInputCard = ({ className }: { className?: string }, ref: any) => {
  const { state } = useForm();
  const [error, setError] = useState<string | null>(null);
  const dict = useDictionary();
  const { width } = useWindowWidth();

  const isMobile = useMemo(() => width < 767, [width]);

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
    <div className={cn(`flex flex-col gap-8 rounded-xl bg-gray-100 ${isMobile ? 'p-5' : 'p-10'}`, className)}>
      <div className="flex flex-col gap-2">
        <span className="font-medium">{dict.financialInputCard.revenuePerYear}</span>
        <InputField
          placeholder={dict.financialInputCard.inputPlaceholderCurrency}
          identifier={'revenuePerYear'}
          unit={'CHF'}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-medium">{dict.financialInputCard.operatingCostsPerYear}</span>
        <InputField
          placeholder={dict.financialInputCard.inputPlaceholderCurrency}
          identifier={'operatingCostsPerYear'}
          unit={'CHF'}
        />
      </div>
      {error && (
        <div className="flex flex-row items-center justify-start text-red-500 gap-1 text-sm">
          <IoMdAlert />
          <div className="">{error}</div>
        </div>
      )}
    </div>
  );
};

export default forwardRef(FinanceInputCard);
