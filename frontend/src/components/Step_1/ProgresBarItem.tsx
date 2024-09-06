import React from 'react';

interface ProgressBarItemProps {
	icon: React.ReactNode;
	text: string;
	progressKey: 'location' | 'process' | 'finances'; // Unique key for each progress item
	currentProgress: 'location' | 'process' | 'finances'; // Current progress state
}

const ProgressBarItem: React.FC<ProgressBarItemProps> = ({ icon, text, progressKey, currentProgress }) => {
	// Determine if the current item is active (the current step being worked on)
	const isInProgress = currentProgress === progressKey;

	// Determine if the current item is done (a previous step that is completed)
	const isDone = ['location', 'process', 'finances'].indexOf(currentProgress) > ['location', 'process', 'finances'].indexOf(progressKey);

	// Define the variant classes for the icon based on progress state
	const variantClasses = isInProgress || isDone ? 'bg-primary text-white border-primary' : 'bg-gray-200 text-gray-400 border-gray-400';

	// Get the progress line (arrow) background style
	const getProgressLineStyle = () => {
		if (isDone) {
			return {
				backgroundColor: '#004C93', // Fully blue if completed
			};
		} else if (isInProgress) {
			return {
				background: 'linear-gradient(to right, #004C93 50%, #D1D5DB 50%)', // Half blue, half gray if in progress
			};
		} else {
			return { backgroundColor: '#D1D5DB' }; // Gray if not reached
		}
	};

	return (
		<div className={`flex flex-row items-center ${progressKey == 'finances' ? 'w-fit' : 'w-full'} `}>
			{/* Progress Icon and Label */}
			<div className={`flex flex-col items-center justify-center gap-1 ${isInProgress && 'scale-125'}`}>
				<div className={`flex w-fit h-fit items-center justify-center p-3 border rounded-full ${variantClasses}`}>{icon}</div>
				<div className={`text-xs ${isInProgress || isDone ? 'text-primary font-semibold' : 'text-gray-400'}`}>{text}</div>
			</div>

			{/* Progress Line (Arrow) */}
			{progressKey !== 'finances' && (
				<div className="w-full h-2 mx-4 sm:mx-2 mb-5">
					<div className="h-full rounded-full" style={getProgressLineStyle()}></div>
				</div>
			)}
		</div>
	);
};

export default ProgressBarItem;
