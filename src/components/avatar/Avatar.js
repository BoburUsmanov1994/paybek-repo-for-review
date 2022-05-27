import React from 'react';
import styled, {css} from "styled-components";
import avatar from "../../assets/images/avatar.png";
const StyledAvatar = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  
  img {
    position: absolute;
    border-radius: 50%;
    z-index: 1;
    width: 100%;
    height: 100%;
    object-fit: contain;
    border:1px solid #E8E8E8;
  }

  .online {
    display: inline-block;
    width: 15px;
    height: 15px;
    padding: 3px;
    background-clip: content-box;
    background-color: #00BA34;
    border-radius: 50%;
    bottom: -5px;
    right: -5px;
    position: absolute;
    z-index: 11;
  }

  ${({small}) => small && css`
    width: 32px;
    height: 32px;
  `};
`;

const Avatar = ({logo = avatar, online, ...props}) => {
    return (
        <StyledAvatar {...props}>
            <img src={logo} alt="avatar"/>
            {online && <span className={'online'}></span>}
        </StyledAvatar>
    );
};

export default Avatar;
