import React from 'react';
import {Container, Row,Col} from "react-grid-system";
import Sidebar from "../../../components/sidebar";
import {MenuItem} from "../../../components/menu";
import accountsIcon from "../../../assets/images/icons/assignment.svg";
import groupIcon from "../../../assets/images/icons/users.svg";
import HasAccess from "../../../services/auth/HasAccess";

const SettingsInnerLayout = ({children}) => {
    return (
        <Container fluid className={'pt-25'}>
            <Row>
                <Col xs={2}>
                    <Sidebar>
                        <HasAccess>
                            {({userCan, pages}) => (<>
                                {userCan(pages, 'my_account') &&
                                <MenuItem icon={accountsIcon} url={'/settings'}>My account</MenuItem>}
                                {userCan(pages, 'logout') && <MenuItem icon={groupIcon} url={'/logout'}>Log out</MenuItem>}
                            </>)
                            }
                        </HasAccess>
                    </Sidebar>
                </Col>
                <Col xs={10}>
                    {children}
                </Col>
            </Row>
        </Container>
    );
};

export default SettingsInnerLayout;
