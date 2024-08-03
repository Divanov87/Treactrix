import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Dashboard = lazy(() => import('./components/home/dashboard/Dashboard'));

import PWABadge from './PWABadge.jsx'

export default function App() {

  return (
    <>
          <Routes>
          <Route path="/" element={<Dashboard />} />
          </Routes>
      <PWABadge />
    </>
  )
}
