import styles from './PWABanner.module.css';
import usePWABanner from './usePWABanner';

export default function PWABanner() {
  const { isActive, addToHomeScreen, closeBlockInstall } = usePWABanner();

  return (
    <>
      {isActive && (
        <div className={styles['blockInstall']} id="BlockInstall">
          <div className={styles['inner']}>
            <div className={styles['close']} id="BlockInstallClose" onClick={closeBlockInstall}>
              <span>
                <i className="bx bx-x" style={{ fontSize: '38px' }}></i>
              </span>
            </div>
            <div className={styles['logo']}>
              <img src="/assets/pwa/favicon-196.png" alt="PWA Icon"  style={{ borderRadius: '30%' }} />
            </div>
            <div className={styles['name']}>
              <span className={styles['title']}>Theatrix.com</span>
              <span className={styles['description']}>Theater & Concerts</span>
            </div>
            <div className={styles['cta']}>
              <button id="install-btn" className={styles['btn']} onClick={addToHomeScreen}>
                Install
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
