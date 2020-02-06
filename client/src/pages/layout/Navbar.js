import React from 'react';


const Navbar = () => {

    const navbarStyle = {
        borderBottom:"1px solid lightgrey",
        height: "70px",
        lineHeight: "70px",
        whiteSpace: "nowrap"
    }


    return (
        <nav style = {navbarStyle} className="navbar">
            <h1>Spotify music guesser</h1>
        </nav>
    )
}

export default Navbar;