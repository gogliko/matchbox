import { createGlobalStyle } from "styled-components";

/**
 * Global styles for project
 */
export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    margin: 0;
    font-family: "Roboto", sans-serif;
    padding: 0;
    border: 0;
  }

  * {
    box-sizing: border-box;
  }
`;
