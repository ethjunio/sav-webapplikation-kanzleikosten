import { ReactNode } from 'react';

interface GrouTitelProps {
  titel: string;
  icon: ReactNode;
}

export default function GrouTitel({ titel, icon }: GrouTitelProps) {
  return (
    <div
      className={`flex flex-row w-full bg-gray-100 px-4 py-2 rounded-xl items-center justify-start gap-2 mb-1 text-lg text-primaryFade`}
    >
      <span className="text-xl">{icon}</span>
      {titel}
    </div>
  );
}
