#Quick Start Guide to making pages/components for the front end

(All of the following is accomplished in ```root/public/src```)

##Making a new page
1. In  ```./pages``` directory make a new jsx file like ```MyPage.jsx```
2. Apply the following boilerplate code:
```
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const MyPage = () => {
  return (
    <Container>
      {/*PUT ALL YOUR HTML AND JSX HERE*/}
      <h1>Hello World</h1>      
    </Container>
  )    
}

export const Container = styled.div`
  min-height: 75vh;
  max-width: 1400px;
  min-width: 780px;
  margin: auto;
  padding: 2rem 2rem;
  
  /*PUT YOUR CUSTOM CSS HERE*/
`  

export default MyPage
```
3. Go to ```App.js``` which should look like this:
```
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
            {/*MAKE ROUTE TO YOUR PAGE HERE*/}
          </Routes>        
        <Footer />
      </BrowserRouter>
    
  );
}

export default App;

```
4. Import your page with 
```import MyPage from './pages/MyPage```
6. Put following in designated area:
``` <Route path='/mypage' element={<MyPage />} />```
7. With client running, input ```http://localhost:3000/mypage``` in browser url bar
8. Should be like following:
