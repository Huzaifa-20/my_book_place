import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';

import './BookCardStyle.scss';

const BookCard = () => {
  const [bookName, setBookName] = useState('');
  const [bookGenre, setBookGenre] = useState('');

  const handleChange = (e) => {
    const { value, name } = e.target;
    name === 'bookName' ? setBookName(value) : setBookGenre(value);
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

        <div className="input-field">
          <label className="input-label">Author:</label>
          <select className="select-author" name="author">
            <option disabled selected>
              --Select--
            </option>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="fiat">Fiat</option>
            <option value="audi">Audi</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default BookCard;
