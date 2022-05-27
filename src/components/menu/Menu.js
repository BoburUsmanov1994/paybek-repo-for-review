import React from 'react';
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import HasAccess from "../../services/auth/HasAccess";

const StyledMenu = styled.nav`

`;
const Menu = ({
                  items = []
              }) => {
    return (
        <StyledMenu>
            <HasAccess>
                {({departments, userCan}) =>
                    <>
                        {userCan(departments, 'HOME') && <NavLink to={'/'} exact> Home </NavLink>}
                        {userCan(departments, 'USERS') && <NavLink to={'/users'} > Users </NavLink>}
                        {userCan(departments, 'TXNS') && <NavLink to={'/txns'} > TXNS </NavLink>}
                        {userCan(departments, 'PG') && <NavLink to={'/pg'} > PG </NavLink>}
                        {userCan(departments, 'ACCOUNTS') && <NavLink to={'/accounts'} > Account </NavLink>}
                    </>
                }
            </HasAccess>
        </StyledMenu>
    );
};

export default Menu;
