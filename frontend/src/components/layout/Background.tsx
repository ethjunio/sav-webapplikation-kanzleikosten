import React, { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import { useWindowWidth } from '../../context/WindowWidthContext';

interface BackgroundProps {
	children: ReactNode;
	fullscreen?: boolean;
}

const Background: React.FC<BackgroundProps> = ({ children, fullscreen }) => {
	const location = useLocation();
	const { currentProgress } = useProgress();
	const { width } = useWindowWidth();

	// State for controlling the current background image
	const [backgroundImage, setBackgroundImage] = useState<string>('');
	const [fadeIn, setFadeIn] = useState<boolean>(true);

	// Function to get the correct background image based on location and progress
	const getBackgroundImage = () => {
		if (location.pathname === '/') return './images/BG-1.webp';
		if (location.pathname === '/input' && currentProgress === 'location') return './images/BG-2.webp';
		if (location.pathname === '/input' && currentProgress === 'process') return './images/BG-3.webp';
		if (location.pathname === '/input' && currentProgress === 'finances') return './images/BG-4.webp';
		return '';
	};

	// Update the background image when the location or progress changes
	useEffect(() => {
		const newBackgroundImage = getBackgroundImage();
		if (newBackgroundImage !== backgroundImage) {
			setFadeIn(false); // Start fade-out transition
			setTimeout(() => {
				setBackgroundImage(newBackgroundImage); // Update the background image after fade-out
				setFadeIn(true); // Start fade-in transition
			}, 300); // Set this to match the duration of your fade-out transition (300ms in this case)
		}
	}, [location, currentProgress]);

	console.log(width);

	return (
		<>
			{width > 1023 ? (
				<div className="relative min-h-screen w-screen">
					{!fullscreen && (
						<div className="absolute inset-0 flex flex-row">
							<div className="w-1/2"></div>
							<div className="w-1/2 relative">
								{backgroundImage && (
									<img
										src={backgroundImage}
										alt="background"
										style={{
											objectFit: 'cover',
											width: '100%',
											top: '0px',
											objectPosition: 'center',
											height: '100%',
											opacity: fadeIn ? 1 : 0.5, // Apply fade effect based on state
											transition: 'opacity 0.5s ease-in-out', // Smooth transition
										}}
									/>
								)}
							</div>
						</div>
					)}

					{/* Children content */}
					<div className="relative flex flex-col z-10 min-h-screen">{children}</div>
				</div>
			) : (
				<div className="relative min-h-screen w-screen">

					<div className="relative flex flex-col z-10 min-h-screen">{children}</div>
				</div>
			)}
		</>
	);
};

export default Background;
