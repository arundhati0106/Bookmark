
import { createStore, combineReducers } from 'redux';
import bookReducer from './bookRemover'; 

const rootReducer = combineReducers({
  books: bookReducer, // Your book reducer
  // other reducers...
});

const store = createStore(rootReducer);

export default store;
