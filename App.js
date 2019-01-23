import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Provider } from 'mobx-react';
import store from './src/store';
import App from './src/navigation';
import { FIREBASE_CONFIG, firebaseLogout } from './src/firebase-api/Firebase_Api';
import A from './src/messages';
import Message from './src/messages/body/';
import Firefox from './assets/svg/Firefox';

class Main extends Component {
  componentWillMount() {
    firebase.initializeApp(FIREBASE_CONFIG);
    // firebaseLogout();
  }
  render() {
    return (
      <Provider {...store}>
        <App />
      </Provider>
    );
  }
}

class Test extends Component {
  componentWillMount() {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
  render() {
    return (
      <Provider {...store}>
        <View style={{ flex: 1, backgroundColor: 'red' }}>
          <Firefox />
        </View>
      </Provider>
    );
  }
}

export default Main;
