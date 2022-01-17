import React, {useRef, useState }from 'react';
import {Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../util/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {currentUser, updateEmail, updatePassword } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const history = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match')
        }

        // eerst moeten alle promises wordt uitgevoerd, voordat er eventueel een error komt
        const promises = [];
        setLoading(true);
        if (emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
        }

        if(passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value))
        }

        // als alle promises zijn uitgevoerd, dan naar het dashboard
        Promise.all(promises).then(() => {
            history.push("/")
        }).catch(() => {
            setError('Failed to update account')
        }).finally(() => {
            setLoading(false)
        });
   
   
    }

    return (
        <>
          <Card>
              <Card.Body>
                  {/* {currentUser.email} */}
                  <h2 className='text-center mb-4'>Update Profile</h2>
                  {error && <Alert variant='danger'>{error}</Alert>}
                  <Form onSubmit={handleSubmit}>
                      <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required defaultValue={currentUser.email} />
                      </Form.Group>
                       <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} placeholder='Leave blank to keep the same'/>
                      </Form.Group>
                       <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type='password' ref={passwordConfirmRef} placeholder='Leave blank to keep the same'/>
                      </Form.Group>
                      <Button  disabled={loading} className='w-100'type='submit'> Update</Button>
                  </Form>
              </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
               <Link to='/'>Cancel</Link>
          </div>
        </>
    )
}


