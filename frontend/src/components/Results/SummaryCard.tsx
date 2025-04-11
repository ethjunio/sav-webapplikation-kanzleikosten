
import { useDictionary } from '@/context/DictionaryContext';

interface SummeryCardProps {
  totalYearlyCost: string;
  totalOnceCost: string;
}

export default function SummaryCard({ totalYearlyCost, totalOnceCost }: SummeryCardProps) {
  const dict = useDictionary();

  const fillTranslationTemplate = (translation: string) => {
    return translation
      .replace('{totalYearlyCost}', totalYearlyCost.toString())
      .replace('{totalOnceCost}', totalOnceCost.toString());
  };

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
        {dict.summeryCard.titel}
      </div>
      <div id={'summaryText'} className="text-center sm:text-start leading-10 w-2/3 lg:w-full text-4xl md:text-xl">
        {parseBold(fillTranslationTemplate(dict.summeryCard.text))}
      </div>
    </div>
  );
}
