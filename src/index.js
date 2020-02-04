import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "./context";
import * as serviceWorker from './serviceWorker';

const firebase = require("firebase");
require("firebase/firestore");
var firebaseConfig = {
    apiKey: "AIzaSyDtdqiFRe5w5im1nQG0zvb-dQRoogAUkjU",
    authDomain: "evernote-46af2.firebaseapp.com",
    databaseURL: "https://evernote-46af2.firebaseio.com",
    projectId: "evernote-46af2",
    storageBucket: "evernote-46af2.appspot.com",
    messagingSenderId: "990068361998",
    appId: "1:990068361998:web:2f8868ca421f89f24d655f",
    measurementId: "G-CBJKCHKZ8J"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


ReactDOM.render(<Provider><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
