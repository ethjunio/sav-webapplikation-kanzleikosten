import { usePortletProps } from '@/context/PortletPropsContext';
import { useProgress } from '@/context/ProgressContext';
import { useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function HeroImage() {
  const location = useLocation();
  const { currentProgress } = useProgress();
  const [imageSource, setImageSource] = useState('');
  const { contextPath } = usePortletProps();

  useLayoutEffect(() => {
    if (location.pathname === '/') {
      setImageSource(`${contextPath}/images/BG-1.webp`);
      return;
    }

    if (location.pathname !== '/input') {
      return;
    }

    if (currentProgress === 'location') {
      setImageSource(`${contextPath}/images/BG-2.webp`);
    } else if (currentProgress === 'process') {
      setImageSource(`${contextPath}/images/BG-3.webp`);
    } else if (currentProgress === 'finances') {
      setImageSource(`${contextPath}/images/BG-4.webp`);
    }
  }, [currentProgress, location.pathname]);

  return <img src={imageSource} alt="Hero Image" className="h-full w-full object-cover" />;
}
