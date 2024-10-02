import { ReactNode } from 'react';
import Background from './Background'; // Assuming you have this already
import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
  fullscreen?: boolean;
}

export default function Layout({ children, fullscreen }: LayoutProps) {
  return (
    <>
      <Background fullscreen={fullscreen}>
        <Header />
        <div className="flex flex-row container mx-auto px-4 py-16 flex-grow">{children}</div>
      </Background>
      <Footer />
    </>
  );
}
