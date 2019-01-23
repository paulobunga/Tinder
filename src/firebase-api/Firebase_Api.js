import firebase from 'firebase';

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyDZUdyeZMeuq7uJRvMZ7cFY9rdZvhC0YUI',
  authDomain: 'food-apps-3f307.firebaseapp.com',
  databaseURL: 'https://food-apps-3f307.firebaseio.com',
  projectId: 'food-apps-3f307',
  storageBucket: 'food-apps-3f307.appspot.com',
  messagingSenderId: '95223784372'
};

const firebaseLogin = (email, password) =>
  new Promise(resolve => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => resolve('LogIn'))
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => resolve('SignUp'))
          .catch(() => resolve('Error'));
      });
  });

const firebaseListenLogin = () =>
  new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        resolve(user);
      } else {
        reject('null');
      }
    });
  });

const firebaseLogout = () => firebase.auth().signOut();

const loadUserInfo = userId =>
  new Promise(resolve => {
    firebase
      .database()
      .ref(`Tinder/User/${userId.toUpperCase()}`)
      .once('value', snapshot => {
        resolve(snapshot.val());
      });
  });

const loadRandomUser = number =>
  new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`Tinder/UserList/${number}`)
      .once('value', snapshot => {
        const value = snapshot.val();
        if (value) {
          firebase
            .database()
            .ref(`Tinder/User/${value}`)
            .once('value', snap => {
              resolve(snap.val());
            });
        } else {
          reject('error');
        }
      });
  });

const setLikePeople = (likeUserID, likedUserID) =>
  new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`Tinder/User/${likeUserID}/Like`)
      .push(likedUserID)
      .then(() => {
        resolve('done');
      })
      .catch(error => reject(error));
  });

const isMatch = (likeUserID, likedUserID) =>
  new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`Tinder/User/${likedUserID}/Like`)
      .once('value', snapshot => {
        Object.values(snapshot.val()).indexOf(likeUserID) > -1
          ? resolve('match')
          : resolve('not match');
      })
      .catch(error => reject(error));
  });

const setMatch = (userA, userB) =>
  new Promise(resolve => {
    firebase
      .database()
      .ref(`Tinder/User/${userA}/Match`)
      .push(userB)
      .then(() => {
        firebase
          .database()
          .ref(`Tinder/User/${userB}/Match`)
          .push(userA)
          .then(() => {
            resolve('success');
          });
      });
  });

const loadMatch = userData => {
  firebase
    .database()
    .ref(`Tinder/User/${userData.Id}/Match`)
    .on('value', snapshot => {
      const data = snapshot.val();
      userData.Match = { ...data };
    });
};

const getImgURI = userID =>
  new Promise(resolve => {
    firebase
      .database()
      .ref(`Tinder/User/${userID}/Avatar`)
      .on('value', snapshot => {
        resolve({ uri: Object.values(snapshot.val())[0], Id: userID });
      });
  });

const loadMessage = (fromUser, toUser, store) => {
  const path = fromUser < toUser ? `${fromUser}-${toUser}` : `${toUser}-${fromUser}`;
  firebase
    .database()
    .ref(`Tinder/Message/${path}/Message`)
    .on('value', snapshot => {
      store.store = { ...snapshot.val() };
    });
};

const sendMessages = (fromUser, toUser, message) => {
  const path = fromUser < toUser ? `${fromUser}-${toUser}` : `${toUser}-${fromUser}`;
  firebase
    .database()
    .ref(`Tinder/Message/${path}/Message`)
    .push({
      Data: message,
      Date: '18-01-1998',
      From: fromUser
    });
};

const setTyping = (userTyping, value, fromUser, toUser) => {
  const path = fromUser < toUser ? `${fromUser}-${toUser}` : `${toUser}-${fromUser}`;
  firebase
    .database()
    .ref(`Tinder/Message/${path}/IsTyping/${userTyping}`)
    .set(value);
};

export {
  firebaseLogin,
  FIREBASE_CONFIG,
  firebaseListenLogin,
  firebaseLogout,
  loadUserInfo,
  loadRandomUser,
  setLikePeople,
  isMatch,
  setMatch,
  loadMatch,
  getImgURI,
  loadMessage,
  sendMessages,
  setTyping
};
