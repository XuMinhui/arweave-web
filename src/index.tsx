import * as ReactDOMClient from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App';

const rootElement = document.getElementById("root");

const root = ReactDOMClient.createRoot(rootElement as HTMLElement);
root.render(<StrictMode>
  <App />
</StrictMode>);