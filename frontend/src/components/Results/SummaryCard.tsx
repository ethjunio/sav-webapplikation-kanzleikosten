import { useLanguage } from '../../context/LanguageContext';
import content from '../../assets/content.json';

interface SummeryCardProps {
  totalYearlyCost: string;
  totalOnceCost: string;
}

export default function SummaryCard({ totalYearlyCost, totalOnceCost }: SummeryCardProps) {
  const { language } = useLanguage();

  const ComponentContent = (content as any)[language as keyof typeof content].summeryCard;

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
    <div className="flex text-primary flex-col items-center justify-center gap-5 rounded-xl mb-4">
      <div className="flex flex-row items-center justify-center gap-2 w-full font-semibold text-6xl">
        {ComponentContent?.titel}
      </div>
      <div className="text-center leading-10 text-4xl ">
        {parseBold(
          ComponentContent?.text
            ?.replace('{totalYearlyCost}', totalYearlyCost.toString())
            .replace('{totalOnceCost}', totalOnceCost.toString()),
        )}
      </div>
    </div>
  );
}
