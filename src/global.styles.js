import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
body {
    background-color: whitesmoke;
    font-family: 'Amatic SC';
    color: aliceblue;
    padding: 0 0;
  }
  
  a {
    text-decoration: none;
    color: whitesmoke;
  }
  
  p {
    direction: rtl ;
  }

  * {
    box-sizing: border-box;
  }


`;
