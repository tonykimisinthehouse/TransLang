import React from 'react';
import './index.css';
import { Link } from "react-router-dom";

function Header() {
    return(
        <div className="header">
            <span className="brand-title">Translang</span>
            <ul>
            <li>
                Home
            </li>
            <li>
                Profile
            </li>
            </ul>
      </div>
    )
}


export default Header;