import { PropsWithChildren, useMemo } from 'react';
import HeroImage from './HeroImage';
import { useWindowWidth } from '@/context/WindowWidthContext';

interface LayoutProps {
  fullscreen?: boolean;
}

export default function Layout({ children, fullscreen }: PropsWithChildren<LayoutProps>) {
  const { width } = useWindowWidth();

  const showHeroImage = useMemo(() => !fullscreen && width >= 767, [width]);
  const isSmMobile = useMemo(() => width < 639, [width]);

  return (
    <article
      aria-label="Body"
      className={`flex flex-row items-center ${showHeroImage ? 'justify-between' : 'justify-center'}`}
    >
      <section
        aria-label="Main Content"
        className={`py-16 md:py-8 flex justify-center ${showHeroImage ? 'basis-2/3 max-w-3xl' : 'w-full'} ${
          isSmMobile ? 'px-4' : 'px-12'
        }`}
      >
        {children}
      </section>

      {showHeroImage && (
        <section aria-label="Hero Image" className="basis-1/3 h-[970px]">
          <HeroImage />
        </section>
      )}
    </article>
  );
}
