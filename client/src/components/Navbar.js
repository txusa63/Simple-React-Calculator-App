import React from 'react';
import { Navbar as RSNavbar, NavbarBrand } from 'reactstrap';

export const Navbar = () => {
    
    return (
        <div>
            <RSNavbar color='secondary' light expand='md' >
                <NavbarBrand>CALCULATOR</NavbarBrand>
            </RSNavbar>
            <br />
        </div>
    )
}
