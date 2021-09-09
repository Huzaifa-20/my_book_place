import { useState, useEffect } from 'react';
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
  /**
   * All state variables required by component
   */
  const [bookSelected, setBookSelected] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [selectedBookName, setSelectedBookName] = useState('');
  const [selectedBookGenre, setSelectedBookGenre] = useState('');
  const [selectedBookAuthor, setSelectedBookAuthor] = useState('');
  const [booksByAuthor, setBooksByAuthor] = useState([]);
  const [booksMap, setBooksMap] = useState(null);

  const dispatch = useDispatch();

  /**
   * State of userBooks and allBooks as stored in Redux Store
   */
  const userBooks = useSelector((state) => state.books.userBooks);
  const currentUser = useSelector((state) => state.user.currentUser);

  /**
   * Calling async functions written in firebase.utils
   * to retrieve books stored in database. Then storing
   * the data in redux store
   */
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

  /**
   * Sets the state for currentbook that is selected and
   * creates an array of all the books that are written
   * by the same author as of the selected book
   *
   * @param {string} id
   * @param {string} name
   * @param {string} genre
   * @param {string} author
   */
  const bookSelectHandler = (id, name, genre, author) => {
    if (selectedBookId === id) {
      setSelectedBookId('');
      setBookSelected(false);
    } else {
      setSelectedBookId(id);
      setSelectedBookName(name);
      setSelectedBookGenre(genre);
      setSelectedBookAuthor(author);
      setBooksByAuthor(
        userBooks.filter((book) => book.author === author).map((b) => b.name),
      );
      setBookSelected(true);
    }
  };

  /**
   * Function to close the side drawer having
   * details of the book selected
   */
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
              {currentUser?.displayName?.length > 0 ? (
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
              <p
                className="log-out-text"
                onClick={() => {
                  auth.signOut();
                }}
              >
                Log Out
              </p>
            </div>
          </div>
          <div className="books-container">
            {userBooks.map(({
              id, name, genre, author,
            }) => (
              <div className="book-button">
                <CustomButton
                  key={id}
                  selected={selectedBookId === id}
                  onClick={() => {
                    bookSelectHandler(id, name, genre, author);
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
