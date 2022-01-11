import React, {useEffect, useContext} from 'react';
import Home from "./components/Home"
import Nav from './components/Nav';
import SnippetsList from './components/snippets/SnippetsList';
import Faq from './components/Faq';
import TutorialsList from './components/tutorials/TutorialsList';
import UploadForms from './UploadForms';
import './css/style.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SnippetContext} from './util/snippetContext';
import { ContextType } from './components/snippets/Interfaces'


function App() {


  const {getFromFirebaseStorage} = useContext(SnippetContext) as ContextType


  useEffect(() => { 
    getFromFirebaseStorage('gif/');
    getFromFirebaseStorage('snippet/');
  }, [])

  return (
    <>
    <Router>
      <div className="App">
     
        <Nav/>
        
        <Routes>
          
          <Route path="/" element={<Home />} />
          {/* <Route path="/uploadforms" element={<UploadForms allItemsGif={allItemsGif} allItemsSnippets={allItemsSnippets}/>} /> */}
          <Route path="/uploadforms" element={<UploadForms/>} />
          <Route path="/tutorials"element={<TutorialsList />} />
          <Route path="/snippets"element={ <SnippetsList />} />
          <Route path="/faq"element={<Faq />} />  
         
        </Routes>
        
      </div>
    </Router>
    </>
  );
}

export default App;
