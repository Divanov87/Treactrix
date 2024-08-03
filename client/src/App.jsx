import { Route, Routes } from 'react-router-dom';

import Dashboard from './components/home/dashboard/Dashboard.jsx';
import Footer from "./components/footer/Footer.jsx";

import PWABadge from './PWABadge.jsx'


export default function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
      <Footer />
      <PWABadge />
    </>
  )
}
