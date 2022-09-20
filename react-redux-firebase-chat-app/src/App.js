import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

import ChatPage from './components/ChatPage/ChatPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from 'firebase/app'

import { useDispatch, useSelector } from 'react-redux';
import {
  setUser,
  clearUser
} from './redux/actions/user_action';

function App(props) {
  let firebaseConfig = {
    apiKey: "AIzaSyBZooInpw9dvQ_qg-seazvM-2K3bAfUAV8",
    authDomain: "react-redux-firebase-cha-1a50f.firebaseapp.com",
    databaseURL: "https://react-redux-firebase-cha-1a50f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "react-redux-firebase-cha-1a50f",
    storageBucket: "react-redux-firebase-cha-1a50f.appspot.com",
    messagingSenderId: "967222648992",
    appId: "1:967222648992:web:affe50e93964914ba7e9c5",
    measurementId: "G-GZYPVZLGSX"
  };

  const navigate = useNavigate();
  let dispatch = useDispatch();
  const isLoading = useSelector(state => state.user.isLoading);

  useEffect(() => {
    let app = initializeApp(firebaseConfig);
    let auth = getAuth(app);
    console.log('auth', auth)

    onAuthStateChanged(auth, (user) => {
      console.log('user', user)

      if (user) {
        navigate("/");
        dispatch(setUser(user))

        const uid = user.uid;
      } else {
        navigate("/login");
        dispatch(clearUser())
      }
    });
  }, []);

  if (isLoading) {
    return (
      <div>
        ...loading
      </div>
    )
  } else {
    return (
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    );
  }
}

export default App;
