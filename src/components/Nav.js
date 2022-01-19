import React, { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import "./../css/nav.css";
import logo from "./../images/logo-coderjook.png";
import { SnippetContext } from '../util/snippetContext';


export default function Nav() {
    const [navAdmin, setNavAdmin] = useState(false)
    const { loggedIn, currentUser } = useContext(SnippetContext);

    useEffect(() => {
        console.log('user-nav:', currentUser);
        if (currentUser === 'noUser') {
            setNavAdmin(false)
        } else {
            setNavAdmin(true)
        }
    }, [currentUser])

    return (
        <>
        <nav className="nav" id="hamnav">
            <div className="container row">
          
                <div className="logo">
                    <img src={logo} alt="logo coderjook" />
                </div>
                 
                 <ul id="hamitems">
                    <li>
                    <Link to="/" className="link">
                        Home
                    </Link>
                    </li>
                    <li>
                    <Link to="/tutorials" className="link">
                        handleidingen
                    </Link>
                    </li>
                    <li>
                    <Link to="/snippets" className="link">
                        snippets
                    </Link>
                    </li>        
                    <li>
                    <Link to="/faq" className="link">
                        FAQ
                    </Link>
                    </li>
                    <li>
                    {currentUser === 'noUser'
                    ?
                     <Link to="/login" className="link">
                        login
                     </Link> 
                     :  
                     <Link to="/uploadForms" className="link">
                        admin
                     </Link>
                    }   
                    </li>
                    <li>
                        {currentUser === 'noUser' ? <>niet ingelogd</> : <>ingelogd: {currentUser.email}</>}
                    </li>
                </ul>
            
            </div>
        </nav>

        <nav className="navfooter">
            <Link to="/" className="nav__link">
                <i className="material-icons nav__icon">home</i>
                <span className="nav__text">Home</span>
            </Link>
            <Link to="/tutorials" className="nav__link">
                <i className="material-icons nav__icon">article</i>
                <span className="nav__text">Tutorials</span>
            </Link>
            <Link to="/snippets" className="nav__link">
                <i className="material-icons nav__icon">code</i>
                <span className="nav__text">Codesnippets</span>
            </Link>
            <Link to="/faq" className="nav__link">
                <i className="material-icons nav__icon">help_outline</i>
                {/* <span class="material-icons-outlined nav__icon">help_outline</span> */}
                <span className="nav__text">FAQ</span>
            </Link>
            {navAdmin ?
            <Link to="/uploadforms" className="nav__link">
                <i className="material-icons nav__icon">settings</i>
                <span className="nav__text">admin</span>
            </Link>
            :
            <Link to="/login" className="nav__link">
                <i className="material-icons nav__icon">settings</i>
                <span className="nav__text">Log in</span>
            </Link>
            }
        </nav>

        </>
    )
}
