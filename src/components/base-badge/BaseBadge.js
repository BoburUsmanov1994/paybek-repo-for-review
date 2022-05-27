import React from 'react';
import styled, {css} from "styled-components";

const StyledBaseBadge = styled.span`
  display: inline-block;
  border-radius: 96px;
  color: #fff;
  padding: 4px;
  font-size: 10px;
  font-weight: 600;
  ${({primary}) => primary && css`
    background-color: #0085FF;
  `};
  ${({lg}) => lg && css`
    padding: 4px 8px;
  `};
`;

const BaseBadge = (props) => {
    return (
        <StyledBaseBadge {...props} />
    );
};

export default BaseBadge;
