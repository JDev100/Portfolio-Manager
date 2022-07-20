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

# Quick Start Guide to making components

> components are similar to pages in structure, but are used as part of a page

## Making a new component
1. In  ```./components``` directory make a new jsx file like ```MyComponent.jsx```
2. Apply the following boilerplate code:
```
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const MyComponent = () => {
  return (
    <Container>
      {/*PUT ALL YOUR HTML AND JSX HERE*/}
      <h2>Cool Component</h2>      
    </Container>
  )    
}

export const Container = styled.div`  
  /*PUT YOUR CUSTOM CSS HERE*/
`  

export default MyComponent
```
3. Go to page file you want to place the component in, e.x ```MyPage.jsx```
4. Import your component with:
```
import MyComponent from '../components/MyComponent';
```
5. Place your component in the page like the following:
```
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import MyComponent from '../components/MyComponent';

const MyPage = () => {
  return (
    <Container>
      {/*PUT ALL YOUR HTML AND JSX HERE*/}
      <h1>Hello World</h1>      
      
      {/*I WILL PUT MY COMPONENT HERE*/}
      <MyComponent/>
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

6. Should look like following:

![jsxexample2](https://user-images.githubusercontent.com/95455992/179938811-c670d386-7274-4ff2-90be-d0915e0f9563.PNG)

