import React from 'react';

import { ReactComponent as UnityIcon } from 'assets/icons/unity.svg';

import './header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="header__content">
        <h1>SDET Task</h1>
        <UnityIcon />
      </div>
    </header>
  );
};

export default Header;
