import React from 'react';
import Labs from './Labs';
import './App.css';

import { Navigate } from 'react-router-dom';

import { HashRouter,Route,Routes } from "react-router-dom";
import Kanbas from './Kanbas';
function App() {
  return (
    <HashRouter>
       <Routes>
       <Route path="/" element={<Navigate to="Labs" />} />
        <Route path='/Kanbas/*' element={<Kanbas/>}></Route>
          <Route path="/Labs/*" element={<Labs />} />
          
        </Routes>

    </HashRouter>
    
  );
}

export default App;
