import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StockDetails from './pages/StockDetails';

function App() {
  return (
    
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/stockdetails/:stockid' element={<StockDetails />} />
          </Routes>

        
        <Footer />
      </BrowserRouter>
    
  );
}

export default App;
