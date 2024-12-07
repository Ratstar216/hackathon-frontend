import React from 'react';
import { useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { fireAuth } from "./firebase";
import './App.css';
import Signout from './Signout';
import SignupForm from './SignupForm';
import SigninForm from './SigninForm';
import Contents from './Contents';
import Timeline from './Timeline';
import PostForm from './PostForm';

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
      <div>
      <PostForm />
      </div>
      <div className="Timeline">
      <Timeline />
      </div>
    </div>
    
  );
}

export default App;
