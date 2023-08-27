export const deleteBook = (bookId) => {
  return {
    type: 'DELETE_BOOK',
    payload: bookId,
  };
};