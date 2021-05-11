import React from 'react';
import * as classes from './Nav.module.css';

const Nav = () => {
    return (
        <nav className={classes.nav}>
            <a href="">Home</a>
            <a href="">Games</a>
            <a href="">Library</a>
            <a href="">Learn</a>
        </nav>
    )
}

export default Nav