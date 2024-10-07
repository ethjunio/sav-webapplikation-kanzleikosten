import { useProgress } from '@/context/ProgressContext';
import ProgressBarItem from './ProgresBarItem';
import { FaMapMarkerAlt, FaCog, FaCoins } from 'react-icons/fa';
import content from '@/assets/content.json';
import { useLanguage } from '@/context/LanguageContext';
import cn from 'classnames';

interface ProgressBarProps {
  className?: string;
}

export default function ProgressBar({ className }: ProgressBarProps) {
  const { currentProgress } = useProgress();
  const { language } = useLanguage();

  const ComponentContent = (content as any)[language].progressBar;

  return (
    <div className={cn('flex flex-row', className)}>
      <div className="flex items-center justify-center w-full">
        <ProgressBarItem
          icon={<FaMapMarkerAlt />}
          text={ComponentContent?.step1}
          progressKey="location"
          currentProgress={currentProgress}
        />
        <ProgressBarItem
          icon={<FaCog />}
          text={ComponentContent?.step2}
          progressKey="process"
          currentProgress={currentProgress}
        />
        <ProgressBarItem
          icon={<FaCoins />}
          text={ComponentContent?.step3}
          progressKey="finances"
          currentProgress={currentProgress}
        />
      </div>
    </div>
  );
}
