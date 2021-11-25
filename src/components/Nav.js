import React from 'react';
import { Link } from "react-router-dom";
import "./../css/nav.css";
import logo from "./../images/logo-coderjook.png";


export default function Nav() {
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
                    <Link to="/uploadforms" className="link">
                        upload forms
                    </Link>
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
            <Link to="/uploadforms" className="nav__link">
                <i className="material-icons nav__icon">settings</i>
                <span className="nav__text">Toevoegen</span>
            </Link>
        </nav>

        </>
    )
}
