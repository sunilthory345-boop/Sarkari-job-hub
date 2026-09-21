import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import './index.css';

// Guard against benign iframe/cross-origin unhandled errors from third-party scripts
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    // Avoid noisy uncaught console crashes from aborted fetches or third-party ad blocks
    if (event.reason && (event.reason.name === 'AbortError' || event.reason.message?.includes('Failed to fetch'))) {
      event.preventDefault();
    }
  });

  window.addEventListener('error', (event) => {
    // Ignore cross-origin script errors or resize observer notifications
    if (event.message === 'Script error.' || event.message?.includes('ResizeObserver loop')) {
      event.preventDefault();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);

