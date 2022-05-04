import React from 'react';
import { Global } from '@emotion/react';
import GlobalStyle from './components/UI/GlobalStyle';
import Header from './components/UI/Header';
import HelloMessage from './components/Message';

const App = () => {
    return (
        <>
          <Global styles={GlobalStyle} />
          <Header>
            Pokemon World
          </Header>
          <HelloMessage name="user" />
        </>
    );
}

export default App;