import React from 'react';

interface ProgressBarItemProps {
	icon: React.ReactNode;
	text: string;
	progressKey: 'location' | 'process' | 'finances'; // Unique key for each progress item
	currentProgress: 'location' | 'process' | 'finances'; // Current progress state
}

const ProgressBarItem: React.FC<ProgressBarItemProps> = ({ icon, text, progressKey, currentProgress }) => {
	// Define the steps order
	const stepsOrder = ['location', 'process', 'finances'];

	// Get the indices of the current step and this item
	const currentStepIndex = stepsOrder.indexOf(currentProgress);
	const itemStepIndex = stepsOrder.indexOf(progressKey);

	// Determine if the current item is active (the current step being worked on)
	const isInProgress = currentStepIndex === itemStepIndex;

	// Determine if the current item is done (a previous step that is completed)
	const isDone = currentStepIndex > itemStepIndex;

	// Define the variant classes for the icon based on progress state
	const variantClasses = isInProgress || isDone ? 'bg-primary text-white border-primary' : 'bg-gray-200 text-gray-400 border-gray-400';

	// Add transition classes
	const transitionClasses = 'transition-all duration-500 ease-in-out';

	// Get the progress line (arrow) background style
	const getProgressLineStyle = () => {
		if (isDone) {
			return {
				backgroundColor: '#004C93', // Fully blue if completed
				transition: 'background-color 0.5s ease-in-out',
			};
		} else if (isInProgress) {
			return {
				background: 'linear-gradient(to right, #004C93 50%, #D1D5DB 50%)', // Half blue, half gray if in progress
				backgroundSize: '100% 100%',
				backgroundRepeat: 'no-repeat',
				transition: 'background 0.5s ease-in-out',
			};
		} else {
			return {
				backgroundColor: '#D1D5DB', // Gray if not reached
				transition: 'background-color 0.5s ease-in-out',
			};
		}
	};

	return (
		<div className={`flex flex-row items-center ${progressKey === 'finances' ? 'w-fit' : 'w-full'}`}>
			{/* Progress Icon and Label */}
			<div className={`flex flex-col items-center justify-center gap-1 ${isInProgress ? 'scale-125' : ''} ${transitionClasses}`}>
				<div className={`flex w-fit h-fit items-center justify-center p-3 border rounded-full ${variantClasses} ${transitionClasses}`}>{icon}</div>
				<div className={`text-xs ${isInProgress || isDone ? 'text-primary font-semibold' : 'text-gray-400'} ${transitionClasses}`}>{text}</div>
			</div>

			{/* Progress Line */}
			{progressKey !== 'finances' && (
				<div className="w-full h-2 mx-4 sm:mx-2 mb-5">
					<div className="h-full rounded-full" style={getProgressLineStyle()}></div>
				</div>
			)}
		</div>
	);
};

export default ProgressBarItem;
