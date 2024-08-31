import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header>
            <ul>
                <li>Quenay</li>
                <li>{`returned questions {count}`}</li>
                <li>Unsent messages</li>
            </ul>

        </header>
    );
};

export default Header;