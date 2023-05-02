import React, { useEffect, useState } from "react";
import { UseSignIn, UseSignInWithGoogle, UseLogout } from './Auth';

const SplashScreen = ({ handleClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const signIn = UseSignIn(email, password);
  const signInWithGoogle = UseSignInWithGoogle();
  const logout = UseLogout();

  const handleSignInClick = () => {
    setButtonClicked(true);
    signIn();
    setIsAuthenticated(true);
  }

  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    signInWithGoogle();
    setIsAuthenticated(true);
  }

  return (
    <div >
      <h1>Welcome to the AI Map Concierge! 🗺️ </h1>
      <h3>This app allows you to AI-Generate information about any location on the map.</h3>
      <div className='splash-p-tags'>
        <p> - Click on the map to add a marker.</p>
        <p> - Choose a button or type a custom question to generate a response!</p>
        <p> - Mess around with the advanced settings to see what kind of results you can get!</p>

        <div className="button-container">
          {isAuthenticated 
            ? <button onClick={handleClick} className='splash-screen-button'>🗺️ Get Started 🗺️</button> 
            : <p><br /><b><em>*Please sign in to access the app</em></b></p>
          }
        </div>
        
        <br />
        <p><em>* Results may be inaccurate, outdated, offensive, or harmful. </em></p>
        <p><em>* Result data typically works best using locations within the USA or popular cities.</em></p>
      </div>

      <div className="sign-in-wrapper">
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
          <br />
          <button 
            onClick={handleSignInClick} 
            className="sign-in-button"> 
            Sign In / Sign Up 
          </button>
          <button 
            onClick={handleGoogleSignIn} 
            className="sign-in-button"> 
            Sign In With Google 
          </button>
          <button 
            onClick={logout} 
            className="sign-in-button"> 
            Logout 
          </button>
        </form>
      </div>
    </div>
  );
};

export default SplashScreen;
