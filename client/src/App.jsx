import { Suspense, lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext.jsx';
import { SearchProvider } from './context/SearchContext.jsx';

import AuthGuard from './guards/AuthGuard.jsx';
import AuthUser from './guards/AuthUser.jsx';
import AuthAdmin from './guards/AuthAdmin.jsx';

import Header from "./components/header/Header.jsx";
import Dashboard from './components/home/dashboard/Dashboard';

const EventCatalog = lazy(() => import('./components/events/event-catalog/EventCatalog'));
const EventTheater = lazy(() => import('./components/events/event-theater/EventTheater'));
const EventConcerts = lazy(() => import('./components/events/event-concerts/EventConcerts'));
const EventDetails = lazy(() => import('./components/events/event-details/EventDetails'));
const EventAdd = lazy(() => import('./components/events/event-add/EventAdd'));
const EventEdit = lazy(() => import('./components/events/event-edit/EventEdit'));

const NotFound = lazy(() => import('./components/not-found/NotFound'));

const Register = lazy(() => import('./components/auth/register/Register'));
const Login = lazy(() => import('./components/auth/login/Login'));

const Search = lazy(() => import('./components/home/search/Search'));
const Profile = lazy(() => import('./components/home/profile/Profile'));
const Users = lazy(() => import('./components/home/users/Users'));
const Contacts = lazy(() => import('./components/home/contacts/Contacts'));
const About = lazy(() => import('./components/home/about/About')); //TODO

import PWABanner  from './components/pwa-banner/PWABanner.jsx';
import PWABadge from './PWABadge.jsx'
import ScrollToTop from './components/scroll-to-top/ScrolToTop';
import Footer from "./components/footer/Footer.jsx";


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
          <Route path="/events/theater" element={<EventTheater />} />
          <Route path="/events/concerts" element={<EventConcerts />} />
          <Route path="/events/:eventId/details" element={<EventDetails />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/contacts" element={<Contacts />} />
           <Route path="/about" element={<About />} />
          <Route path="/404" element={<NotFound />} />
          <Route path='*' element={<Navigate to={'/404'} />} />

          <Route element={<AuthGuard />}>
          <Route path="/search" element={<Search />} />
          </Route>

          <Route element={<AuthUser />}>
          <Route path="/profile" element={<Profile />} />
          </Route>

          <Route element={<AuthAdmin />}>
          <Route path="/users" element={<Users />} />
          <Route path="/events/add" element={<EventAdd />} />
          <Route path="/events/:id/edit" element={<EventEdit />} />
          </Route>

          </Routes>
        </Suspense>
        <PWABanner/>
      <PWABadge />
      <ScrollToTop/>
      <Footer />
      </SearchProvider>
      </AuthProvider>
    </>
  )
}
