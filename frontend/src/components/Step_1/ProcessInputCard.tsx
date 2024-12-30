import { forwardRef, useImperativeHandle, useState } from 'react';
import InputField from './InputField';
import InputFieldDropdown from './InputFieldDropdown';
import cn from 'classnames';
import { useForm } from '@/context/FormState';
import { zodFormValidationProcess } from '@/types/getZodFormValidation';
import { IoMdAlert } from 'react-icons/io';
import useI18n from "@/translations/i18n";

const ProcessInputCard = forwardRef(({ className }: { className?: string }, ref) => {
  const { state } = useForm();
  const [error, setError] = useState<string | null>(null);
  const translate = useI18n();

  const DropdownOptions = ['repetitiveTasksIndividualizedOfferings', 'bespokeStandard', 'bespokeHighEnd'];

  const validateForm = () => {
    const result = zodFormValidationProcess.safeParse({
      processLeadingPersonnel: state.processLeadingPersonnel,
      serviceType: state.serviceType,
      employeesCount: state.employeesCount,
      partnersCount: state.partnersCount,
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
    <div className={cn('flex flex-col gap-8 p-10 rounded-xl bg-gray-100', className)}>
      <div className="flex flex-col gap-2">
        <span className="font-medium">{translate('processInputCard.processLeadingPersonnel')}</span>
        <InputField placeholder={translate('processInputCard.inputPlaceholderPercentage')} identifier="processLeadingPersonnel" unit={'%'}/>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-medium">{translate('processInputCard.serviceType')}</span>
        <InputFieldDropdown options={DropdownOptions} identifier="serviceType" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-medium">{translate('processInputCard.employeesCount')}</span>
        <InputField placeholder={translate('processInputCard.inputPlaceholderNumber')} identifier="employeesCount" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-medium">{translate('processInputCard.partnersCount')}</span>
        <InputField placeholder={translate('processInputCard.inputPlaceholderNumber')} identifier="partnersCount" />
      </div>
      {error && (
        <div className="flex flex-row items-center justify-start text-red-500 gap-1 text-sm">
          <IoMdAlert />
          <div className="">{error}</div>
        </div>
      )}
    </div>
  );
});

export default ProcessInputCard;
