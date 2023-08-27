import React from 'react'
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <div className='header'>
      <div>
        <Link to="/">
          <img className='logo' src="/logo.png" alt="Books App Logo" />
        </Link>
      </div>
      
      <div>
        <Link to='/favourites'>
          <button className='fav_header'> Favourites </button>
        </Link>
      </div>
</div>
  )
}

export default Header;
