import React, { useEffect } from 'react';
import './App.css';
import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";

import ChatPage from './components/ChatPage/ChatPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';

import firebase from './firebase';

import {observer} from "mobx-react";
import UserStore from "./store/userStore";

const userStore = new UserStore();

const App = () => {
  let history = useHistory();
  const isLoading = userStore.user.isLoading;
  console.log('isLoading', isLoading);
  console.log('userStore.user.isLoading', userStore.user.isLoading);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      console.log('user', user)
      //로그인이 된 상태
      if (user) {
        history.push("/");
        userStore.setUser(user);
        console.log('userStore', userStore);
        console.log('userStore', userStore.user);
        console.log('userStore', userStore.user.currentUser);
        console.log('isLoading', isLoading);
        console.log('userStore.user.isLoading', userStore.user.isLoading);
      } else {
        history.push("/login");
      }
    })
  }, [])

  if (userStore.user.isLoading) {
    return (
      <div>
        ...loading
      </div>
    )
  } else {
    return (
      <Switch>
        <Route exact path="/" component={ChatPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
      </Switch>
    );
  }
}

export default observer(App);
