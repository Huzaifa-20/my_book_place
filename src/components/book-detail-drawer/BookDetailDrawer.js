import React from 'react';

import './BookDetailDrawerStyle.scss';

const BookDetailDrawer = () => (
  <div className="outter-container">
    <div className="drawer">
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
  </div>
);

export default BookDetailDrawer;
