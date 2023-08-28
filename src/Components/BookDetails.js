import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { BOOK_DETAILS_URL } from '../API';
import mockBooksData from './mockBooksData'; // Import your mock data
import { updateBookDetails } from '../Redux/actions'; // Import your update action

import { FaEdit, FaSave } from 'react-icons/fa'; // Import icons

const BookDetails = ({books}) => {
    const [book, setBook] = useState({});
    const [isEditDescription, setIsEditDescription] = useState(false);
    const [isEditAuthor, setIsEditAuthor] = useState(false);
    const [isEditGenre, setIsEditGenre] = useState(false);
    const { id } = useParams();
    const dispatch = useDispatch();

    //display details of new user added book
    const location = useLocation();
    const bookFromLocationState = location.state?.newBook;

    // Function to calculate text dimensions
    const getTextDimensions = (text) => {
        const dummyElement = document.createElement('span');
        dummyElement.style.visibility = 'hidden';
        dummyElement.style.whiteSpace = 'pre-wrap';
        dummyElement.textContent = text;
        document.body.appendChild(dummyElement);
        const dimensions = {
            width: dummyElement.offsetWidth,
            height: dummyElement.offsetHeight
        };
        document.body.removeChild(dummyElement);
        return dimensions;
    };

    const handleEditClick = (field) => {
        if (field === 'description') {
            setIsEditDescription(true);
        } 
        else if (field === 'author') {
            setIsEditAuthor(true);
        } 
        else if (field === 'genre') {
            setIsEditGenre(true);
        }
    };

    const handleSaveClick = () => {
        dispatch(updateBookDetails(book));

        setIsEditDescription(false);
        setIsEditAuthor(false);
        setIsEditGenre(false);
    };

    useEffect(() => {
        console.log("bookFromLocationState:", bookFromLocationState);

        if (bookFromLocationState) {
            setBook(bookFromLocationState);
        } 
        
        else {
            const mockBook = mockBooksData.find(item => item.id.toString() === id);
    
            if (mockBook) {
                setBook(mockBook);
            } 
            else {
                axios
                    .get(`${BOOK_DETAILS_URL}/${id}`)
                    .then(res => {
                        setBook(res.data);
                    })
                    .catch(err => console.log(err));
            }
        }
    }, [bookFromLocationState, books, id]);
    
    return (
        <div className='book-details-container'>
            <div className='book-details'>
                <div className='title'>
                    <h2>{book?.title}</h2>
                </div>
                
                <div className='image-container'>
                    <img
                        src={book.image_url}
                        alt={book.title}
                        onError={(e) => {
                        e.target.src = 'placeholder-image-url.jpg'; // Replace with your placeholder image
                        }}
                    />
                </div>

                <div className='details'>
                    <div className='field'>
                        <div className='field-header'>
                            <h2> Description </h2>
                            {isEditDescription && (
                                <button className='edit-btn' onClick={() => handleSaveClick()}>
                                    <FaSave />
                                </button>
                            )}
                            {!isEditDescription && (
                                <button className='edit-btn' onClick={() => handleEditClick('description')}>
                                    <FaEdit />
                                </button>
                            )}
                        </div>
                        <p>
                            {isEditDescription 
                                ? (
                                    <textarea
                                        value={book?.description}
                                        onChange={e => setBook({ ...book, description: e.target.value })}
                                        style={{
                                            width: '600px',
                                            height: `${getTextDimensions(book?.description).height}px`
                                        }}
                                    />
                                ) 
                                : ( <span>{book?.description}</span> )
                            }
                        </p>
                    </div>
                    
                    <div className='field'>
                        <div className='field-header'>
                            <h2> Author </h2>
                            {isEditAuthor && (
                                <button className='edit-btn' onClick={() => handleSaveClick()}>
                                    <FaSave />
                                </button>
                            )}
                            {!isEditAuthor && (
                                <button className='edit-btn' onClick={() => handleEditClick('author')}>
                                    <FaEdit />
                                </button>
                            )}
                        </div>
                        <p>
                            {isEditAuthor 
                                ? ( <input
                                        type='text'
                                        value={book?.authors}
                                        onChange={e => setBook({ ...book, authors: e.target.value })}
                                        style={{
                                            width: `${getTextDimensions(book?.authors).width}px`,
                                            height: `${getTextDimensions(book?.authors).height}px`
                                        }}
                                    />
                                ) 
                                : ( <span>{book?.authors}</span> )
                            }
                        </p>
                    </div>

                    <div className='field'>
                        <div className='field-header'>
                            <h2> Genre </h2>
                            {isEditGenre && (
                                <button className='edit-btn' onClick={() => handleSaveClick()}>
                                    <FaSave />
                                </button>
                            )}
                            {!isEditGenre && (
                                <button className='edit-btn' onClick={() => handleEditClick('genre')}>
                                    <FaEdit />
                                </button>
                            )}
                        </div>
                        <p>
                            {isEditGenre 
                                ? ( <input
                                        type='text'
                                        value={book?.genres}
                                        onChange={e => setBook({ ...book, genres: e.target.value })}
                                        style={{
                                            width: `${getTextDimensions(book?.genres).width}px`,
                                            height: `${getTextDimensions(book?.genres).height}px`
                                        }}
                                    />
                                ) 
                                : ( <span>{book?.genres}</span> )
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;