import { useState, useEffect } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

import { auth } from '../../firebase/firebase.utils';
import {
  fetchAllBooksStartAsync,
  fetchUserBooksStartAsync,
} from '../../redux/book/bookActions';
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
  const fetchAllBooks = () => dispatch(fetchAllBooksStartAsync());
  const fetchUserBooks = (userId, books) =>
    dispatch(fetchUserBooksStartAsync(userId, books));

  /**
   * State of userBooks and allBooks as stored in Redux Store
   */
  const userBooks = useSelector((state) => state.books.userBooks);
  const allBooks = useSelector((state) => state.books.allBooks);
  const currentUser = useSelector((state) => state.user.currentUser);

  /**
   * Calling async functions written in firebase.utils
   * to retrieve all the books stored in database
   */
  useEffect(() => {
    fetchAllBooks();
  }, [currentUser]);

  /**
   * Calling async functions written in firebase.utils
   * to retrieve the IDs of books our user has stored
   * and using those IDs to get the complete user's books details
   */
  useEffect(() => {
    fetchUserBooks(currentUser.id, allBooks);
  }, [allBooks]);

  /**
   * Sets the state for currentbook that is selected and
   * creates an array of all the books that are written
   * by the same author as of the selected book
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
        <BookCard allBooks={userBooks} />
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
