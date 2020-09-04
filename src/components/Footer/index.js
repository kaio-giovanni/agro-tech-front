import React from 'react';
import './style.css';

const Footer = (props) => {
    return (
        <footer>
            <p className="copyright">
                © {new Date().getFullYear()} Agro Tech
            </p>
        </footer>
    );
}

export default Footer;