import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <header className="Header">
                <h1>Misletter <a href="https://github.com" target="_blank"><i class="fab fa-github"></i></a></h1>
            </header>
        );
    }
}

export default Header;
