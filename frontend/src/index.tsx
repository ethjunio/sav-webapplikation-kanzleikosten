import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/globals.css';
import { PortletEntryParams } from './types/liferay.types';

// Ensure development mode runs without liferay
if (import.meta.env.MODE === 'development') {
  main({
    portletNamespace: '',
    contextPath: '', // This is responsible for the base path of public assets
    portletElementId: 'root', // This is the element react will mount onto
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
export default function main({
  portletNamespace,
  contextPath,
  portletElementId,
  configuration,
}: PortletEntryParams): void {
  const container = document.getElementById(portletElementId) as HTMLElement;

  let mountPoint = container;
  if (import.meta.env.MODE !== 'development') {
    // In Production we use a Shadow DOM to ignore all outside CSS
    const shadowRoot = container.attachShadow({ mode: 'open' });
    mountPoint = document.createElement('div');
    shadowRoot.appendChild(mountPoint);

    // We add the CSS of the app
    const appCssNode = document.createElement('link');
    appCssNode.setAttribute('href', `${window.location.protocol}//${window.location.hostname}${contextPath}/style.css`);
    appCssNode.setAttribute('rel', 'stylesheet');
    appCssNode.setAttribute('type', 'text/css');

    // Optional: Handle loading error
    appCssNode.onerror = () => {
      console.error('Failed to load CSS:', appCssNode.href);
    };

    shadowRoot.appendChild(appCssNode);
  }

  const root = createRoot(mountPoint);

  root.render(
    <StrictMode>
      <App
        portletNamespace={portletNamespace}
        contextPath={contextPath}
        portletElementId={portletElementId}
        configuration={configuration}
      />
    </StrictMode>,
  );
}
