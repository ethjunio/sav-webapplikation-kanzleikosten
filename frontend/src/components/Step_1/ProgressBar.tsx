import { useProgress } from '@/context/ProgressContext';
import ProgressBarItem from './ProgresBarItem';
import { FaMapMarkerAlt, FaCog, FaCoins } from 'react-icons/fa';
import cn from 'classnames';

import { useDictionary } from '@/context/DictionaryContext';

interface ProgressBarProps {
  className?: string;
}

export default function ProgressBar({ className }: ProgressBarProps) {
  const { currentProgress } = useProgress();
  const dict = useDictionary();

  return (
    <div className={cn('flex flex-row', className)}>
      <div className="flex items-center justify-center w-full">
        <ProgressBarItem
          icon={<FaMapMarkerAlt />}
          text={dict.progressBar.step1}
          progressKey="location"
          currentProgress={currentProgress}
        />
        <ProgressBarItem
          icon={<FaCog />}
          text={dict.progressBar.step2}
          progressKey="process"
          currentProgress={currentProgress}
        />
        <ProgressBarItem
          icon={<FaCoins />}
          text={dict.progressBar.step3}
          progressKey="finances"
          currentProgress={currentProgress}
        />
      </div>
    </div>
  );
}
