import React, {useEffect} from 'react';
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
import useStores from "./hooks/useStores";

const App = (props) => {
  const { userStore } = useStores();
  let history = useHistory();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      // console.log('user : ' + JSON.stringify(user));
      // console.log('isLoading : ' + JSON.stringify(userStore.user.isLoading));

      if (user) {
        // console.log('user if : ' + JSON.stringify(user));
        history.push("/");
        userStore.setUser(user);
        // console.log('userStore : ' + JSON.stringify(userStore.user));
      } else {
        // console.log('user else : ' + JSON.stringify(user));
        history.push("/login");
        userStore.clearUser();
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
      // <Provider userStore={userStore}>
        <Switch>
          <Route exact path="/" component={ChatPage}/>
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/register" component={RegisterPage}/>
        </Switch>
      // </Provider>
    );
  }
}

export default observer(App);
