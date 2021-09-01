import React, { useState, useEffect } from 'react';
import { FaTimesCircle } from 'react-icons/fa';

import './BookDetailDrawerStyle.scss';

const BookDetailDrawer = ({ isDrawerOpen, closeDrawer }) => (isDrawerOpen ? (
  <div className="drawer">
    <div className="close-drawer">
      <FaTimesCircle className="close-button" onClick={closeDrawer} />
    </div>

    <h1 className="book-title">The Long Universe</h1>
    <h3 className="book-genre">Sci-Fi</h3>
    <h3 className="book-author">Terry Pratchett</h3>
    <h3>All books by this author</h3>
    <ul className="all-books">
      <li>The Long Earth</li>
      <li>The Color of Magic</li>
      <li>The Light Fantastic</li>
      <li>Hogfather</li>
      <li>Thud</li>
      <li>The Long Universe</li>
    </ul>
  </div>
) : null);

export default BookDetailDrawer;
