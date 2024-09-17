import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from 'firebase/auth';

// Your Firebase configuration object (Replace with your own Firebase credentials)
const firebaseConfig = {
    apiKey: "AIzaSyDlc7RjTJIMVJe4O8sMHd55U_9aLlZHiOc",
    authDomain: "login-autho-vi.firebaseapp.com",
    projectId: "login-autho-vi",
    storageBucket: "login-autho-vi.appspot.com",
    messagingSenderId: "161578439001",
    appId: "1:161578439001:web:c8cc4bfb26721b7679fc48"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Providers for different sign-in methods
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
