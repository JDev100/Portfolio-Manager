import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <Nav>
            <Link to='/'>
                <h1>Porfolio Manager</h1>
            </Link>
            <button>Watchlist</button>

        </Nav>
    )
}
export const Nav = styled.nav`
    a {
        text-decoration: none;
        color: #ffffff;
    }
    button {
        cursor: pointer;
        height:2rem;
        background-color: #4137bd;
        color: white;
        padding: 1rem 2rem;
        display: flex;
        align-items: center;
        border: 1px solid #4137bd;
    }

  /* background: #63D471; */
  border-bottom: .1rem solid #ffffff;
  height: 85px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 2rem;
  z-index: 12;
  /* Third Nav */
  /* justify-content: flex-start; */
`;
export const NavMenu = styled.div`
    
`

export default Navbar
