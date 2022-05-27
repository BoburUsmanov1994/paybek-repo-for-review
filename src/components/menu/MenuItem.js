import React from 'react';
import styled from "styled-components";
import {NavLink, useLocation} from "react-router-dom";
import {ReactSVG} from "react-svg";
import {includes, isEmpty} from "lodash";
import Text from "../text";
import Flex from "../flex";
import BaseBadge from "../base-badge";

const StyledMenuItem = styled.div`
  .menu-link {
    display: flex;
    align-items: center;
    padding: 10px 13px;
    text-decoration: none;
    margin-top: 10px;
    .w-100{
      width: 100%;
    }

    &.active {
      background: #E5F3FF;
      .menu-icon{
        svg{
          path{
            fill: #0085FF;
          }
        }
      }
      .menu-text{
        color: #1C1C1C;
        font-weight: 700;
      }
    }
    .menu-icon{
      width: 20px;
      height: 20px;
      margin-right: 15px;
    }
  }
`;

const MenuItem = ({children, icon, url = '/', activeUrls = [], badge,count=0, exact = false, ...props}) => {
    const {pathname} = useLocation();
    return (
        <StyledMenuItem {...props}>
            {isEmpty(activeUrls) ? <NavLink className={'menu-link'} to={url} exact={exact}>
                    <Flex justify={'space-between'} className={'w-100'}>
                        <Flex>
                            <ReactSVG className={'menu-icon'} src={icon}/>
                            <Text className={'menu-text'}>{children}</Text>
                        </Flex>
                        {badge && <BaseBadge lg primary>{count}</BaseBadge>}
                    </Flex>
                </NavLink> :
                <NavLink className={'menu-link'} to={url} isActive={() => includes(activeUrls, pathname)} exact={exact}>
                    <Flex justify={'space-between'} className={'w-100'}>
                        <Flex>
                            <ReactSVG className={'menu-icon'} src={icon}/>
                            <Text className={'menu-text'}>{children}</Text>
                        </Flex>
                        {badge && <BaseBadge lg primary>{count}</BaseBadge>}
                    </Flex>
                </NavLink>}
        </StyledMenuItem>
    );
};

export default MenuItem;
