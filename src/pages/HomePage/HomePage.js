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
  const [selectedBookId, setSelectedBookId] = useState('');
  const [selectedBookName, setSelectedBookName] = useState('');
  const [selectedBookGenre, setSelectedBookGenre] = useState('');
  const [selectedBookAuthor, setSelectedBookAuthor] = useState('');
  const [booksByAuthor, setBooksByAuthor] = useState([]);
  const dispatch = useDispatch();

  const userBooks = useSelector((state) => state.books.userBooks);
  const currentUser = useSelector((state) => state.user.currentUser);

  const [booksMap, setBooksMap] = useState(null);

  useEffect(() => {
    const updateUserBooks = (books) => dispatch(setUserBooks(books));
    const updateAllBooks = (books) => dispatch(setAllBooks(books));

    let unsubAllBooksSnapshot = null;
    const booksCollectionRef = firestore.collection('books');

    unsubAllBooksSnapshot = booksCollectionRef.onSnapshot(async (snapshot) => {
      const tempBooksArray = convertBooksSnapshotToMap(snapshot);
      setBooksMap(tempBooksArray);
      updateAllBooks(tempBooksArray);

      if (currentUser.books && tempBooksArray) {
        const arr = [];
        tempBooksArray.map((book) => {
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

  const bookSelectHandler = (id) => {
    if (selectedBookId === id) {
      setSelectedBookId('');
      setBookSelected(false);
    } else {
      setSelectedBookId(id);

      setBooksByAuthor([]);
      for (let i = 0; i < userBooks.length; i++) {
        if (userBooks[i].id === id) {
          setSelectedBookName(userBooks[i].name);
          setSelectedBookGenre(userBooks[i].genre);
          setSelectedBookAuthor(userBooks[i].author);

          let tempBookNames = [userBooks[i].name];
          for (let j = 0; j < userBooks.length; j++) {
            if (userBooks[j].author === userBooks[i].author && j !== i) {
              tempBookNames = [...tempBookNames, userBooks[j].name];
            }
          }
          setBooksByAuthor(tempBookNames);
        }
      }

      setBookSelected(true);
    }
  };

  const closeDrawer = () => {
    setSelectedBookId('');
    setBookSelected(false);
  };

  return (
    <div className="outter-container">
      <div className="main-container">
        <div className="upper-half">
          <div className="header-bar">
            <div className="user-title-container">
              {currentUser
              && currentUser.displayName
              && currentUser.displayName.length > 0 ? (
                <h1 className="user-title">
                  {currentUser.displayName}
                  {' '}
                  <span>’s Reading List</span>
                </h1>
                ) : (
                  ''
                )}
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
                  selected={selectedBookId === id}
                  onClick={() => {
                    bookSelectHandler(id);
                  }}
                >
                  {name}
                </CustomButton>
              </div>
            ))}
          </div>
        </div>
        <BookCard allBooks={booksMap} />
      </div>
      <div className={` ${bookSelected ? 'show' : ''} book-drawer`}>
        <BookDetailDrawer
          bookId={selectedBookId}
          isDrawerOpen={bookSelected}
          closeDrawer={closeDrawer}
          bookName={selectedBookName}
          bookGenre={selectedBookGenre}
          bookAuthor={selectedBookAuthor}
          allBooks={booksByAuthor}
        />
      </div>
    </div>
  );
};

export default HomePage;
