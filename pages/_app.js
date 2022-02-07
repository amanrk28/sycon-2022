import { AuthProvider } from 'lib/AuthProvider';
import { Toaster } from 'react-hot-toast';
import 'styles/globals.css';
import 'styles/register.scss';
import 'styles/auth.scss';

const toastOptions = {
  duration: 4000,
  style: {
    background: '#333333',
    color: '#FFFFFF',
  },
};

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <Toaster position="top-center" toastOptions={toastOptions} />
    </AuthProvider>
  );
}

export default MyApp;