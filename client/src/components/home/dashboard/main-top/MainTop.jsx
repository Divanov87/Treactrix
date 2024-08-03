import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../../../context/AuthContext';

import styles from './MainTop.module.css';




export default function MainTop() {
  // const isLogged = true;
  // const username = 'JohnDoe';

  const { user, isLogged } = useAuth();

  const navigate = useNavigate();

  const searchSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.name.value.trim();
    navigate(`/search?name=${searchValue}`);
  };

  return (
    <>
      <section className={styles['hero']}>
        <div className={styles['container']}>
          <div className={styles['hero-content']}>
            {isLogged ? (
              <p className={styles['hero-subtitle']}>
                Welcome, <b style={{ color: 'white', textTransform: 'capitalize' }}>{user?.username}</b>!
              </p>
            ) : (
              <p className={styles['hero-subtitle']}>Theatrix</p>
            )}

            <h1 className={`${styles['h1']} ${styles['hero-title']}`}>
              Discover <strong>Events</strong>, Buy <strong>Tickets</strong>, & More.
            </h1>

            <div className={styles['meta-wrapper']}>
              <div className={styles['badge-wrapper']}>
                <div className={`${styles['badge']} ${styles['badge-fill']}`}>VISA</div>
                <div className={`${styles['badge']} ${styles['badge-outline']}`}>EU</div>
              </div>

              <div className={styles['ganre-wrapper']}>
                <i className="bx bxs-map"></i>
                <Link to="/search?location=varna">Varna</Link> |
                <Link to="/search?location=bourgas">Bourgas</Link> |
                <Link to="/search?location=plovdiv">Plovdiv</Link> |
                <Link to="/search?location=sofia">Sofia</Link> |
                <Link to="/search?location=london">London</Link>
              </div>
            </div>

            <Link to="/events" className={styles['navbar-link']}>
              <button className={`${styles['btn']} ${styles['btn-primary']}`}>
                <i className="bx bx-search"></i>
                Browse now
              </button>
            </Link>

            <br />

            <form className={styles['src']} onSubmit={searchSubmit}>
              <input type="text" id={`${styles['search-input']}`} name="name" placeholder="Search..." />
              <button type="submit" className={`${styles['search-btn']} ${styles['vertical']}`}>
                &nbsp;&nbsp;<i className="bx bx-search"></i>
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
