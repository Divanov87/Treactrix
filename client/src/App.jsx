import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { SearchProvider } from './context/SearchContext.jsx';

import EventEdit from './components/events/event-edit/EventEdit.jsx';


import AuthGuard from './guards/AuthGuard.jsx';


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
import EventCatalog from './components/events/event-catalog/EventCatalog.jsx';
import EventTheater from './components/events/event-theater/EventTheater.jsx';
import EventConcerts from './components/events/event-concerts/EventConcerts.jsx';
import EventAdd from './components/events/event-add/EventAdd.jsx';
import EventDetails from './components/events/event-details/EventDetails.jsx';
import Users from './components/home/users/Users.jsx';
import Profile from './components/home/profile/Profile.jsx';

export default function App() {

  return (
    <>
      <AuthProvider>
        <SearchProvider>
          <Header />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/events" element={<EventCatalog />} />
              <Route path="/events/add" element={<EventAdd />} />
              <Route path="/events/theater" element={<EventTheater />} />
              <Route path="/events/concerts" element={<EventConcerts />} />
              <Route path="/events/:eventId/details" element={<EventDetails />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/404" element={<NotFound />} />
              <Route path='*' element={<Navigate to={'/404'} />} />


              <Route element={<AuthGuard />}>
                <Route path="/search" element={<Search />} />
              </Route>

              <Route path="/events/:id/edit" element={<EventEdit />} />


              <Route path="/profile" element={<Profile />} />


              <Route path="/users" element={<Users />} />


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
