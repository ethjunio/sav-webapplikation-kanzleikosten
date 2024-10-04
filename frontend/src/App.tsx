import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Background from './components/layout/Background';
import LandingPage from './routes/LandingPage';
import { LanguageProvider } from './context/LanguageContext';
import { ProgressProvider } from './context/ProgressContext';
import Footer from './components/layout/Footer';
import InputPage from './routes/InputPage';
import { FormProvider } from './context/FormState';
import Layout from './components/layout/Layout';
import OutputPage from './routes/OutputPage';
import ResultPage from './routes/ResultPage';
import { CalculationResultProvider } from './context/CalculationResultContext';
import { WindowWidthProvider } from './context/WindowWidthContext';
const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Layout>
				<div className="flex flex-col w-1/2 lg:w-full items-center justify-center ">
					<LandingPage />
				</div>
				<div className="w-1/2 lg:w-0"> </div>
			</Layout>
		),
	},
	{
		path: '/input',
		element: (
			<ProgressProvider>
				<Layout>
					<div className="flex w-1/2 lg:w-full items-start justify-center">
						<InputPage />
					</div>
					<div className="w-1/2 lg:w-0"> </div>
				</Layout>
			</ProgressProvider>
		),
	},
	{
		path: '/output',
		element: (
			<Layout fullscreen={true}>
				<div className="flex w-full items-start justify-center">
					<OutputPage />
				</div>
			</Layout>
		),
	},
	{
		path: '/result',
		element: (
			<Layout fullscreen={true}>
				<CalculationResultProvider>
					<div className="flex w-full items-start justify-center">
						<ResultPage />
					</div>
				</CalculationResultProvider>
			</Layout>
		),
	},
]);

const App: React.FC = () => {
	return (
		<>
			<WindowWidthProvider>
				<FormProvider>
					<LanguageProvider>
						<RouterProvider router={router} />
					</LanguageProvider>
				</FormProvider>
			</WindowWidthProvider>
		</>
	);
};

export default App;
