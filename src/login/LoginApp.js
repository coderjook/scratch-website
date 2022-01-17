import React from 'react';
import Signup from './Signup'; 
import Dashboard from './Dashboard';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import PrivateRoute from './PrivateRoute';
import UpdateProfile from './UpdateProfile'
import { Container } from 'react-bootstrap';
import {AuthProvider } from '../util/AuthContext';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// Thanks to Web dev Simplified! Great tutorial on https://www.youtube.com/watch?v=PKwu15ldZ7k
// installeer firebase, bootstrap, react-router-dom

function LoginApp() {
  return (
    <div >
      
        <Container  className='d-flex align-items-center justify-content-center'
                    style={{minHeight: '100vh' }}>
          <div className='w-100' style={{maxWidth: "400px"}}>
            <Router>
                <AuthProvider>
                  <Routes>
                    <PrivateRoute exact path="/" component={Dashboard} />
                    <PrivateRoute path="/update-profile" component={UpdateProfile} />
                    <Route path='/signup' component={Signup} />
                    <Route path='/login' component={Login} />
                    <Route path='/forgot-password' component={ForgotPassword} />
                  </Routes>
                </AuthProvider>
            </Router>
            
          </div>
        </Container>
       
    </div>
  );
}

export default LoginApp;
