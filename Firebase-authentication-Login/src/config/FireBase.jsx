import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from 'firebase/auth';

// Your Firebase configuration object (Replace with your own Firebase credentials)
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIRE_BASE_API_KEY,
    authDomain: "login-autho-vi.firebaseapp.com",
    projectId: "login-autho-vi",
    storageBucket: "login-autho-vi.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIRE_BASEMESSAGINHG_SENDER_ID,
    appId: import.meta.env.VITE_FIRE_BASE_APP_ID
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Providers for different sign-in methods
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
