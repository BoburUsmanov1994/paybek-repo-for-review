import React from 'react';
import styled from "styled-components";
import BounceLoader from "react-spinners/BounceLoader";
const StyledContentLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  height: ${({height}) => height || 'auto'};
`;
const ContentLoader = ({show = false,color='#0085FF',...props}) => {
    return (
        <StyledContentLoader {...props}>
            <BounceLoader color={color} loading={true}  size={75} />
        </StyledContentLoader>
    );
};

export default ContentLoader;
