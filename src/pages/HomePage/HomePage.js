import React, { useState, useEffect } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import {
  firestore,
  auth,
  convertBooksSnapshotToMap,
} from '../../firebase/firebase.utils';
import { setUserBooks, setAllBooks } from '../../redux/book/bookActions';

import BookDetailDrawer from '../../components/book-detail-drawer/BookDetailDrawer';
import BookCard from '../../components/book-card/BookCard';
import CustomButton from '../../components/custom-button/CustomButton';
import './HomePageStyle.scss';

const HomePage = () => {
  const [bookSelected, setBookSelected] = useState(false);

  const dispatch = useDispatch();

  const userBooks = useSelector((state) => state.books.userBooks);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const updateUserBooks = (books) => dispatch(setUserBooks(books));
    const updateAllBooks = (books) => dispatch(setAllBooks(books));

    let unsubAllBooksSnapshot = null;
    const booksCollectionRef = firestore.collection('books');

    unsubAllBooksSnapshot = booksCollectionRef.onSnapshot(async (snapshot) => {
      const booksMap = convertBooksSnapshotToMap(snapshot);
      updateAllBooks(booksMap);

      if (currentUser.books) {
        const arr = [];
        booksMap.map((book) => {
          if (currentUser && currentUser.books.includes(book.id)) {
            arr.push(book);
          }
          return arr;
        });
        updateUserBooks(arr);
      }
    });
    return () => {
      unsubAllBooksSnapshot();
    };
  }, [currentUser]);

  const bookSelectHandler = () => {
    setBookSelected(!bookSelected);
  };

  const closeDrawer = () => {
    setBookSelected(false);
  };

  return (
    <div className="outter-container">
      <div className="main-container">
        <div className="upper-half">
          <div className="header-bar">
            <div className="user-title-container">
              <h1 className="user-title">Ninjas Reading List</h1>
            </div>
            <div className="log-out-container">
              <FiLogOut
                className="log-out"
                onClick={() => {
                  auth.signOut();
                }}
              />
              <p className="log-out-text">Log Out</p>
            </div>
          </div>
          <div className="books-container">
            {userBooks.map(({ id, name }) => (
              <div className="book-button">
                <CustomButton
                  key={id}
                  selected={bookSelected}
                  onClick={bookSelectHandler}
                >
                  {name}
                </CustomButton>
              </div>
            ))}
          </div>
        </div>
        <BookCard />
      </div>
      <div className={` ${bookSelected ? 'show' : ''} book-drawer`}>
        <BookDetailDrawer
          isDrawerOpen={bookSelected}
          closeDrawer={closeDrawer}
        />
      </div>
    </div>
  );
};

export default HomePage;
