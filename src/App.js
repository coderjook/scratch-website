import React from 'react';
import Nav from './components/Nav';
import Snippets from './components/Snippets';
import Faq from './components/Faq';
import Tutorials from './components/Tutorials';
import './App.css';

function App() {
  return (
    <div className="App">
    <Nav/>
    <h1>Coderjook Scratch App</h1>
    <Tutorials />
    <Snippets />
    <Faq />  
    </div>
  );
}

export default App;
