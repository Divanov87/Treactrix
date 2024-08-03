import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';

import styles from './Header.module.css';


export default function Header() {

  const { user, isLogged, logout } = useAuth();

  const [isNavbarActive, setNavbarActive] = useState(false);
  const [isHeaderActive, setHeaderActive] = useState(false);

  // isLogged = false;
  //role = 'admin';

  const toggleNavbar = () => {
    setNavbarActive(!isNavbarActive);
    document.body.classList.toggle(styles['active']);
  };

  useEffect(() => {
    const handleScroll = () => {
      setHeaderActive(window.scrollY >= 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`${styles['header']} ${isHeaderActive ? styles['active'] : ''}`} data-header>
      <div className={styles['container']}>
        <div className={`${styles['overlay']} ${isNavbarActive ? styles['active'] : ''}`} data-overlay onClick={toggleNavbar}></div>

        <Link to="/" className={styles['logo']}>
          <img src="/assets/images/theatrix.svg" alt="Theatrix logo" />
        </Link>

        <div className={styles['header-actions']}>
          <div className={styles['lang-wrapper']}>
            <label htmlFor="language">
              <i className='bx bx-globe' style={{ fontSize: '20px' }}></i>
            </label>
            <select name="language" id="language">
              <option value="en">EN</option>
              <option value="bg">BG</option>
            </select>
          </div>

          {!isLogged && (
            <Link to="/auth/register" className={styles['navbar-link']}>
              <button className={`${styles['btn']} ${styles['btn-primary']}`}>Sign in</button>
            </Link>
          )}
        </div>

        <button className={styles['menu-open-btn']} onClick={toggleNavbar} data-menu-open-btn>
          <i className='bx bxs-coupon icon1'></i><i className='bx bxs-coupon vs icon2'></i>
        </button>

        <nav className={`${styles['navbar']} ${isNavbarActive ? styles['active'] : ''}`} data-navbar>
          <div className={styles['navbar-top']}>
            <Link to="/" className={styles['logo']}>
              <img src="/assets/images/theatrix.svg" alt="Theatrix logo" />
            </Link>

            <button className={styles['menu-close-btn']} onClick={toggleNavbar} data-menu-close-btn>
              <i className='bx bx-x'></i>
            </button>
          </div>

          <ul className={styles['navbar-list']}>
            <li>
              <Link to="/" className={styles['navbar-link']}>Home</Link>
            </li>

            <li className={styles['dropdown']}>
              <button className={styles['dropbtn']}>
                <Link to="/events/" className={styles['navbar-link']}>Events <i className='bx bxs-chevron-down'></i></Link>
              </button>
              <div className={styles['dropdown-content']}>
                <Link to="/events/theater" className={styles['navbar-link']}>Theater</Link>
                <Link to="/events/concerts" className={styles['navbar-link']}>Concerts</Link>
              </div>
            </li>

            {isLogged && (
              <>
                <li>
                  <Link to="/search" className={styles['navbar-link']}>Search</Link>
                </li>

                {user?.role === 'user' && (
                  <li>
                    <Link to="/profile" className={styles['navbar-link']}>Profile</Link>
                  </li>
                )}

                {user?.role === 'admin' && (
                  <>
                    <li>
                      <Link to="/users" className={styles['navbar-link']}>Users</Link>
                    </li>
                    <li>
                      <Link to="/events/add" className={styles['navbar-link']}>Add Event</Link>
                    </li>
                  </>
                )}

                <li>
                  <a onClick={ logout } style={{ cursor: 'pointer' }} className={styles['navbar-link']}>Logout</a>
                </li>
              </>
            )}

            {!isLogged && (
              <>
                <li>
                  <Link to="/auth/register" className={styles['navbar-link']}>Register</Link>
                </li>
                <li>
                  <Link to="/auth/login" className={styles['navbar-link']}>Login</Link>
                </li>
              </>
            )}

            <li>
              <Link to="/contacts" className={styles['navbar-link']}>Contacts</Link>
            </li>
            <li>
              <Link to="/about" className={styles['navbar-link']}>About</Link>
            </li>
          </ul>

          <ul className={styles['navbar-social-list']}>
            <li>
              <Link to="/" className={styles['navbar-social-link']}>
                <i className='bx bxl-facebook-circle'></i>
              </Link>
            </li>

            <li>
              <Link to="/" className={styles['navbar-social-link']}>
                <i className='bx bxl-instagram-alt'></i>
              </Link>
            </li>

            <li>
              <Link to="#" className={styles['navbar-social-link']}>
                <i className='bx bxl-youtube'></i>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
