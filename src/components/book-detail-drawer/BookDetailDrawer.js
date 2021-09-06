import React from 'react';
import { FaTimesCircle, FaTrash } from 'react-icons/fa';

import './BookDetailDrawerStyle.scss';

const BookDetailDrawer = ({
  isDrawerOpen,
  closeDrawer,
  bookName,
  bookGenre,
  bookAuthor,
  allBooks,
}) => (isDrawerOpen ? (
  <div className="drawer">
    <div className="drawer-icons">
      <div className="delete-book">
        <FaTrash className="delete-icon" />
        <p className="delete-text">
          Delete
          {' '}
          <br />
          {' '}
          Book
        </p>
      </div>

      <FaTimesCircle className="close-button" onClick={closeDrawer} />
    </div>

    <h1 className="book-title">{bookName}</h1>
    <h3 className="book-genre">{bookGenre}</h3>
    <h3 className="book-author">{bookAuthor}</h3>
    <h3>All books by this author</h3>
    <ul className="all-books">
      {allBooks && allBooks.length > 0
        ? allBooks.map((book) => <li>{book}</li>)
        : ''}
    </ul>
  </div>
) : null);

export default BookDetailDrawer;
