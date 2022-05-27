import React from 'react';
import {Link} from "react-router-dom";
import { ReactSVG } from 'react-svg';
import logo from "../../assets/images/logo.svg";

const Logo = () => {
    return (
        <Link to={'/'}>
            <ReactSVG src={logo}  />
        </Link>
    );
};

export default Logo;
