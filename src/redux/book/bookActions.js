import bookActionTypes from './bookTypes';
import {
  firestore,
  convertBooksSnapshotToMap,
  auth,
} from '../../firebase/firebase.utils';

/**
 * This action sets the user's books in redux store
 *
 * @param {Object[]} books an array of book objects
 * @returns
 */
export const fetchUserBooksSuccess = (books) => ({
  type: bookActionTypes.FETCH_USER_BOOKS_SUCCESS,
  payload: books,
});

/**
 * This function accesses the IDs stored in the 'books' item
 * of the user's document in firestore. Then it compares those IDs
 * to the array of all book of database and finds the details
 * of books of current user
 *
 * @param {auth.uid} userId Unique ID of current user
 * @param {object[]} allBooks An array of book objects
 * @returns
 */
export const fetchUserBooksStartAsync = (userId, allBooks) => async (dispatch) => {
  if (userId) {
    const userRef = firestore.doc(`users/${userId}`);
    const userBookIds = await userRef
      .get()
      .then((snapshot) => snapshot.data().books);

    const userBooks = [];
    allBooks.map((book) => {
      if (userBookIds.includes(book.id)) {
        userBooks.push(book);
      }
      return userBooks;
    });
    dispatch(fetchUserBooksSuccess(userBooks));
  }
};

/**
 * This action sets all the books in redux store
 *
 * @param {Object[]} books an array of book objects
 * @returns
 */
export const fetchAllBooksSuccess = (books) => ({
  type: bookActionTypes.FETCH_ALL_BOOKS_SUCCESS,
  payload: books,
});

/**
 * This function asynchronously fetches all books from firestore
 * and sets them in redux store
 */
export const fetchAllBooksStartAsync = () => (dispatch) => {
  const booksCollectionRef = firestore.collection('books');

  booksCollectionRef.onSnapshot(async (snapshot) => {
    const booksArray = convertBooksSnapshotToMap(snapshot);
    dispatch(fetchAllBooksSuccess(booksArray));
  });
};
