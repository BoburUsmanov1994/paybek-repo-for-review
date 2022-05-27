import React from 'react';
import styled, {css} from "styled-components";

const StyledText = styled.span`
  display: inline-block;
  color: #585757;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  padding: ${({padding}) => padding || '0px'};
  margin: ${({margin}) => margin || '0px'};
  ${({danger}) => danger && css`
    color: #E92C2C;
  `};
  ${({tangerine}) => tangerine && css`
    color: #F79E1B;
  `};
  ${({dark}) => dark && css`
    color: #1C1C1C;
  `};
  ${({light}) => light && css`
    color: #fff;
  `};

  ${({gray}) => gray && css`
    color: #969696;
  `};
  
  ${({success}) => success && css`
    color: #53AC92;
  `};

  ${({primary}) => primary && css`
    color: #0052B4;
  `};

  ${({danger}) => danger && css`
    color: #D80027;
  `};

  ${({medium}) => medium && css`
    font-weight: 500;
  `};

  ${({bold}) => bold && css`
    font-weight: 700;
  `};

  ${({large}) => large && css`
    font-size: 18px;
  `};

  ${({xl}) => xl && css`
    font-size: 20px;
  `};

  ${({small}) => small && css`
    font-size: 14px;
  `};

  ${({xs}) => xs && css`
    font-size: 12px;
  `};
`;

const Text = (props) => {
    return <StyledText {...props} />
}

export default Text;
