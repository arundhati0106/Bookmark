import React, {useState, useEffect} from 'react'
import axios from 'axios';

import { API_URL } from '../API';
import { useAppContext } from '../Context/appContext';

const BookList = () => {
    const [books, setBooks] = useState([]);

    //extract these values from context
    const { favourites, addToFavourites, removeFromFavourites } = useAppContext();

    console.log('favourites are', favourites);

    const favouritesChecker = (id) => {
        const boolean = favourites.some((book) => book.id === id);
        return boolean;
    }

    useEffect(() => {
        console.log('API_URL:', API_URL);
        axios
        .get(API_URL)
        .then(res=> {
            console.log(res.data)
            setBooks(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    console.log('Books:', books);

    return (
        <div className='book-list'>
          {books.map((book) => (
            <div className='book' key={book.id}> 
              <div> <h3>{book.title}</h3> </div>
              <div> <img src={book.image_url} alt="#" /> </div>
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
          ))}
        </div>
      );
}

export default BookList;
