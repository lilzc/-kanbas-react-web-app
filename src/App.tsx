import React from "react";
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import { Navigate} from 'react-router-dom';
import Kanbas from './Kanbas';
import Labs from './Labs'; 


export default function App() {
  return (
   <HashRouter>
    <div>
     <Routes>
      <Route path="/" element={<Navigate to="Kanbas"/>}/>
      <Route path="/Labs/*" element={<Labs />} />
      <Route path="/Kanbas/*" element={<Kanbas />} />
     </Routes>
    </div>
   </HashRouter>
 );}
 