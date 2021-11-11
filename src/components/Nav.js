import React from 'react';
import { Link } from "react-router-dom";
import "./../css/nav.css";
import logo from "./../images/logo-coderjook.png";


export default function Nav() {
    return (
        <div className="nav">
            <div className="container row">
                <div className="logo">
                    <img src={logo} alt="logo coderjook" />
                </div>
                <ul>
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
                    <Link to="/uploadtutorials" className="link">
                        voeg tutorials toe
                    </Link>
                    </li>
      </ul>
            </div>
        </div>
    )
}
