import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyC9z0mdodEgkdTGI214x8ZU4uCLBm-Z93U',
  authDomain: 'book-app-7fd8a.firebaseapp.com',
  projectId: 'book-app-7fd8a',
  storageBucket: 'book-app-7fd8a.appspot.com',
  messagingSenderId: '114726498580',
  appId: '1:114726498580:web:3cdb71655e136b85dc5201',
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
export default firebase.firestore();
