import React from 'react';
import {Col, Container, Row} from "react-grid-system";
import Sidebar from "../../../components/sidebar";
import {MenuItem} from "../../../components/menu";
import listIcon from "../../../assets/images/icons/list.svg";
import HasAccess from "../../../services/auth/HasAccess";

const PgInnerLayout = ({children}) => {
    return (
        <Container fluid className={'pt-25'}>
            <Row>
                <Col xs={2}>
                    <HasAccess>
                        {({userCan, pages}) => (userCan(pages,'pg') &&
                            <Sidebar>
                                    <MenuItem icon={listIcon} url={'/pg'}>PG</MenuItem>
                            </Sidebar>
                        )
                        }
                    </HasAccess>
                </Col>
                <Col xs={10}>
                    {children}
                </Col>
            </Row>
        </Container>
    );
};

export default PgInnerLayout;
