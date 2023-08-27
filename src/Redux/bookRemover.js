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

        case 'UPDATE_BOOK_DETAILS':
            return {
                ...state,
                books: state.books.map(book => {
                    if (book.id === action.payload.id) {
                        return action.payload;
                    }
                    return book;
                }),
            };

        case 'ADD_BOOK':
            return {
                ...state,
                books: [...state.books, action.payload],
            };
    
        default:
            return state;
    }
};
  
export default bookReducer;
  