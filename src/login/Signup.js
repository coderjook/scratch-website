import React, {useRef, useState, useContext }from 'react';
import {Form, Button, Card, Alert } from 'react-bootstrap';
import { SnippetContext } from '../util/snippetContext';
import { ContextType} from '../components/snippets/Interfaces';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup, currentUser } = useContext(SnippetContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const history = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        console.log('handleSubmit: ',emailRef.current.value, passwordRef.current.value)

        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match')
        }
        try{
             console.log('handleSubmit: in de try ', emailRef.current.value, passwordRef.current.value)
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value)
           
            // history.push("/")

        } catch {
            setError('Failed to create an account')
        }
        setLoading(false);
    }

    return (
        <>
          <Card>
              <Card.Body>
                  {currentUser && currentUser.email}
                  <h2 className='text-center mb-4'>Sign Up</h2>
                  {error && <Alert variant='danger'>{error}</Alert>}
                  <Form onSubmit={handleSubmit}>
                      <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required />
                      </Form.Group>
                       <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} required />
                      </Form.Group>
                       <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type='password' ref={passwordConfirmRef} required />
                      </Form.Group>
                      <Button  disabled={loading} className='w-100'type='submit'> Sign in</Button>
                  </Form>
              </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
              Already have an account? <Link to='/login'>Login</Link>
          </div>
        </>
    )
}
