//delete
export const deleteBook = (bookId) => {
  return {
    type: 'DELETE_BOOK',
    payload: bookId,
  };
};

//edit
export const updateBookDetails = (updatedBook) => {
  return {
      type: 'UPDATE_BOOK_DETAILS',
      payload: updatedBook,
  };
};

//add
export const addBook = (newBook, books) => {
  return {
    type: 'ADD_BOOK',
    payload: newBook,
  };
};