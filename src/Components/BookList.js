import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { FaTrash } from 'react-icons/fa'; // Import icons
import {connect} from 'react-redux';

import { API_URL } from '../API';
import { useAppContext } from '../Context/appContext';
import { deleteBook as deleteBookAction } from '../Redux/actions'; 
import { addBook as addBookAction } from '../Redux/actions';
import mockBooksData from './mockBooksData';
import AddBookModal from './AddBookModal';

const BookList = ({ books: reduxBooks }) => {
  const [books, setBooks] = useState([]);
  const { favourites, addToFavourites, removeFromFavourites } = useAppContext();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [deletedBookIds, setDeletedBookIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    authors: '',
    description: '',
    genres: '',
    image_url: '',
  });

  const favouritesChecker = (id) => {
    return favourites.some((book) => book.id === id);
  };

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setBooks(res.data); // Set books fetched from the API
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddBook = async (newBook) => {
    console.log("Adding new book:", newBook);

    if (newBook.title) {
      await dispatch(addBookAction(newBook, books));
      setIsModalOpen(false);

      // Update the books state to include the new book
      setBooks((prevBooks) => [...prevBooks, newBook]);

      setNewBook({
        title: '',
        authors: '',
        description: '',
        genres: '',
        image_url: '',
      });
    }
  };
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleDeleteBook = (bookId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (confirmDelete) {
      console.log("handleDeleteBook called with bookId:", bookId);
      dispatch(deleteBookAction(bookId));
      setDeletedBookIds(prevDeletedIds => [...prevDeletedIds, bookId]);
    }
  };

  
  // Calculate the combinedBooks array
  const combinedBooks = [...books, ...mockBooksData]
    .filter(book => !deletedBookIds.includes(book.id));

  console.log("Updated books:", combinedBooks);

    return (
      <div className='book-list'>
        {combinedBooks.map((book) => (
          <div className='book' key={book.id}>
            <div className='book-header'>
              {!books.some((apiBook) => apiBook.id === book.id) && ( // Check if the book is not from API
                <button className='icon-button' onClick={() => handleDeleteBook(book.id)}>
                  <FaTrash />
                </button>
              )}
            </div>

            <div className='book-info'>
              <h3>{book.title}</h3>
              <img
                src={book.image_url || book.image_url}
                alt="#"
                onClick={() => navigate(`/book/${book.id}`)}
              />
            </div>

            <div className='favourite-button'>
              {/* If book is already inside favourites array, remove it */}
              {favouritesChecker(book.id)
                ? ( <button onClick={() => removeFromFavourites(book.id)}>
                      Remove from Favourites
                    </button>
                  )
                : ( <button onClick={() => addToFavourites(book)}>
                      Add to Favourites
                    </button>
                  )
              }
            </div>
          </div>
        ))}

        {newBook.title || newBook.authors || newBook.description || newBook.genres || newBook.image_url 
          ? ( <div className='book' key={newBook.id}>
                <div className='book-info'>
                  <h3>{newBook.title}</h3>
                  <img src={newBook.image_url} alt='#' />
                </div>
              </div>
            ) 
          : null
        }

        <div className='add-book-button'>
          <button 
            className='add-book'
            onClick={handleOpenModal}
            style={{ 
                height: '480px', 
                backgroundColor: 'white', 
                color: 'black',
                border: '3px dashed #0a0962d6'
            }}
          >
            Add Book
          </button>          
        </div>
        
        {isModalOpen && (
          <AddBookModal
              onClose={() => setIsModalOpen(false)}
              onAddBook={handleAddBook} // Pass the function to handle adding the book
          />
      
        )}
      </div>
    );
  }
  
  const mapStateToProps = (state) => {
    return {
      books: state.books,
    };
  };
  
  // export default BookList;
  export default connect(mapStateToProps)(BookList);