import React from 'react';
import { useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { fireAuth } from "./firebase";
import './App.css';
import Signout from './Signout';
import SignupForm from './SignupForm';
import SigninForm from './SigninForm';
import Contents from './Contents';

function App() {
  const [loginUser, setLoginUser] = useState(fireAuth.currentUser);

  onAuthStateChanged(fireAuth, user => {
    setLoginUser(user);
  });

  return (
    <div className="App">
      <header className="App-header">
       <p>Authentication</p>
      </header>
      <div className="Forms">
      <SignupForm />
      <SigninForm />
      <Signout />
      {loginUser ? <Contents /> : null}
      </div>
    </div>
  );
}

export default App;
