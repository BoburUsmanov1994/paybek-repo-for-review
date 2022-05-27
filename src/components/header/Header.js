import React from 'react';
import styled from "styled-components";
import {Row} from "../grid";
import Logo from "../logo";
import Menu from "../menu";
import Profile from "../profile";
import {NavLink} from "react-router-dom";
import {ReactSVG} from "react-svg";
import arrowSettings from "../../assets/images/icons/settings.svg";
import HasAccess from "../../services/auth/HasAccess";

const StyledHeader = styled.header`
  padding: 7px 19px 9px;
  background-color: #fff;

  nav {
    margin-left: 118px;
    a{
      color: #585757;
      font-size: 16px;
      font-weight: 500;
      margin-right: 44px;
      text-decoration: none;
      transition: 0.3s ease;
      &:hover{
        color: #0085FF;
      }
      &.active{
        color: #0085FF;
      }
      &:last-child{
        margin-right: 0;
      }
    }
  }
  .settings{
    margin-left: 20px;
    &.active{
      svg{
        path{fill: #0085FF !important;}
      }
    }
  }
`;

const Header = ({user, ...props}) => {
    return (
        <StyledHeader {...props} className={'no-print'}>
            <Row align={'center'} justify={'space-between'}>
                <Row align={'center'}>
                    <Logo/>
                    <Menu/>
                </Row>
                <Row align={'flex-end'}>
                    <Profile user={user}/>
                    <HasAccess>{
                        ({userCan, departments}) => userCan(departments, 'PROFILE') &&
                            <NavLink className={'settings'} to={'/settings'}><ReactSVG src={arrowSettings}/></NavLink>
                    }
                    </HasAccess>
                </Row>
            </Row>
        </StyledHeader>
    );
};

export default Header;
