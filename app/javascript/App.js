import React from 'react';
import { Global } from '@emotion/react';
import GlobalStyle from './components/UI/GlobalStyle';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import World from './pages/World';
import Location from './pages/Location';

const App = () => {
    return (
        <>
          <Global styles={GlobalStyle} />
          <Router>
            <Routes>
              <Route path="/world" element={<World />} />
              <Route path="/world/:name" element={<Location />} />
            </Routes>
          </Router>
        </>
    );
}

export default App;