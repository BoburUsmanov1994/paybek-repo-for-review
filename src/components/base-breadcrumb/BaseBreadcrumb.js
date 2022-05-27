import React from 'react';
import {Link} from 'react-router-dom';
import styled from "styled-components";
import BaseList from "../base-list";
import Title from "../title";

const StyledBaseBreadcrumb = styled.ul`
  margin-bottom: 15px;
li{
  list-style-type: none;
  display: inline-flex;
  align-items: center;
  a{
    text-decoration: none;
  }
  .arrow{
    font-size: 36px;
    margin-left: 10px;
    margin-right: 10px;
  }
  h2{
    margin-bottom: 0;
    padding-left: 0;
  }
}
`;

const BaseBreadcrumb = ({items = [],...props}) => {
    return (
        <StyledBaseBreadcrumb {...props}>
            <BaseList items={items}>
                {({id,url,name},index)=><li key={id}><Link to={items.length != index+1 ? url:'#'}><Title>{name}</Title></Link> {items.length != index+1 && <span className={'arrow'}>-></span>} </li>}
            </BaseList>
        </StyledBaseBreadcrumb>
    );
};

export default BaseBreadcrumb;
