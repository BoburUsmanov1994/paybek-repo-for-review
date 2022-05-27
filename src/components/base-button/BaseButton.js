import React from 'react';
import styled,{css} from "styled-components";
import {ReactSVG} from "react-svg";
import chevronIcon from "../../assets/images/icons/chevron.svg";

const StyledBaseButton = styled.button`
  border: none;
  outline: none;
  text-decoration: none;
  border-radius: 8px;
  background-color: #8A8D9D;
  color: #fff;
  padding: 8px 12px;
  cursor: pointer;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 2px 1px rgba(0, 0, 0, 0.06), 0px 1px 1px rgba(0, 0, 0, 0.08);
  font-size: 16px;
  min-width:${({width}) => width || '125px'};
  .chevron{
    margin-left: 15px;
  }
  margin:${({margin}) => margin || '0px'};
  &[disabled]{
    cursor: not-allowed;
  }

  ${({primary}) => primary && css`
    background-color: #0085FF;
  `};

  ${({success}) => success && css`
    background-color: #53AC92;
  `};

  ${({info}) => info && css`
    background-color: #9247B5;
  `};

  ${({danger}) => danger && css`
    background-color: #EC536A;
  `};

  ${({medium}) => medium && css`
    font-weight: 500;
  `};

  ${({outlined}) => outlined && css`
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.06);
    border: 1px solid #E8E8E8;
    background-color: transparent;
    display: inline-flex;
    color: #1C1C1C;
    font-weight: 500;
  `};
`;
const BaseButton = ({children,outlined = false,type='button',handleClick = () => {},disabled,...props}) => {
  return <StyledBaseButton onClick={handleClick} outlined={outlined} type={type} disabled={disabled}  {...props} >{children} {outlined && <ReactSVG className={'chevron'} src={chevronIcon}/>}</StyledBaseButton>
};

export default BaseButton;
