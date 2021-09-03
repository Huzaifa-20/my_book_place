import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { addBooksToFirestore } from '../../firebase/firebase.utils';

import './BookCardStyle.scss';

const BookCard = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [bookName, setBookName] = useState('');
  const [bookGenre, setBookGenre] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === 'bookName') {
      setBookName(value);
    } else if (name === 'bookGenre') {
      setBookGenre(value);
    } else {
      setBookAuthor(value);
    }
  };

  const emptyFields = () => {
    if (bookName === '' || bookGenre === '' || bookAuthor === '') return true;
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emptyFields()) return;

    setBookName('');
    setBookGenre('');
    setBookAuthor('');
    addBooksToFirestore(currentUser.id, {
      name: bookName,
      genre: bookGenre,
      author: bookAuthor,
    });
  };

  return (
    <div className="book-card">
      <FaPlusCircle className="fab" onClick={handleSubmit} />
      <form className="book-form" onSubmit={handleSubmit}>
        <div className="input-field">
          <label>Book Name:</label>
          <input
            type="text"
            name="bookName"
            value={bookName}
            onChange={handleChange}
          />
        </div>

        <div className="input-field">
          <label>Genre:</label>
          <input
            type="text"
            name="bookGenre"
            value={bookGenre}
            onChange={handleChange}
          />
        </div>

        <div className="author-input-field">
          <label className="input-label">Author:</label>
          <div className="author-field">
            <input
              type="text"
              name="authorName"
              value={bookAuthor}
              onChange={handleChange}
              placeholder="-Add New Author-"
            />
            <select
              className="select-author"
              name="author"
              onChange={handleChange}
            >
              <option disabled selected>
                -Select Existing Author-
              </option>
              <option value="Volvo">Volvo</option>
              <option value="Saab">Saab</option>
              <option value="Fiat">Fiat</option>
              <option value="Audi">Audi</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookCard;
