# Quick Start Guide to making pages

> (All of the following is accomplished in ```root/public/src```)

## Making a new page
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
```
import MyPage from './pages/MyPage';
```
6. Put following in designated area:
``` 
<Route path='/mypage' element={<MyPage />} />
```
7. With client running, input following in browser url bar
```
http://localhost:3000/mypage
```
10. Should be like following:

![jsxexample](https://user-images.githubusercontent.com/95455992/179928494-8b508123-1d84-4013-8719-c9cec6fe4626.PNG)

