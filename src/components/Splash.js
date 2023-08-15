import React, { useState } from "react";
import {
  UseSignIn,
  UseSignInWithGoogle,
  UseSignUp,
  UseLogout,
  useAuthentication,
} from "./Auth";
import "../styles/SplashScreen.css";

const SplashScreen = ({ handleClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const { isAuthenticated, user } = useAuthentication();
  const signIn = UseSignIn(email, password);
  const signUp = UseSignUp(email, password);
  const signInWithGoogle = UseSignInWithGoogle();
  const logout = UseLogout();

  const handleSignInClick = async (e) => {
    e.preventDefault();
    setButtonClicked(true);
    await signIn();
    setEmail("");
    setPassword("");
  };

  const handleSignUpClick = async (e) => {
    e.preventDefault();
    setButtonClicked(true);
    await signUp();
    setEmail("");
    setPassword("");
  };

  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    signInWithGoogle();
  };

  return (
    <div>
      <h1>🤖 AI Map Helper 🗺️</h1>
      <h3>Learn about places using AI!</h3>
      <div className="splash-p-tags">
        <p>📍 Click or type to mark an address.</p>
        <p>🔍 Ask a question - or pick one we suggest.</p>
        <p>🎲 Adjust how the AI answers for fun results!</p>
        <p>❌ Double click a spot to remove it.</p>
        <div className="button-container">
          {isAuthenticated ? (
            <button onClick={handleClick} className="splash-screen-button">
              🗺️ Get Started 🗺️
            </button>
          ) : (
            <p>
              <b>
                <em>*Please sign in to access the app</em>
              </b>
            </p>
          )}
        </div>
      </div>

      <hr className="separator-line" />

      <div className="sign-in-wrapper">
        {isAuthenticated ? (
          <p>
            Signed in as: <em>{user?.email}</em>
          </p>
        ) : (
          <form>
            <input
              required={buttonClicked}
              className="sign-in-input"
              placeholder="Email..."
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              required={buttonClicked}
              className="sign-in-input"
              placeholder="Password..."
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignInClick} className="sign-in-button">
              🔑 Sign In 🔑
            </button>
            <button onClick={handleSignUpClick} className="sign-in-button">
              Sign Up
            </button>
            <button onClick={handleGoogleSignIn} className="sign-in-button">
              Sign In With Google
            </button>
          </form>
        )}
        {isAuthenticated && (
          <button onClick={logout} className="sign-in-button">
            🚪 Logout 🚪
          </button>
        )}
      </div>

      <br />
      <p className="notice-message">
        <em>* Results may be inaccurate, outdated, offensive, or harmful. </em>
      </p>
      <p className="notice-message">
        <em>
          * Result data is most accurate using locations within the USA or major
          cities.
        </em>
      </p>
      <p className="copyright"> © 2023 Noah Atkinson </p>
    </div>
  );
};

export default SplashScreen;
