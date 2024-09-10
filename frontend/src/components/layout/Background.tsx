import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface BackgroundProps {
	children: ReactNode;
	fullscreen?: boolean;
}

const Background: React.FC<BackgroundProps> = ({ children, fullscreen }) => {
	return (
		<div className="relative min-h-screen w-screen">
			{!fullscreen && (
				<div className="absolute inset-0 flex flex-row">
					<div className="w-1/2"></div>
					<div className="w-1/2">
						<img src="./images/BG-1.jpg" alt="background" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
					</div>
				</div>
			)}

			{/* Children content */}
			<div className="relative flex flex-col z-10 min-h-screen">{children}</div>
		</div>
	);
};

export default Background;
