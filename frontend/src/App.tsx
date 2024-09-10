import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Background from './components/layout/Background';
import LandingPage from './routes/LandingPage';
import Header from './components/layout/Header';
import { LanguageProvider } from './context/LanguageContext';
import { ProgressProvider } from './context/ProgressContext';
import InputPage from './routes/InputPage';
import { FormProvider } from './context/FormState';
import Layout from './components/layout/Layout';
import OutputPage from './routes/OutputPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Layout>
				<div className="flex flex-col w-1/2 items-center justify-center ">
					<LandingPage />
				</div>
				<div className="w-1/2"> </div>
			</Layout>
		),
	},
	{
		path: '/input',
		element: (
			<Layout>
				<ProgressProvider>
					<div className="flex w-1/2 items-start justify-center">
						<InputPage />
					</div>
					<div className="w-1/2"> </div>
				</ProgressProvider>
			</Layout>
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
]);

const App: React.FC = () => {
	return (
		<>
			<FormProvider>
				<LanguageProvider>
					<RouterProvider router={router} />
				</LanguageProvider>
			</FormProvider>
		</>
	);
};

export default App;
