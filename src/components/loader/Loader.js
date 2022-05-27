import React from 'react';
import styled from "styled-components";
import FadeLoader from "react-spinners/FadeLoader";
const StyledLoader = styled.div`
  height: 100vh;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  background-color: rgba(255,255,255,0.65);
  z-index: 9999;
`;
const Loader = ({show = false,color='#0085FF',props}) => {
    return (
        <StyledLoader {...props}>
            <FadeLoader color={color} loading={true}  size={150} />
        </StyledLoader>
    );
};

export default Loader;
