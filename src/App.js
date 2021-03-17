import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';
firebase.initializeApp(firebaseConfig);

function App() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const [user, setUser] = useState({
    isSignedIn : false,
    name : '',
    email : '',
    password: '',
    photo : ''
  })
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, email, photoURL} = res.user;
      const signedInUser = {
        isSignedIn : true,
        name : displayName,
        email : email,
        photo : photoURL
      }
      setUser(signedInUser);
      console.log(res);
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
  }
  const handleSignOut = () => {
    firebase.auth().signOut()
    .then(res => {
      const signedOutUser = {
        isSignedIn : false,
        name: '',
        email: '',
        photo: ''
      }
      setUser(signedOutUser);
    })
    .catch(err => {
      console.log(err);
    })
    console.log('signOut Clicked');
  }
  const handleSubmit = () => {

  }
  const handleBlur = (event) => {
    // console.log(event.target.name, event.target.value);
    let isFormValid = true;
    if (event.target.name === 'email') {
      const isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFormValid = isPasswordValid && passwordHasNumber;
    }
    if (isFormValid) {
      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }
  return (
    <div className="App">
      {
        user.isSignedIn ? <button onClick = {handleSignOut}>Sign out</button> : <button onClick = {handleSignIn}>Sign in</button>
      }
      {
        user.isSignedIn &&
        <div>
          <p>Welcome {user.name}</p>
          <p>email : {user.email}</p>
          <img src={user.photo} alt="profile"/>
        </div>
      }
      <h1>Our own Authentication</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" onBlur={handleBlur} name="email" required/><br/>
        <input type="password" onBlur={handleBlur} name="password" required/><br/>
        <input type="submit" value="submit"/>
      </form>
    </div>
  );
}

export default App;
