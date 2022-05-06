import React from 'react';
import { Global } from '@emotion/react';
import GlobalStyle from './components/UI/GlobalStyle';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import World from './pages/World';
import Location from './pages/Location';
import Cart from './pages/Cart';
import Pokemon from './pages/Pokemon';

const App = () => {
    return (
        <>
          <Global styles={GlobalStyle} />
          <Router>
            <Routes>
              <Route path="/world" element={<World />} />
              <Route path="/world/:name" element={<Location />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/pokemon" element={<Pokemon />} />
            </Routes>
          </Router>
        </>
    );
}

export default App;