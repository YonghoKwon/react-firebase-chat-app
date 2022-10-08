import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
} from "react-router-dom";

import {Provider} from "mobx-react";
import UserStore from "./store/userStore";
import ChatRoomStore from "./store/chatRoomStore";

const userStore = new UserStore();
const chatRoomStore = new ChatRoomStore();

ReactDOM.render(
  // <React.StrictMode>
    <Provider
      userStore={userStore}
      chatRoomStore={chatRoomStore}
    >
      <Router >
        <App />
      </Router>
    </Provider>
  // </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorker.unregister();
