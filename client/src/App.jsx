import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';




import Dashboard from './components/home/dashboard/Dashboard.jsx';
import ScrollToTop from './components/scroll-to-top/ScrolToTop';
import Footer from "./components/footer/Footer.jsx";
import { AuthProvider } from './context/AuthContext.jsx';
import PWABadge from './PWABadge.jsx'


import PWABanner  from './components/pwa-banner/PWABanner.jsx';


import Header from "./components/header/Header.jsx";

import Register from './components/auth/register/Register';
import Login from "./components/auth/login/Login.jsx";

import NotFound from "./components/not-found/NotFound.jsx";


export default function App() {

  return (
    <>
        <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/404" element={<NotFound />} />
        <Route path='*' element={<Navigate to={'/404'} />} />
      </Routes>
      <PWABanner/>
      <PWABadge />
      <ScrollToTop/>
      <Footer />
      </AuthProvider>
    </>
  )
}
