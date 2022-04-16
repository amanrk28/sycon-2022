import { Toaster } from 'react-hot-toast';
import { AuthProvider } from 'lib/AuthProvider';
import 'styles/globals.css';
import 'styles/register.scss';
import 'styles/auth.scss';
import 'styles/dashboard.scss';
import 'styles/eventhead.scss';
import 'styles/doughnut.scss';
import 'styles/card.scss';

function SyconApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#333333',
            color: '#FFFFFF',
          },
        }}
      />
    </AuthProvider>
  );
}

export default SyconApp;
