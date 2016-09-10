import React from 'react';
import { render } from 'react-dom';
import document from 'global/document';
import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyADbDoOv6ZIBdevZNCZHZrPyANad9oPkMU',
  authDomain: 'nano-budget-bf31f.firebaseapp.com',
  databaseURL: 'https://nano-budget-bf31f.firebaseio.com/',
  storageBucket: 'nano-budget-bf31f.appspot.com',
};

firebase.initializeApp(config);
const provider = new firebase.auth.FacebookAuthProvider();
provider.addScope('public_profile');
provider.addScope('user_friends');


const onClick = () => {
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      // const token = result.credential.accessToken;
      // The signed-in user info.
      // const user = result.user;
      console.log('result:', result);
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
      console.error(errorCode, errorMessage, email, credential);
    });
};

const App = () => <h1 onClick={onClick}>Frontend Only!</h1>;

const div = document.getElementById('app');

render(<App />, div);
