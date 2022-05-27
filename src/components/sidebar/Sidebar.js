import React from 'react';
import styled from "styled-components";

const StyledSidebar = styled.aside`
 
`;
const Sidebar = ({children, ...props}) => {
    return (
        <StyledSidebar {...props}>
            {children}
        </StyledSidebar>
    );
}

export default Sidebar;
