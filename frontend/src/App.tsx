import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './routes/LandingPage';
import { LanguageProvider } from './context/LanguageContext';
import { ProgressProvider } from './context/ProgressContext';
import InputPage from './routes/InputPage';
import { FormProvider } from './context/FormState';
import Layout from './components/layout/Layout';
import OutputPage from './routes/OutputPage';
import ResultPage from './routes/ResultPage';
import { CalculationResultProvider } from './context/CalculationResultContext';
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
      <ProgressProvider>
        <Layout>
          <div className="flex w-1/2 items-start justify-center">
            <InputPage />
          </div>
          <div className="w-1/2"> </div>
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

export default function App() {
  return (
    <>
      <FormProvider>
        <LanguageProvider>
          <RouterProvider router={router} />
        </LanguageProvider>
      </FormProvider>
    </>
  );
}
