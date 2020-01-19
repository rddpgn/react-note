import React, { Component } from 'react';
import './Header.scss';

export class Header extends Component {
    render() {
        return (
            <header className='header'>
                <button>Login</button>
                <button>Sign In</button>
            </header>
        )
    }
}

export default Header;
