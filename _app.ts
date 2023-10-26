import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react'; // Anda perlu mengimpor useState

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isClick, setIsClick] = useState(false); // Definisi isClick di sini

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  const handleRouteChange = () => {
    // Reset nilai isClick saat berpindah halaman
    setIsClick(false);
    document.body.classList.remove('no-scroll');
  };

  return <Component {...pageProps} />;
}

export default MyApp;
