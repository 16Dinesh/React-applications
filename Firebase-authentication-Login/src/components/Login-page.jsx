import React, { useCallback, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

import { useEffect } from "react";
import {
  auth,
  googleProvider,
  githubProvider,
  facebookProvider,
} from "../config/FireBase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const LoginForm = () => {
  const [init, setInit] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#5B864D",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 150,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#f6f6f6",
        },
        links: {
          color: "#ffffff",
          distance: 200,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "top",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: true,
          speed: 5,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 50,
        },
        opacity: {
          value: 2,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 8 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  // const particlesOptions = {
  //   particles: {
  //     number: { value: 80 },
  //     color: { value: "#f6f6f6" },
  //     shape: { type: "circle" },
  //     size: { value: 3 },
  //     move: { enable: true, speed: 6 }
  //   },
  // };

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
      console.error("Error during Google sign-in:", error);
    }
  };

  const handleGithubLogin = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
    } catch (error) {
      console.error("Error during GitHub sign-in:", error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
    } catch (error) {
      console.error("Error during Facebook sign-in:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration successful! You can now log in.");
      setIsRegistering(false);
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
      <div className="wrapper">
        {user ? (
          <div className="user-info">
            <h2>Welcome, {user.displayName || user.email}</h2>
            <p>Email: {user.email}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <>
            <h1>{isRegistering ? "Register" : "Your Company"}</h1>
            <p>
              {isRegistering
                ? "Create an account to get started"
                : "Welcome back, you've been missed!"}
            </p>
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
              {isRegistering ? "Register" : "Sign in"}
            </button>
            {!isRegistering && (
              <>
                <p className="or">----- or continue with -----</p>
                <div className="icons">
                  <i className="fab fa-google" onClick={handleGoogleLogin}></i>
                  <i className="fab fa-github" onClick={handleGithubLogin}></i>
                  <i
                    className="fab fa-facebook"
                    onClick={handleFacebookLogin}
                  ></i>
                </div>
              </>
            )}
            <div className="not-member">
              {isRegistering ? (
                <>
                  Already a member?{" "}
                  <a href="#" onClick={() => setIsRegistering(false)}>
                    Log In
                  </a>
                </>
              ) : (
                <>
                  Not a member?{" "}
                  <a href="#" onClick={() => setIsRegistering(true)}>
                    Register Now
                  </a>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
