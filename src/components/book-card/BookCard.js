import { useState, useEffect } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import { addBooksToFirestore } from '../../firebase/firebase.utils';
import './BookCardStyle.scss';

const BookCard = ({ allBooks }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [bookName, setBookName] = useState('');
  const [bookGenre, setBookGenre] = useState('');
  const [newBookAuthor, setNewBookAuthor] = useState('');
  const [oldBookAuthor, setOldBookAuthor] = useState('');
  const [authorOptions, setAuthorOptions] = useState(null);

  /**
   * Function to update values on input fields as we type them
   */
  const handleChange = (e) => {
    const { value, name } = e.target;

    name === 'bookName'
      ? setBookName(value)
      : name === 'bookGenre'
        ? setBookGenre(value)
        : name === 'newBookAuthor'
          ? setNewBookAuthor(value)
          : setOldBookAuthor(value);
  };

  /**
   * Function that tells if all input fields are
   * filled or not
   */
  const emptyFields = () => {
    if (
      bookName === ''
      || bookGenre === ''
      || (newBookAuthor === '' && oldBookAuthor === '')
    ) return true;
    return false;
  };

  /**
   * Function that calls an async function in firestore.utils
   * to add a new book into firestore
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emptyFields()) return;

    setBookName('');
    setBookGenre('');
    setNewBookAuthor('');
    setOldBookAuthor('');

    addBooksToFirestore(currentUser.id, {
      name: bookName,
      genre: bookGenre,
      author: newBookAuthor || oldBookAuthor,
    });

    if (!allBooks.includes(newBookAuthor || oldBookAuthor)) {
      setAuthorOptions({ ...authorOptions }, [newBookAuthor || oldBookAuthor]);
    }
  };

  /**
   * Function that sets upp values for 'existing authors'
   * drop down menu
   */
  useEffect(() => {
    if (allBooks) {
      setAuthorOptions([...new Set(allBooks.map((data) => data.author))]);
    }
  }, [allBooks, currentUser]);

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
              name="newBookAuthor"
              value={newBookAuthor}
              onChange={handleChange}
              placeholder="-Add New Author-"
            />

            <select
              className="select-author"
              name="oldBookAuthor"
              value={oldBookAuthor}
              onChange={handleChange}
            >
              <option selected>-Select Existing Author-</option>
              {authorOptions?.length > 0
                ? authorOptions.map((author) => <option>{author}</option>)
                : ''}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookCard;
