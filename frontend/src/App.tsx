import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './routes/LandingPage';
import { LanguageProvider } from './context/LanguageContext';
import { ProgressProvider } from './context/ProgressContext';
import InputPage from './routes/InputPage';
import { FormProvider } from './context/FormState';
import Layout from './components/layout/Layout';
import OutputPage from './routes/OutputPage';
import ResultPage from './routes/ResultPage';
import { CalculationResultProvider } from './context/CalculationResultContext';

const router = createMemoryRouter([
  {
    path: '/',
    element: (
      <Layout>
        <LandingPage />
      </Layout>
    ),
  },
  {
    path: '/input',
    element: (
      <ProgressProvider>
        <Layout>
          <InputPage />
        </Layout>
      </ProgressProvider>
    ),
  },
  {
    path: '/output',
    element: (
      <Layout fullscreen={true}>
        <OutputPage />
      </Layout>
    ),
  },
  {
    path: '/result',
    element: (
      <Layout fullscreen={true}>
        <CalculationResultProvider>
          <ResultPage />
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
