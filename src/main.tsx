import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

function mountApp() {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', mountApp);
    } else {
      console.error('Root element #root not found!');
    }
    return;
  }

  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

mountApp();

// Configure PWA Manifest and Service Worker when running on HTTP/HTTPS (Mobile / Web)
if (window.location.protocol.startsWith('http')) {
  // Inject manifest dynamically for PWA installation on smartphones
  if (!document.querySelector('link[rel="manifest"]')) {
    const manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = './manifest.webmanifest';
    document.head.appendChild(manifestLink);
  }

  // Register Service Worker for offline mobile routine
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch((err) => {
        console.log('SW registration error: ', err);
      });
    });
  }
}
