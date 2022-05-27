import React from 'react';
import styled from "styled-components";
import { ReactSVG } from 'react-svg'
import {get} from "lodash";
import Avatar from "../avatar";
import avatar from "../../assets/images/avatar.png";
import arrowDown from "../../assets/images/icons/arrow-down.svg";
import Text from "../text";
import {Row} from "../grid";

const StyledProfile = styled.div`
.text{
  margin-left: 8px;
}
  svg{
    margin-left: 10px;
    margin-bottom: 1px;
  }
`;
const Profile = ({user,...props}) => {
    return (
        <StyledProfile {...props}>
            <Row align={'center'}>
                <Avatar small online logo={get(user,'photoUrl',avatar)} />
                <Text medium dark className={'text'}>{get(user,'firstName',null)}</Text>
                <ReactSVG src={arrowDown}   />
            </Row>
        </StyledProfile>
    );
};

export default Profile;
