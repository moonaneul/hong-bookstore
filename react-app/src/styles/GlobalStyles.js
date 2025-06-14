import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    --primary: #FF6B6B;
    --secondary: #4ECDC4;
    --background: #F7F7F7;
    --text: #2D3436;
    --gray: #636E72;
    --light-gray: #B2BEC3;
    --white: #FFFFFF;
    --error: #FF7675;
    --success: #00B894;
    --warning: #FDCB6E;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--background);
    color: var(--text);
    line-height: 1.5;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    font-family: inherit;
  }

  input, textarea {
    font-family: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`

export default GlobalStyles 