import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { SearchProvider } from './context/SearchContext.jsx';



import Search from './components/home/search/Search.jsx';
import Dashboard from './components/home/dashboard/Dashboard.jsx';
import ScrollToTop from './components/scroll-to-top/ScrolToTop';
import Footer from "./components/footer/Footer.jsx";

import PWABadge from './PWABadge.jsx'


import PWABanner from './components/pwa-banner/PWABanner.jsx';


import Header from "./components/header/Header.jsx";

const Register = lazy(() => import('./components/auth/register/Register'));
const Login = lazy(() => import('./components/auth/login/Login'));

import NotFound from "./components/not-found/NotFound.jsx";

export default function App() {

  return (
    <>
      <AuthProvider>
        <SearchProvider>
          <Header />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/404" element={<NotFound />} />
              <Route path='*' element={<Navigate to={'/404'} />} />


              <Route path="/search" element={<Search />} />




            </Routes>
          </Suspense>
          <PWABanner />
          <PWABadge />
          <ScrollToTop />
          <Footer />
        </SearchProvider>
      </AuthProvider>
    </>
  )
}
