import Lab1 from "./Lab1";
import { Route, Routes, Navigate } from "react-router";
import TOC from "./TOC";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import Kanbas from "../Kanbas";
export default function Labs() {
  return (
    <div>
      <h2 id="wd-name">Tanya Shukla</h2>
      <h1>Labs</h1>
      <TOC></TOC>
      <Routes>
        <Route path="/" element={<Navigate to="Lab1" />} />
        <Route path="Lab1" element={<Lab1 />} />
        <Route path="Lab2" element={<Lab2 />} />
        
        <Route path="Lab3" element={<Lab3 />} />
        <Route path="kanbas" element={<Kanbas/>}></Route>
        
      </Routes>
    
    </div>
  );
}


