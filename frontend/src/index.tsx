import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/globals.css';
import { PortletEntryParams } from './types/liferay.types';

// Ensure development mode runs without liferay
if (import.meta.env.MODE === 'development') {
  main({
    portletNamespace: '',
    contextPath: '',
    portletElementId: 'root',
    configuration: { system: {}, portletInstance: {} },
  });
}

/**
 * Main portlet entrypoint for Liferay.
 *
 * @param portletNamespace - omitted
 * @param contextPath - omitted
 * @param portletElementId
 * @param configuration - omitted
 */
export default function main({ portletElementId }: PortletEntryParams): void {
  const container = document.getElementById(portletElementId) as HTMLElement;
  const root = createRoot(container);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
