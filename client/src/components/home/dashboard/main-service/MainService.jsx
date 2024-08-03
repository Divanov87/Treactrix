import styles from './MainService.module.css';

export default function MainService() {
  return (
    <section className={styles['service']}>
      <div className={styles['container']}>
        <div className={styles['service-banner']}>
          <figure>
            <img src="/assets/images/banner.jpg" alt="" />
          </figure>
        </div>
        <div className={styles['service-content']}>
          <p className={styles['service-subtitle']}>Our 3-steps to paradise:</p>
          <h2 className={`h2 ${styles['service-title']}`}>
            Discover <strong>thousands</strong> of performances and <strong>events</strong>
          </h2>
          <p className={styles['service-text']}>
            Embark on a journey of endless entertainment as you explore and discover thousands of captivating
            performances and events on our website!
          </p>
          <ul className={styles['service-list']}>
            <li>
              <div className={styles['service-card']}>
                <div className={styles['card-icon']}>
                  <i className='bx bxs-coupon'></i>
                </div>
                <div className={styles['card-content']}>
                  <h3 className={`h3 ${styles['card-title']}`}>2. GET YOUR TICKETS</h3>
                  <p className={styles['card-text']}>
                    Secure your front-row seat to unforgettable moments - buy tickets now and be part of the
                    excitement with thousands of upcoming performances and events!
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className={styles['service-card']}>
                <div className={styles['card-icon']}>
                  <i className='bx bx-donate-heart'></i>
                </div>
                <div className={styles['card-content']}>
                  <h3 className={`h3 ${styles['card-title']}`}>3. ENJOY</h3>
                  <p className={styles['card-text']}>
                    Sit back, relax, and enjoy the spectacular performances and events unfold before you,
                    creating moments of pure delight and unforgettable memories.
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
