import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Background from './components/layout/Background';
import LandingPage from './routes/Landing';
import Header from './components/layout/Header';
import { LanguageProvider } from './context/LanguageContext';
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
]);

const App: React.FC = () => {
	return (
		<>
			<Background>
				<LanguageProvider>
					<Header />
					<div className="flex flex-row container mx-auto px-4 flex-grow gap-32">
						<RouterProvider router={router} />
					</div>
				</LanguageProvider>
			</Background>
		</>
	);
};

export default App;
