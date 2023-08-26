import React from 'react'

const Header = () => {
  return (
    <div className='header'>
      <div>
        <img className='logo' src="/logo.png" alt="Books App Logo" />
      </div>
      
      <div>
        <button className='fav_header'> Favourites </button>
      </div>
</div>
  )
}

export default Header;
