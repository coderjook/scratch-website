import React from 'react';
import Home from "./components/Home"
import Nav from './components/Nav';
import Snippets from './components/Snippets';
import Faq from './components/Faq';
import TutorialsList from './components/tutorials/TutorialsList';
import UploadTutorial from './components/tutorials/UploadTutorial';
import './css/style.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
 


function App() {
  return (
    <>
    <Router>
      <div className="App">
        <Nav/>
        
        <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/uploadtutorials" element={<UploadTutorial />} />
        <Route path="/tutorials"element={<TutorialsList />} />
        <Route path="/snippets"element={<Snippets />} />
        <Route path="/faq"element={<Faq />} />  
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
