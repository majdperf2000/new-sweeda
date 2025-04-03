import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import StoreOwnerDashboard from '@/pages/StoreOwnerDashboard';
import Checkout from '@/pages/Checkout';
import Cart from '@/pages/Cart';
import ProductDetail from '@/pages/ProductDetail';
import ControlPanels from '@/pages/ControlPanels';
import OrderTracking from '@/pages/OrderTracking';
import Stores from '@/pages/Stores';
import StoresMap from '@/pages/StoresMap';
import NotFound from '@/pages/NotFound';
import DeliveryDashboard from '@/pages/DeliveryDashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/login',
    element: <Auth />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/store-owner',
    element: <StoreOwnerDashboard />,
  },
  {
    path: '/delivery-dashboard',
    element: <DeliveryDashboard />,
  },
  {
    path: '/checkout',
    element: <Checkout />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/product/:id',
    element: <ProductDetail />,
  },
  {
    path: '/control-panels',
    element: <ControlPanels />,
  },
  {
    path: '/order-tracking',
    element: <OrderTracking />,
  },
  {
    path: '/stores',
    element: <Stores />,
  },
  {
    path: '/stores-map',
    element: <StoresMap />,
  },
  {
    path: '/*',
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
