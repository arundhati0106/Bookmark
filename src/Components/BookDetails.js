import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { BOOK_DETAILS_URL } from '../API';

const BookDetails = () => {
    const [book, setBook] = useState({}); //empty object, not array
    const {id} = useParams(); //should be similar to the name mentioned in app.js... "/book/:id" 

    useEffect(() => {
        axios
        .get(`${BOOK_DETAILS_URL}/${id}`)
        .then(res=>{
            setBook(res.data);
            console.log('Book data:', res.data);
        })
        .catch(err=>console.log(err));
    }, [id]);

    return (
        <div className='book-details-container'>
            <div className='book-details'>
                <div className='title'>
                    <h2>{book?.title}</h2>
                </div>

                <div className='image-container'>
                    <img src={book?.image_url} alt="#" />
                </div>

                <div className='details'>
                    <h2> Description </h2>
                    <p> {book?.description} </p>
                    
                    <h2> Author </h2>
                    <p> {book?.authors} </p>

                    <h2> Genre </h2>
                    <p> {book?.genres} </p>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
