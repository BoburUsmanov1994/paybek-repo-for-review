import React from 'react';
import styled,{css} from "styled-components";
import {ReactSVG} from "react-svg";
import increaseIcon from "../../assets/images/icons/grow.svg";

const StyledGrowth = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 5px 8px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 13px;
  .icon{
    margin-left: 6px;
  }
  color: #00BA34;
  .icon{
    transform: rotate(45deg);
  }
  background: linear-gradient(0deg, rgba(0, 186, 52, 0.1), rgba(0, 186, 52, 0.1)), #FFFFFF;
  ${({increase}) => increase && css`
    .icon{
      transform: rotate(0deg);
    }
  `};
  ${({decrease}) => decrease && css`
    .icon{
      transform: rotate(90deg);
    }
  `};
`;

const Growth = ({children,increase  = false,decrease=false, ...props}) => {
    return (
        <StyledGrowth increase={increase} decrease={decrease} {...props}>{children}  <ReactSVG className={'icon'} src={increaseIcon}/></StyledGrowth>
    );
};

export default Growth;
