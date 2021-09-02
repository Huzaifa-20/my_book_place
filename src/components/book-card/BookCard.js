import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';

import './BookCardStyle.scss';

const BookCard = () => {
  const [bookName, setBookName] = useState('');
  const [bookGenre, setBookGenre] = useState('');
  const [authorName, setAuthorName] = useState('');

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === 'bookName') {
      setBookName(value);
    } else if (name === 'bookGenre') {
      setBookGenre(value);
    } else {
      setAuthorName(value);
    }
  };

  return (
    <div className="book-card">
      <FaPlusCircle className="fab" />
      <form className="book-form">
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
              value={authorName}
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
