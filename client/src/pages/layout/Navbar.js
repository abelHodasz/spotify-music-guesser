import React from 'react';


const Navbar = () => {

    const navbarStyle = {
        borderBottom:"1px solid lightgrey",
        height: "70px",
        lineHeight: "70px",
        whiteSpace: "nowrap"
    }

    const appNameStyle = {
        fontSize: "36px",
        margin: "5px 0px",
        padding: "40px 40px"
    }

    return (
        <nav style = {navbarStyle} className="navbar">
            <span style = {appNameStyle} className="navbar-name">Spotify music guesser</span>
        </nav>
    )
}

export default Navbar;