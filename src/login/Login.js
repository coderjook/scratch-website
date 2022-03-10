import React, {useRef, useState, useContext }from 'react';
import { SnippetContext } from '../util/snippetContext';
import { ContextType} from '../components/snippets/Interfaces';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
  
    const { login, currentUser } = useContext(SnippetContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    console.log('user-login:', currentUser);
    async function handleSubmit(e) {
        e.preventDefault();


        try{
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value)
            navigate('/uploadforms');
        } catch {
            setError('Failed to log in')
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

                        <div className="inputfield">
                        <label htmlFor='password'>Wachtwoord</label>
                        <input
                            type={`password`}
                            className="input"
                            name='password'
                            placeholder='password'
                            ref={passwordRef}
                            required
                        ></input>
                        </div>

                 
                        <input type="submit" value="inloggen" className="btn" />    
                        <div className="w-100 text-center mt-3">
                            <Link to="/forgot-password">wachtwoord vergeten?</Link> | 
                            <Link to="/">sluit scherm</Link>
                        </div>                    
                    </form>
                    
                </div>
            </section>
        </div>


        </>
    )
}

