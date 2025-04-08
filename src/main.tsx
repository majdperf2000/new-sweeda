

import App from './App.tsx'; // يمكن حذف .tsx هنا
import './styles/global.css'; // يجب أن يحتوي هذا على كل استيرادات @import
import './index.css'; // (اختياري) إذا كنت تحتاج ملف أنماط إضافي

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);