import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StockDetails from './pages/StockDetails';
import Watchlist from './pages/Watchlist'

function App() {
  return (
    
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/stockdetails/:stockid' element={<StockDetails />} />
            <Route path='/watchlist/' element={<Watchlist />} />
          </Routes>

        
        <Footer />
      </BrowserRouter>
    
  );
}

export default App;
