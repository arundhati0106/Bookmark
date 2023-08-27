const initialState = {
    books: [], // Initial book state
};
  
const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'DELETE_BOOK':
            return {
                ...state,
                books: state.books.filter(book => book.id !== action.payload),
            };
      
        default:
            return state;
    }
};
  
export default bookReducer;
  