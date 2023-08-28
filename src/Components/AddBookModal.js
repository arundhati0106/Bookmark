import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styling/modal.css';

const AddBookModal = ({ onClose, onAddBook }) => {
    const [title, setTitle] = useState('');
    const [authors, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [genres, setGenre] = useState('');
    const [image_url, setImageUrl] = useState('');

    const navigate = useNavigate();

    const handleSave = () => {
        const newBook = {
            title,
            authors,
            description,
            genres,
            image_url,
            id: Date.now(),
        };
        onAddBook(newBook); // Pass the new book details back to the BookList
        setTitle('');
        setAuthor('');
        setDescription('');
        setGenre('');
        setImageUrl('');
        navigate('/');
    };  
    
    const handleClose = () => {
        onClose(); // Call the onClose prop to close the modal
    };

    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <button className='close-button' onClick={handleClose}>
                    &times; {/* Insert the "times" character for the cross icon */}
                </button>

                <h2>Add New Book</h2>
                
                <input
                    type='text'
                    placeholder='Title'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='Author'
                    value={authors}
                    onChange={e => setAuthor(e.target.value)}
                />
                <textarea
                    placeholder='Description'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='Genre'
                    value={genres}
                    onChange={e => setGenre(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='Image URL'
                    value={image_url}
                    onChange={e => setImageUrl(e.target.value)}
                />
                <div className='modal-buttons'>
                    <button onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default AddBookModal;
