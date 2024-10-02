import React, { forwardRef, useImperativeHandle, useState } from 'react';
import InputField from './InputField';
import content from '../../assets/content.json';
import { useLanguage } from '../../context/LanguageContext';
import { languageContentType } from '../../types/languageContentType';
import { getZodFormValidationFinances } from '../../types/getZodFormValidation';
import cn from 'classnames';
import { IoMdAlert } from 'react-icons/io';
import { useForm } from '../../context/FormState';

const FinanceInputCard = ({ className }: { className?: string }, ref: any) => {
  const { language } = useLanguage();
  const { state } = useForm();
  const [error, setError] = useState<string | null>(null);

  const ComponentContent = (content as languageContentType)[language as keyof typeof content].financialInputCard;

  const validateForm = () => {
    const schema = getZodFormValidationFinances(language);
    const result = schema.safeParse({
      revenuePerYear: state.revenuePerYear,
      operatingCostsPerYear: state.operatingCostsPerYear,
    });

    console.log(result.error);
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
    <div className={cn('flex flex-col gap-8 p-10 rounded-xl bg-gray-100', className)}>
      <div className="flex flex-col gap-2">
        <span className="font-medium">{ComponentContent?.revenuePerYear}</span>
        <InputField placeholder={ComponentContent?.inputPlaceholderCurrency} identifier={'revenuePerYear'} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-medium">{ComponentContent?.operatingCostsPerYear}</span>
        <InputField placeholder={ComponentContent?.inputPlaceholderCurrency} identifier={'operatingCostsPerYear'} />
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

export default React.forwardRef(FinanceInputCard);
