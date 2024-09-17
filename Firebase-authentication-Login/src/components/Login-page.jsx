import React, { useState, useEffect } from 'react';
import { auth, googleProvider, githubProvider, facebookProvider } from '../config/FireBase';
import { signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


const LoginForm = () => {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
      return () => {
        unsubscribe();
      };
    }, []);
  
    const handleGoogleLogin = async () => {
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (error) {
        console.error('Error during Google sign-in:', error);
      }
    };
  
    const handleGithubLogin = async () => {
      try {
        await signInWithPopup(auth, githubProvider);
      } catch (error) {
        console.error('Error during GitHub sign-in:', error);
      }
    };
  
    const handleFacebookLogin = async () => {
      try {
        await signInWithPopup(auth, facebookProvider);
      } catch (error) {
        console.error('Error during Facebook sign-in:', error);
      }
    };
  
    const handleLogout = async () => {
      try {
        await signOut(auth);
        setUser(null);
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };
  
    const handleSignIn = async () => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        console.error('Error during sign-in:', error);
      }
    };
  
    const handleRegister = async () => {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Registration successful! You can now log in.');
        setIsRegistering(false); // Switch back to login mode after successful registration
      } catch (error) {
        console.error('Error during registration:', error);
        alert('Registration failed. Please try again.');
      }
    };
  
    return (
      <div className="wrapper">
        {user ? (
          <div className="user-info">
            <h2>Welcome, {user.displayName || user.email}</h2>
            <p>Email: {user.email}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <>
            <h1>{isRegistering ? 'Register' : 'Your Company'}</h1>
            <p>{isRegistering ? 'Create an account to get started' : "Welcome back, you've been missed!"}</p>
            <form>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </form>
            <button onClick={isRegistering ? handleRegister : handleSignIn}>
              {isRegistering ? 'Register' : 'Sign in'}
            </button>
            {!isRegistering && (
              <>
                <p className="or">----- or continue with -----</p>
                <div className="icons">
                  <i className="fab fa-google" onClick={handleGoogleLogin}></i>
                  <i className="fab fa-github" onClick={handleGithubLogin}></i>
                  <i className="fab fa-facebook" onClick={handleFacebookLogin}></i>
                </div>
              </>
            )}
            <div className="not-member">
              {isRegistering ? (
                <>
                  Already a member?{' '}
                  <a href="#" onClick={() => setIsRegistering(false)}>
                    Log In
                  </a>
                </>
              ) : (
                <>
                  Not a member?{' '}
                  <a href="#" onClick={() => setIsRegistering(true)}>
                    Register Now
                  </a>
                </>
              )}
            </div>
          </>
        )}
      </div>
    );
  };

export default LoginForm;
