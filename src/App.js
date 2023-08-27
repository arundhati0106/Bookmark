
import './App.css';
import {Routes, Route} from 'react-router-dom';

import Footer from './Components/Footer';
import Header from './Components/Header';
import BookList from './Components/BookList';
import Favourites from './Components/Favourites';
import BookDetails from './Components/BookDetails';
import AddBookModal from './Components/AddBookModal';

function App() {
  return (
    <div className="App">
      <Header />
      
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/add-book" element={<AddBookModal />} />
      </Routes>
      
      <Footer />      
    </div>
  );
}

export default App;
