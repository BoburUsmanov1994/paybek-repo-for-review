import React from 'react';
import {Col, Container, Row} from "react-grid-system";
import Sidebar from "../../../components/sidebar";
import {MenuItem} from "../../../components/menu";
import groupIcon from "../../../assets/images/icons/users.svg";
import accountsIcon from "../../../assets/images/icons/list.svg";
import HasAccess from "../../../services/auth/HasAccess";

const SettingsInnerLayout = ({children}) => {
    return (
        <Container fluid className={'pt-25'}>
            <Row>
                <Col xs={12}>
                    <Row>
                        <Col xs={2}>
                            <Sidebar>
                                <HasAccess>
                                    {
                                        ({userCan, pages}) => userCan(pages, 'accounts') &&
                                            <MenuItem icon={groupIcon} url={'/accounts'}
                                                      activeUrls={['/accounts', '/accounts/create']}
                                                      exact>Accounts</MenuItem>
                                    }
                                </HasAccess>
                                <HasAccess>
                                    {
                                        ({userCan, pages}) => userCan(pages, 'account_types') &&
                                            <MenuItem icon={accountsIcon} url={'/accounts/types'}
                                                      activeUrls={['/accounts/types', '/accounts/types/create']}
                                                      exact>Account
                                                Types</MenuItem>
                                    }
                                </HasAccess>

                            </Sidebar>
                        </Col>
                        <Col xs={10}>
                            {children}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default SettingsInnerLayout;
