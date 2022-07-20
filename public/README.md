#Quick Start Guide to making pages/components for the front end
(All of the following is accomplished in ```root/public/src```)

##Making a new page
1. In  ```./pages``` directory make a new jsx file like ```MyPage.jsx```
2. Apply the following boilerplate code:
```
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Home = () => {
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
```
