import { Link } from 'react-router-dom';
import styles from './NotFound.module.css'; 

export default function NotFound() {
  return (
    <article>
      <section
        className={styles['top-rated']}
        style={{ background: "url('/assets/images/banner-details-404.jpg') no-repeat" }}
      >
        <div className={styles.container}>
          <p className={styles['section-subtitle']}>WoW</p>
          <h2 className={`${styles.h2} ${styles['section-title']}`}>
            How, did you get <strong>here ?</strong>
          </h2>
          <ul className={`${styles['movies-list']} ${styles['list-404']}`}>
            <li>
              <div className={styles['movie-card']}>
                <a href="#">
                  <figure className={styles['card-banner']}>
                    <img src="/assets/images/404/__4.jpg" alt="" />
                  </figure>
                </a>
              </div>
            </li>
            <li>
              <div className={styles['movie-card']}>
                <a href="#">
                  <figure className={styles['card-banner']}>
                    <img src="/assets/images/404/_0.jpg" alt="" />
                  </figure>
                </a>
              </div>
            </li>
            <li>
              <div className={styles['movie-card']}>
                <a href="#">
                  <figure className={styles['card-banner']}>
                    <img src="/assets/images/404/_4.jpg" alt="" />
                  </figure>
                </a>
              </div>
            </li>
          </ul>
          <div className={styles['details-actions']}>
          <Link to="/">
            <button className={styles['btn-404']}>
              BACK
            </button>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
