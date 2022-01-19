import React, {useRef, useState, useContext }from 'react';
import {Form, Button, Card, Alert } from 'react-bootstrap';
import { SnippetContext } from '../util/snippetContext';
import { ContextType} from '../components/snippets/Interfaces';
import { Link, useNavigate } from 'react-router-dom';

const initialInputState = {
    emailadres: 'jook',
    password: 'ja',
    passwordConfirm: 'ja'
}

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup, currentUser } = useContext(SnippetContext);
    const { newUser, setNewUser} = useState(initialInputState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    async function handleSubmit(e) {
        e.preventDefault();
        console.log('handleSubmit: ',emailRef.current.value, passwordRef.current.value)
        console.log('user-signup:', currentUser);

        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Wachtwoorden komen niet overeen')
        }
        try{
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate('/uploadforms');


        } catch {
            setError('Aanmaken nieuw account mislukt.')
        }
        setLoading(false);
    }

    return (
        <>
           <div className='modal'>
            <section className="login">
                <div className="container">
                    

                    <form className="form" onSubmit={handleSubmit}>
                        <h2>Registreer gebruiker</h2>
                        {error && <div>{error}</div>}
                        <div className="inputfield">
                        <label htmlFor="emailadres">Emailadres</label>
                        <input
                            type="email"
                            className="input"
                            name="emailadres"
                            placeholder="emailadres"
                            // onChange={handleInputChange}
                            // value={newUser.emailadres}
                            ref={emailRef}
                            required
                        ></input>
                        </div>

                        <div className="inputfield">
                        <label htmlFor='password'>Wachtwoord</label>
                        <input
                            type={`password`}
                            className="input"
                            name='password'
                            placeholder='password'
                            // onChange={handleInputChange}
                            // value={newUser.password}
                            ref={passwordRef}
                            required
                        ></input>
                        </div>

                        <div className="inputfield">
                        <label htmlFor="passwordConfirm">Herhaal wachtwoord</label>
                        <input
                            type={`password`}
                            className="input"
                            name="passwordConfirm"
                            placeholder="passwordConfirm"
                            // onChange={handleInputChange}
                            // value={newUser.passwordConfirm}
                            ref={passwordConfirmRef}
                            required
                        ></input>
                        </div>
                        <input type="submit" value="registreren" className="btn" /> 
                        <div className="w-100 text-center mt-3">
                            <Link to="/uploadforms">sluit scherm</Link>
                        </div>                       
                    </form>
                </div>
            </section>
        </div>



          
        </>
    )
}
