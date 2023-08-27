import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import { API_URL } from '../API';
import { useAppContext } from '../Context/appContext';
import mockBooksData from './mockBooksData';

const BookList = () => {
    const [books, setBooks] = useState([]);
    //extract these values from context
    const { favourites, addToFavourites, removeFromFavourites } = useAppContext();
    const navigate = useNavigate();

    const favouritesChecker = (id) => {
        return favourites.some((book) => book.id === id);
    }

    useEffect(() => {
        axios
        .get(API_URL)
        .then(res=> {
          setBooks(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    // Combine API books and mock books
    const combinedBooks = [...mockBooksData, ...books];

    return (
        <div className='book-list'>
          {combinedBooks.map((book) => (
            <div className='book' key={book.id}> 
              <div> <h3>{book.title}</h3> </div>
              <div> 
                <img 
                  src={book.image_url} 
                  alt="#" 
                  onClick = {() => navigate(`/book/${book.id}`)}
                /> 
              </div>

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
