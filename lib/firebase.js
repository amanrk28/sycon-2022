import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

let firebaseConfig = {
  apiKey: 'AIzaSyDWK8PyguzLboyiOoda8zDiTlNxDN2oJEI',
  authDomain: 'sycon2022-46644.firebaseapp.com',
  projectId: 'sycon2022-46644',
  storageBucket: 'sycon2022-46644.appspot.com',
  messagingSenderId: '465550748188',
  appId: '1:465550748188:web:152f410a4eb11d05d18dd9',
  measurementId: 'G-GWP0V3RSBH',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const functions = getFunctions(app);

connectAuthEmulator(auth, 'http://localhost:9099');
connectFirestoreEmulator(firestore, 'localhost', 8080);
connectFunctionsEmulator(functions, 'localhost', 5001);

export { auth, firestore, functions };
