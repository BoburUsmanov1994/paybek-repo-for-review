import React from 'react';
import styled, {css} from "styled-components";

const StyledTitle = styled.h2`
  color: #1C1C1C;
  font-size: 16px;
  font-weight: 500;
  padding: ${({padding}) => padding || '0px'};
  margin: ${({margin}) => margin || '0px'};
  ${({lg}) => lg && css`
    font-size: 32px;
  `};
  ${({md}) => md && css`
    font-size: 24px;
  `};
  ${({sm}) => sm && css`
    font-size: 16px;
  `};
  ${({gray}) => gray && css`
    color: #585757;
  `};
  @media (max-width: 1600px) {
    font-size: 18px;
  }
`;

const Title = (props) => {
    return (
        <StyledTitle {...props}/>
    );
}

export default Title;
