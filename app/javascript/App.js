import React from 'react';
import { Global } from '@emotion/react';
import GlobalStyle from './components/UI/GlobalStyle';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import World from './pages/World';
import Location from './pages/Location';
import Cart from './pages/Cart';

const App = () => {
    return (
        <>
          <Global styles={GlobalStyle} />
          <Router>
            <Routes>
              <Route path="/world" element={<World />} />
              <Route path="/world/:name" element={<Location />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </Router>
        </>
    );
}

export default App;