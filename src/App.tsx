import React, {useEffect, useContext} from 'react';
import Home from "./components/Home"
import Nav from './components/Nav';
import SnippetsList from './components/snippets/SnippetsList';
import Faq from './components/Faq';
import TutorialsList from './components/tutorials/TutorialsList';
import UploadForms from './UploadForms';
import Signup from './login/Signup'; 
import Login from './login/Login';
import ForgotPassword from './login/ForgotPassword';
// import {PrivateRoute} from './login/PrivateRoute';
import './css/style.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SnippetContext} from './util/snippetContext';
import { ContextType } from './components/snippets/Interfaces'


function App() {


  const {getFromFirebaseStorage, currentUser} = useContext(SnippetContext) as ContextType


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
          { currentUser !=="noUser" &&  <Route path="/uploadforms" element={<UploadForms/>} />}
         
           {/* <PrivateRoute path="/uploadforms" element={<UploadForms/>} /> */}
          <Route path="/tutorials"element={<TutorialsList />} />
          <Route path="/snippets"element={ <SnippetsList />} />
          <Route path="/faq"element={<Faq />} />  
           <Route path='/signup' element={<Signup />} />
           <Route path='/login' element={<Login />} />
           <Route path='/forgot-password' element={<ForgotPassword />} />
         
        </Routes>
        
      </div>
    </Router> 
    </>
  );
}

export default App;
