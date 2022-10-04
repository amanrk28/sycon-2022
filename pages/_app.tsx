import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import 'antd/dist/antd.css';
import { AuthProvider } from 'lib/AuthProvider';
import 'styles/globals.css';
import 'styles/eventhead.scss';
import 'styles/doughnut.scss';
import 'styles/card.scss';
import 'styles/antd.scss';

function SyconApp({ Component, pageProps }: AppProps) {
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
