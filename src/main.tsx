import { createRoot } from 'react-dom/client';
import App from './App.js'; // ✅ استخدام `.js`
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
