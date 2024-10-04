import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';

interface WindowWidthContextProps {
	width: number;
}

const WindowWidthContext = createContext<WindowWidthContextProps>({ width: window.innerWidth });

interface WindowWidthProviderProps {
	children: ReactNode;
}

const WindowWidthProvider: React.FC<WindowWidthProviderProps> = ({ children }) => {
	const [width, setWidth] = useState<number>(window.innerWidth);

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth);

		window.addEventListener('resize', handleResize);
		// Optional: Update width if the window is scrolled horizontally
		window.addEventListener('scroll', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('scroll', handleResize);
		};
	}, []);

	return <WindowWidthContext.Provider value={{ width }}>{children}</WindowWidthContext.Provider>;
};

// Custom hook for easier consumption
const useWindowWidth = () => useContext(WindowWidthContext);

export { WindowWidthProvider, useWindowWidth };
