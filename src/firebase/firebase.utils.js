import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCtd0xg6iJsnpqr5lwCgQdkXSfUhq_ogoE',
  authDomain: 'my-book-place-93bc3.firebaseapp.com',
  projectId: 'my-book-place-93bc3',
  storageBucket: 'my-book-place-93bc3.appspot.com',
  messagingSenderId: '598657696476',
  appId: '1:598657696476:web:105e724e0e3142999baa19',
  measurementId: 'G-5XDY8TQ04Q',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
