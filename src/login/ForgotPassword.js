import React, {useRef, useState, useContext}from 'react';
import {Form, Button, Card, Alert } from 'react-bootstrap';
import { SnippetContext } from '../util/snippetContext';
import { ContextType} from '../components/snippets/Interfaces';
import { Link} from 'react-router-dom';

export default function ForgotPassword() {
    const emailRef = useRef();
    const { resetPassword } = useContext(SnippetContext);
   
  
    const { login, currentUser } = useContext(SnippetContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
  

    async function handleSubmit(e) {
        e.preventDefault();


        try{
            setMessage('')
            setError('');
            setLoading(true);
             await resetPassword(emailRef.current.value)
             setMessage('Je ontvangt een email met instructies')
           
        } catch {
            setError('Wijzigen wachtwoord mislukt')
        }
        setLoading(false);
    }

    return (
        <>

        <div className='modal'>
            <section className="login">
                <div className="container">
                    

                    <form className="form" onSubmit={handleSubmit}>
                        <h2>Login</h2>
                         {error && <div>{error}</div>}
                        {message && <div>{message}</div>}
                        <div className="inputfield">
                        <label htmlFor="emailadres">Emailadres</label>
                        <input
                            type="text"
                            className="input"
                            name="emailadres"
                            placeholder="emailadres"
                            ref={emailRef}
                            required
                        ></input>
                        </div>

                               
                        <input type="submit" value="reset wachtwoord" className="btn" disabled={loading} />    
                        <div className="w-100 text-center mt-3">
                            <Link to="/login">inloggen | </Link>
                            <Link to="/"> sluit scherm</Link>
                        </div>                    
                    </form>
                    
                </div>
            </section>
        </div>
         
        </>
    )
}