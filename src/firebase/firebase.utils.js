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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    const books = [];

    try {
      await userRef.set({
        id: userAuth.uid,
        displayName,
        email,
        createdAt,
        books,

        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

export const convertBooksSnapshotToMap = (books) => {
  const transformedBooks = books.docs.map((doc) => {
    const {
      name, genre, author, id,
    } = doc.data();

    return {
      id,
      name,
      genre,
      author,
    };
  });
  return transformedBooks;
};

export const addBooksToFirestore = async (userId, { name, author, genre }) => {
  const booksCollectionRef = firestore.collection('books');

  const newBookDocRef = booksCollectionRef.doc();
  await newBookDocRef.set({
    id: newBookDocRef.id,
    name,
    author,
    genre,
  });

  await firestore.doc(`users/${userId}`).update({
    books: firebase.firestore.FieldValue.arrayUnion(newBookDocRef.id),
  });
};

export const deleteBookFromFirestore = async (bookId, userId) => {
  console.log(`Deleting: ${bookId}`);
  firestore
    .collection('books')
    .where('id', '==', bookId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.docs[0].ref.delete();
    });

  await firestore
    .doc(`users/${userId}`)
    .update({
      books: firebase.firestore.FieldValue.arrayRemove(bookId),
    })
    .catch((error) => {
      console.error('Error removing document: ', error);
    });
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
