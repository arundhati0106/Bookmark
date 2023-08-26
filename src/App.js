
import './App.css';
import {Routes, Route} from 'react-router-dom';

import Footer from './Components/Footer';
import Header from './Components/Header';
import BookList from './Components/BookList';
import Favourites from './Components/Favourites';
import BookDesc from './Components/BookDesc';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/book/:id" element={<BookDesc />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
      <Footer />      
    </div>
  );
}

export default App;
