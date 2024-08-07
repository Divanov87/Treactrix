import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import CTAForm from './cta-form/CTAForm';

import styles from './Footer.module.css';

export default function Footer() {
  const [isGoTopActive, setGoTopActive] = useState(false);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setGoTopActive(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <footer className={styles['footer']}>
        
        <CTAForm />

        <div className={styles['footer-top']}>
          <div className={styles['container']}>
            <div className={styles['footer-brand-wrapper']}>
              <Link to="/" className={styles['logo']}>
                <img src="/assets/images/theatrix-footer.svg" alt="Theatrix logo" />
              </Link>

              <ul className={styles['footer-list']}>
                <li>
                  <Link to="/events/theater" className={styles['navbar-link']}>Theater</Link>
                </li>
                <li>
                  <Link to="/events/concerts" className={styles['navbar-link']}>Concerts</Link>
                </li>
                <li>
                  <Link to="/contacts" className={styles['navbar-link']}>Contacts</Link>
                </li>
                <li>
                  <Link to="/about" className={styles['navbar-link']}>About</Link>
                </li>
              </ul>
            </div>

            <div className={styles['divider']}></div>

            <div className={styles['quicklink-wrapper']}>
              <ul className={styles['quicklink-list']}>
              <li>
                  <Link to="/" className={styles['quicklink-link']}>Faq</Link>
                </li>
                <li>
                  <Link to="/" className={styles['quicklink-link']}>Help center</Link>
                </li>
                <li>
                  <Link to="/" className={styles['quicklink-link']}>Terms of use</Link>
                </li>
                <li>
                  <Link to="/" className={styles['quicklink-link']}>Privacy</Link>
                </li>
              </ul>

              <ul className={styles['social-list']}>
                <li>
                  <Link to="https://fb.com/theatrix" className={styles['navbar-social-link']}>
                    <i className='bx bxl-facebook-circle'></i>
                    </Link>
                </li>
                <li>
                  <Link to="https://instagram.com/theatrix" className={styles['navbar-social-link']}>
                    <i className='bx bxl-instagram-alt'></i>
                    </Link>
                </li>
                <li>
                  <Link to="https://youtube.com/theatrix" className={styles['navbar-social-link']}>
                    <i className='bx bxl-youtube'></i>
                    </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles['footer-bottom']}>
          <div className={styles['container']}>
            <p className={styles['copyright']}>
              &copy; 2024. A <strong>Dimitar.Ivanov87</strong> @ SoftUni, Project. All Rights Reserved
            </p>
          </div>
        </div>
      </footer>

      <a
        href="#top"
        className={`${styles['go-top']} ${isGoTopActive ? styles['active'] : ''}`}
        onClick={scrollTop}
      >
        <i className="bx bxs-chevron-up"></i>
      </a>
    </>
  );
}
