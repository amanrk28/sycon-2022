import type { AppProps } from 'next/app';
import { AuthProvider } from '../lib/AuthProvider';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';

const toastOptions = {
  duration: 4000,
  style: {
    background: '#333333',
    color: '#FFFFFF',
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <Toaster position="top-center" toastOptions={toastOptions} />
    </AuthProvider>
  );
}

export default MyApp;
