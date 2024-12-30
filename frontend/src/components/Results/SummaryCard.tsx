import useI18n from "@/translations/i18n";

interface SummeryCardProps {
  totalYearlyCost: string;
  totalOnceCost: string;
}

export default function SummaryCard({
  totalYearlyCost,
  totalOnceCost
}: SummeryCardProps) {
  const translate = useI18n()
  
  const fillTranslationTemplate = (translation: string) => {
    return translation
    .replace('{totalYearlyCost}', totalYearlyCost.toString())
    .replace('{totalOnceCost}', totalOnceCost.toString())
  }

  const parseBold = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      } else {
        return part;
      }
    });
  };

  return (
      <div className="flex text-primary flex-col items-center sm:items-start justify-center gap-5 rounded-xl mb-4">
        <div className="flex flex-row items-center justify-center gap-2 font-semibold text-6xl md:text-4xl">
          {translate('summeryCard.titel')}
        </div>
        <div id={'summaryText'} className="text-center sm:text-start leading-10 w-2/3 lg:w-full text-4xl md:text-xl">
          {parseBold(fillTranslationTemplate(translate('summeryCard.text')))}
        </div>
      </div>
  );
}
