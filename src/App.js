import React from 'react';
import Nav from './components/Nav';
import Snippets from './components/Snippets';
import Faq from './components/Faq';
import Tutorials from './components/Tutorials';
import UploadTutorial from './components/UploadTutorial';
import './css/style.css';
 


function App() {
  return (
    <div className="App">
    <Nav/>
    <div className="container">
      <h1>Coderjook Scratch App</h1>
    </div>
    
    <UploadTutorial />
    <Tutorials />
    <Snippets />
    <Faq />  
    </div>
  );
}

export default App;
