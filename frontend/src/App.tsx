import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Background from './components/layout/Background';
import LandingPage from './routes/LandingPage';
import Header from './components/layout/Header';
import { LanguageProvider } from './context/LanguageContext';
import { ProgressProvider } from './context/ProgressContext';
import InputPage from './routes/InputPage';
import { FormProvider } from './context/FormState';

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<>
				<div className="w-1/2 content-center">
					<LandingPage />
				</div>
				<div className="w-1/2"> </div>
			</>
		),
	},
	{
		path: '/input',
		element: (
			<>
				<ProgressProvider>
					<div className="flex w-1/2 items-center justify-center">
						<InputPage />
					</div>
					<div className="w-1/2"> </div>
				</ProgressProvider>
			</>
		),
	},
]);

const App: React.FC = () => {
	return (
		<>
			<Background>
				<FormProvider>
					<LanguageProvider>
						<Header />
						<div className="flex flex-row container mx-auto px-4 flex-grow gap-32">
							<RouterProvider router={router} />
						</div>
					</LanguageProvider>
				</FormProvider>
			</Background>
		</>
	);
};

export default App;
