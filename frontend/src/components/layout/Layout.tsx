import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import HeroImage from './HeroImage';

interface LayoutProps {
  fullscreen?: boolean;
}

export default function Layout({ children, fullscreen }: PropsWithChildren<LayoutProps>) {
  return (
    <>
      <Header />
      <article
        aria-label="Body"
        className={`flex flex-row items-center ${!fullscreen ? 'justify-end' : 'justify-around'}`}
      >
        <section
          aria-label="Main Content"
          className={`py-16 mx-12 ${!fullscreen ? 'basis-2/3 max-w-3xl' : 'max-w-7xl'}`}
        >
          {children}
        </section>

        {!fullscreen && (
          <section aria-label="Hero Image" className="basis-1/3 h-[970px]">
            <HeroImage />
          </section>
        )}
      </article>
      <Footer />
    </>
  );
}
