import React from 'react';
import { render } from 'react-dom';
import document from 'global/document';
import firebase from 'firebase';

const config = {
  apiKey: 'REPLACE_WITH_API_KEY',
  authDomain: 'REPLACE_WITH_AUTH_DOMAIN',
  databaseURL: 'REPLACE_WITH_DATABASE_URL',
  storageBucket: 'REPLACE_WITH_STORAGE_BUCKET',
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
