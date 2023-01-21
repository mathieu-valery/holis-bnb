import React, { useRef, useContext } from 'react';
import { HiOutlineMenu, HiOutlineGlobeAlt, HiSearch } from 'react-icons/hi';
import './Header.css';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/HolisBnb.png';
import LocationsContext from '../../components/Context/LocationsContext';

type HeaderProps = {
  children?: React.ReactNode;
};

const Header: React.FC<HeaderProps> = () => {
  const locationsContext: any = useContext(LocationsContext);
  const inputEl = useRef(document.createElement('input'));

  const handleClick = () => {
    locationsContext.getLocationsByName(inputEl.current.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      locationsContext.getLocationsByName(inputEl.current.value);
    }
  };

  return (
    <div className="header">
      <div className="header__container">
        <Link to="/">
          <img className="header__logo" src={Logo} alt="" />
        </Link>

        <div className="header__center">
          <input
            type="text"
            placeholder="Search a destination"
            ref={inputEl}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)}
          />
          <div className="search-button">
            <HiSearch onClick={handleClick} />
          </div>
        </div>

        <div className="header__right">
          <p>Become a host</p>
          <HiOutlineGlobeAlt />
          <HiOutlineMenu />
        </div>
      </div>
    </div>
  );
};

export default Header;
