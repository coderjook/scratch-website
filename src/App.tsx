import React, {useState, useEffect} from 'react';
import Home from "./components/Home"
import Nav from './components/Nav';
import SnippetsList from './components/snippets/SnippetsList';
import Faq from './components/Faq';
import TutorialsList from './components/tutorials/TutorialsList';
import UploadForms from './UploadForms';
import './css/style.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { IItem, allItemsGif, getFromFirebaseGif, allItemsSnippets, getFromFirebaseSnippets } from './util/getFromFirebase'
 


function App() {

  // const [allItems, setAllItems] = useState<IItem[]>([]);

  useEffect(() => { 
  getFromFirebaseGif();
  getFromFirebaseSnippets();
  }, [])

  return (
    <>
    <Router>
      <div className="App">
        <Nav/>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/uploadforms" element={<UploadForms allItemsGif={allItemsGif} allItemsSnippets={allItemsSnippets}/>} />
          <Route path="/tutorials"element={<TutorialsList />} />
          <Route path="/snippets"element={<SnippetsList />} />
          <Route path="/faq"element={<Faq />} />  
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
