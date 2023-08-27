import React from 'react'
import {useNavigate} from 'react-router-dom';

import '../Styling/favourites.css';

import { useAppContext } from '../Context/appContext';

const Favourites = () => {
  const { favourites, addToFavourites, removeFromFavourites } = useAppContext();

  const navigate = useNavigate();
  
  console.log('favourites are', favourites);

  const favouritesChecker = (id) => {
      const boolean = favourites.some((book) => book.id === id);
      return boolean;
  }

  return (
    <div className='favourites'>
      {favourites.length > 0 
        ? favourites.map((book) => (
            <div className='book' key={book.id}> 
              <div> <h3>{book.title}</h3> </div>
              <img 
                  src={book.image_url} 
                  alt="#" 
                  onClick = {() => navigate(`/book/${book.id}`)}
              /> 
              <div> 
                {/* if book is already inside favourites array, remove it */}
                { favouritesChecker(book.id) 
                  ? (<button onClick={()=>removeFromFavourites(book.id)}> 
                        Remove from Favourites
                     </button>
                    )

                  : (<button onClick={() => addToFavourites(book)}> 
                        Add to Favourites
                     </button>
                    )
                }                 
              </div>
            </div>
          ))
        : <h2> You don't have any books marked as favourites. </h2>
      }
    </div>
  )
}

export default Favourites;
