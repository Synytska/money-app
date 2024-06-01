import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider } from 'firebase/auth';

export const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: 'moneyapp-32b1b.firebaseapp.com',
    projectId: 'moneyapp-32b1b',
    storageBucket: 'moneyapp-32b1b.appspot.com',
    messagingSenderId: '205708831194',
    appId: '1:205708831194:web:9e8b2affb4b61d273b78e3'
};

export const app = initializeApp(firebaseConfig);

export const googleAuthProvider = new GoogleAuthProvider();

