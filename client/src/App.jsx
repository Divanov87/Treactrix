import { Route, Routes } from 'react-router-dom';

import Dashboard from './components/home/dashboard/Dashboard.jsx';
import Footer from "./components/footer/Footer.jsx";
import { AuthProvider } from './context/AuthContext.jsx';
import PWABadge from './PWABadge.jsx'



import PWABanner  from './components/pwa-banner/PWABanner.jsx';


import Header from "./components/header/Header.jsx";

export default function App() {

  return (
    <>
        <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
      <Footer />
      <PWABadge />
      <PWABanner/>
      </AuthProvider>
    </>
  )
}
