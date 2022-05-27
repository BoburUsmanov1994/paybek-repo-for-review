import React from 'react';
import {Col, Container, Row} from "react-grid-system";
import Sidebar from "../../../components/sidebar";
import {MenuItem} from "../../../components/menu";
import securityIcon from "../../../assets/images/icons/security.svg";
import usersIcon from "../../../assets/images/icons/group.svg";
import groupIcon from "../../../assets/images/icons/users.svg";
import notificationIcon from "../../../assets/images/icons/chat.svg";
import galleryIcon from "../../../assets/images/icons/gallery.svg";
import HasAccess from "../../../services/auth/HasAccess";
import allUsersIcon from '../../../assets/images/icons/all-users.svg';


const UsersInnerLayout = ({children}) => {

    return (
        <Container fluid className={'pt-25'}>
            <Row>
                <Col xs={2}>
                    <HasAccess>
                        {({userCan, pages}) => (
                            <Sidebar>
                                {userCan(pages,'all') && <MenuItem icon={allUsersIcon} url={'/users/all'}
                                          activeUrls={['/users', '/users/all']}>All Users</MenuItem>}
                                {userCan(pages,'active') && <MenuItem icon={usersIcon} url={'/users/active'}>Active</MenuItem>}
                                {userCan(pages,'inactive') && <MenuItem icon={groupIcon} url={'/users/inactive'}>Inactive</MenuItem>}
                                {userCan(pages,'blocked') && <MenuItem icon={securityIcon} url={'/users/blocked'}>Blocked</MenuItem>}
                                {userCan(pages,'push_notification') && <MenuItem icon={notificationIcon} url={'/users/notifications'}>Push
                                    Notifications</MenuItem>}
                                {userCan(pages,'events') && <MenuItem icon={galleryIcon} url={'/users/events'}>Events</MenuItem>}
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

export default UsersInnerLayout;
