import Map from './components/Map';
import React from 'react';
import { useSignIn, useSignInWithGoogle, useLogout } from './components/Auth';

function App() {
  return (
    
    <div className='App'>
      <React.Fragment>
        <Map />
        <useSignIn />
        <useSignInWithGoogle />
        <useLogout />
      </React.Fragment>
    </div>
    
  );
}

export default App;
