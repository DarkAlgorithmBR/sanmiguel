import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Patch JSON.stringify to handle circular structures gracefully.
// This prevents third-party widgets (like video players) from throwing 
// fatal "Converting circular structure to JSON" errors when interacting with 
// browser postMessage layers or state serializations.
const originalStringify = JSON.stringify;
JSON.stringify = function (value: any, replacer?: any, space?: any) {
  try {
    return originalStringify(value, replacer, space);
  } catch (err: any) {
    if (err instanceof TypeError && (err.message.includes('circular') || err.message.includes('Circular'))) {
      try {
        const seen = new WeakSet();
        return originalStringify(value, function(key, val) {
          if (typeof val === 'object' && val !== null) {
            if (seen.has(val)) {
              return '[Circular]';
            }
            seen.add(val);
          }
          return val;
        }, space);
      } catch (e) {
        return '"[Unserializable]"';
      }
    }
    throw err;
  }
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

