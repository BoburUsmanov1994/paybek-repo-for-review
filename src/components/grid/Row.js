import React from 'react';
import styled from 'styled-components';

const StyledRow = styled.div`
  display: flex;
  flex-direction: ${({column}) => column ? 'column' : 'row'};
  justify-content: ${({justify}) => justify || 'flex-start'};
  align-items: ${({align}) => align || 'stretch'};
  flex-wrap: ${({wrap}) => wrap ? 'wrap' : 'no-wrap'};
  height: ${({height}) => height || 'auto'};
  width: ${({sidebar,width}) => width ? width : sidebar ? `calc(100% - ${sidebar}px)` : 'auto'};
  padding: ${({padding}) => padding || '0px'};
  margin: ${({margin}) => margin || '0px'};
`;

const Row = (props) => {
    return <StyledRow {...props} />;
};

export default Row;
