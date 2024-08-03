import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function usePWABanner() {

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      if (!Cookies.get('pwa')) {
        setIsActive(true);
      }
      window.promptEvent = event;
    });

    const checkScrollPosition = () => {
      const platform = navigator.userAgent.toUpperCase();
      if (!/ANDROID|IOS/.test(platform)) {
        setIsActive(false);
        return;
      }
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      setIsActive(scrollPercent >= 20 && !Cookies.get('pwa'));
    };

    window.addEventListener('scroll', checkScrollPosition);

    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, []);

  const addToHomeScreen = () => {
    window.promptEvent.prompt();
    window.promptEvent.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      window.promptEvent = null;
    });

    Cookies.set('pwa', 'true',  { expires: 400, path: '/', secure: false, sameSite: 'Lax'  });
    setIsActive(false);
  };

  const closeBlockInstall = () => setIsActive(false);


  return {
    isActive,
    addToHomeScreen,
    closeBlockInstall,
  };
};
