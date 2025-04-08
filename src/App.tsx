import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageTransition from '@/components/animations/page-transition.js';

// استيراد المكونات مع تصحيح الامتدادات لTypeScript
import Index from '@/pages/Index.js';
import Auth from '@/pages/Auth.js';
import Register from '@/pages/Register.js';
import Dashboard from '@/pages/Dashboard.js';
import StoreOwnerDashboard from '@/pages/StoreOwnerDashboard.js';
import Checkout from '@/pages/Checkout.js';
import Cart from '@/pages/Cart.js';
import ProductDetail from '@/pages/ProductDetail.js';
import ControlPanels from '@/pages/ControlPanels.js';
import OrderTracking from '@/pages/OrderTracking.js';
import Stores from '@/pages/Stores.js';
import StoresMap from '@/pages/StoresMap.js';
import NotFound from '@/pages/NotFound.js';
import "@/styles/global.css"; // يجب أن يعمل بدون أخطاء
import DeliveryDashboard from '@/pages/DeliveryDashboard.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PageTransition>
              <Index />
            </PageTransition>
          }
        />
        <Route
          path="/login"
          element={
            <PageTransition>
              <Auth />
            </PageTransition>
          }
        />
        <Route
          path="/register"
          element={
            <PageTransition>
              <Register />
            </PageTransition>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PageTransition>
              <Dashboard />
            </PageTransition>
          }
        />
        <Route
          path="/store-owner"
          element={
            <PageTransition>
              <StoreOwnerDashboard />
            </PageTransition>
          }
        />
        <Route
          path="/delivery-dashboard"
          element={
            <PageTransition>
              <DeliveryDashboard />
            </PageTransition>
          }
        />
        <Route
          path="/checkout"
          element={
            <PageTransition>
              <Checkout />
            </PageTransition>
          }
        />
        <Route
          path="/cart"
          element={
            <PageTransition>
              <Cart />
            </PageTransition>
          }
        />
        <Route
          path="/product/:id"
          element={
            <PageTransition>
              <ProductDetail />
            </PageTransition>
          }
        />
        <Route
          path="/control-panels"
          element={
            <PageTransition>
              <ControlPanels />
            </PageTransition>
          }
        />
        <Route
          path="/order-tracking"
          element={
            <PageTransition>
              <OrderTracking />
            </PageTransition>
          }
        />
        <Route
          path="/stores"
          element={
            <PageTransition>
              <Stores />
            </PageTransition>
          }
        />
        <Route
          path="/stores-map"
          element={
            <PageTransition>
              <StoresMap />
            </PageTransition>
          }
        />
        <Route
          path="/*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
