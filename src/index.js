import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database'; 


const firebaseConfig = {
  // Your Firebase configuration
  apiKey: "AIzaSyAFI_dC9mgKh3yt67Xre8GZmCc1LQRaXfY",
  authDomain: "mories-cb12d.firebaseapp.com",
  projectId: "mories-cb12d",
  storageBucket: "mories-cb12d.appspot.com",
  messagingSenderId: "865954701761",
  appId: "1:865954701761:web:f50a21d9982918006bcf40",
  measurementId: "G-R85PDW8T0M",
  databaseURL: 'https://mories-cb12d-default-rtdb.asia-southeast1.firebasedatabase.app/', // Ensure this points to your Firebase Realtime Database URL
};

firebase.initializeApp(firebaseConfig);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <BrowserRouter>
      <App />
    </BrowserRouter>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
