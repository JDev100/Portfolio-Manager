import React from 'react'
import styled from 'styled-components'
import {AiFillGithub} from 'react-icons/ai'
const Footer = () => {
    return (
        <FooterContainer>
            <a href="https://github.com/JDev100/Portfolio-Manager">
               <AiFillGithub/>
            </a>
        </FooterContainer>
    )
}
export const FooterContainer = styled.nav`
    a {
        text-decoration: none;
        color: #ffffff;
        font-size: 3rem;
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

  border-top: .1rem solid #ffffff;
  height: 85px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 2rem;
  z-index: 12;
  /* Third Nav */
  /* justify-content: flex-start; */
`;
export default Footer