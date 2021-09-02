import React, { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { auth } from '../../firebase/firebase.utils';

import BookDetailDrawer from '../../components/book-detail-drawer/BookDetailDrawer';
import BookCard from '../../components/book-card/BookCard';
import CustomButton from '../../components/custom-button/CustomButton';
import './HomePageStyle.scss';

const HomePage = () => {
  const [bookSelected, setBookSelected] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  const bookSelectHandler = () => {
    setBookSelected(!bookSelected);
  };

  const closeDrawer = () => {
    setBookSelected(false);
  };

  const logOutHandler = () => {
    setLoggedOut(true);
  };

  return (
    <div className="outter-container">
      <div className="main-container">
        <div className="upper-half">
          <div className="header-bar">
            <div className="user-title-container">
              <h1 className="user-title">Ninjas Reading List</h1>
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
            <div className="book-button">
              <CustomButton selected={bookSelected} onClick={bookSelectHandler}>
                The Long Earth
              </CustomButton>
            </div>
            <div className="book-button">
              <CustomButton selected={false}>The Color of Magic</CustomButton>
            </div>
            <div className="book-button">
              <CustomButton selected={false}>The Light Fantastic</CustomButton>
            </div>
            <div className="book-button">
              <CustomButton selected={false}>The Final Empire</CustomButton>
            </div>
            <div className="book-button">
              <CustomButton selected={false}>The Hero of Ages</CustomButton>
            </div>
            <div className="book-button">
              <CustomButton selected={false}>The Name of the Wind</CustomButton>
            </div>
            <div className="book-button">
              <CustomButton selected={false}>Hogfather</CustomButton>
            </div>
            <div className="book-button">
              <CustomButton selected={false}>Thud</CustomButton>
            </div>
            <div className="book-button">
              <CustomButton selected={false}>The Long Universe</CustomButton>
            </div>
          </div>
        </div>
        <BookCard />
      </div>
      <div className={` ${bookSelected ? 'show' : ''} book-drawer`}>
        <BookDetailDrawer
          isDrawerOpen={bookSelected}
          closeDrawer={closeDrawer}
        />
      </div>
    </div>
  );
};

export default HomePage;
