import React from 'react';
import {BrowserRouter as WebRouter, Redirect, Route, Switch} from "react-router-dom";
import history from './history';
import LoginPage from "../modules/auth/pages/LoginPage";
import LayoutManager from "../layouts/LayoutManager";
import HomePage from "../modules/home/pages/HomePage";
import ProfilePage from "../modules/settings/pages/ProfilePage";
import AccountsPage from "../modules/accounts/pages/AccountsPage";
import PgPage from "../modules/pg/pages/PgPage";
import InnerLayoutManager from "../layouts/InnerLayoutManager";
import PgGroupEditPage from "../modules/pg/pages/PgGroupEditPage";
import UsersBlockedPage from "../modules/users/pages/UsersBlockedPage";
import UsersActivePage from "../modules/users/pages/UsersActivePage";
import UserDetailPage from "../modules/users/pages/UserDetailPage";
import UsersInactivePage from "../modules/users/pages/UsersInactivePage";
import UsersEventsPage from "../modules/users/pages/UsersEventsPage";
import AuthLoader from "../services/auth/AuthLoader";
import IsAuth from "../services/auth/IsAuth";
import IsGuest from "../services/auth/IsGuest";
import LogoutPage from "../modules/auth/pages/LogoutPage";
import NotFoundPage from "../modules/auth/pages/NotFoundPage";
import AccountTypesPage from "../modules/accounts/pages/AccountTypesPage";
import AccountTypeCreatePage from "../modules/accounts/pages/AccountTypeCreatePage";
import AccountCreatePage from "../modules/accounts/pages/AccountCreatePage";
import SetPasswordPage from "../modules/auth/pages/SetPasswordPage";
import ForgotPasswordPage from "../modules/auth/pages/ForgotPasswordPage";
import HasAccess from "../services/auth/HasAccess";
import ForbiddenPage from "../modules/auth/pages/ForbiddenPage";
import AccountEditPage from "../modules/accounts/pages/AccountEditPage";
import AccountTypeEditPage from "../modules/accounts/pages/AccountTypeEditPage";
import TxnsPage from "../modules/txns/pages/TxnsPage";
import TxnsCompletedPage from "../modules/txns/pages/TxnsCompletedPage";
import TxnsHoldPage from "../modules/txns/pages/TxnsHoldPage";
import TxnsFailedPage from "../modules/txns/pages/TxnsFailedPage";
import TxnsRefundedPage from "../modules/txns/pages/TxnsRefundedPage";
import TxnsDetailPage from "../modules/txns/pages/TxnsDetailPage";
import UserNotificationsPage from "../modules/users/pages/UserNotificationsPage";
import UsersEventCreatePage from "../modules/users/pages/UsersEventCreatePage";
import SuccessfulNotificationPage from "../modules/users/pages/SuccessfulNotificationPage";
import CancelledNotificationPage from "../modules/users/pages/CancelledNotificationPage";
import ScheduledNotificationPage from "../modules/users/pages/ScheduledNotificationPage";
import SuccessfulEventPage from "../modules/users/pages/SuccessfulEventPage";
import ScheduledEventPage from "../modules/users/pages/ScheduledEventPage";
import CancelledEventPage from "../modules/users/pages/CancelledEventPage";
import StartedEventPage from "../modules/users/pages/StartedEventPage";
import PgEditPage from "../modules/pg/pages/PgEditPage";
import AllUsersPage from '../modules/users/pages/AllUserPage';

const Router = () => {
    return (
        <WebRouter history={history}>
            <AuthLoader>
                <LayoutManager>
                    <IsAuth>
                        <InnerLayoutManager>
                            <HasAccess>
                                {({userCan, pages,permissions}) => (
                                    <Switch>
                                        <Route path={'/'} exact
                                               render={() => userCan(pages, 'home') ? <HomePage/> : <ForbiddenPage/>}/>
                                        
                                        <Route path={['/users/all', '/users']} exact
                                               render={() => userCan(pages, 'all') ? <AllUsersPage/> : 
                                                   <ForbiddenPage/>}/>

                                        <Route path={['/users/active', '/users']} exact
                                               render={() => userCan(pages, 'active') ? <UsersActivePage/> :
                                                   <ForbiddenPage/>}/>
                                        <Route path={'/users/inactive'} exact
                                               render={() => userCan(pages, 'inactive') ? <UsersInactivePage/> :
                                                   <ForbiddenPage/>}/>
                                        <Route path={'/users/blocked'} exact
                                               render={() => userCan(pages, 'blocked') ? <UsersBlockedPage/> :
                                                   <ForbiddenPage/>}/>
                                        <Route path={'/users/detail/:id'} exact
                                               render={() => userCan(pages, 'blocked') ? <UserDetailPage/> :
                                                   <ForbiddenPage/>}/>
                                        <Route path={'/users/events'} exact
                                               render={() => userCan(pages, 'events') ? <UsersEventsPage/> :
                                                   <ForbiddenPage/>}/>
                                        <Route path={'/users/event/create'} exact
                                               render={() => userCan(permissions, 'SAVE_EVENT') ? <UsersEventCreatePage/> :
                                                   <ForbiddenPage/>}/>
                                        <Route path={'/users/notifications'} exact
                                               render={() => userCan(pages, 'push_notification') ? <UserNotificationsPage/> :
                                                   <ForbiddenPage/>}/>
                                        <Route path={'/users/notifications/success/:id'} exact
                                               render={() => userCan(pages, 'push_notification') ? <SuccessfulNotificationPage/> :
                                                   <ForbiddenPage/>}/>
                                        <Route path={'/users/notifications/cancelled/:id'} exact
                                               render={() => userCan(pages, 'push_notification') ? <CancelledNotificationPage/> :
                                                   <ForbiddenPage/>}/>
                                        <Route path={'/users/notifications/scheduled/:id'} exact
                                               render={() => userCan(pages, 'push_notification') ? <ScheduledNotificationPage/> :
                                                   <ForbiddenPage/>}/>

                                        <Route path={'/users/event/success/:id'} exact
                                               render={() => userCan(pages, 'events') ? <SuccessfulEventPage/> :
                                                   <ForbiddenPage/>}/>
                                        <Route path={'/users/event/scheduled/:id'} exact
                                               render={() => userCan(pages, 'events') ? <ScheduledEventPage/> :
                                                   <ForbiddenPage/>}/>
                                        <Route path={'/users/event/cancelled/:id'} exact
                                               render={() => userCan(pages, 'events') ? <CancelledEventPage/> :
                                                   <ForbiddenPage/>}/>
                                        <Route path={'/users/event/started/:id'} exact
                                               render={() => userCan(pages, 'events') ? <StartedEventPage/> :
                                                   <ForbiddenPage/>}/>


                                        <Route path={'/pg'} exact
                                               render={() => userCan(pages, 'pg') ? <PgPage/> :
                                                   <ForbiddenPage/>}/>
                                        <Route path={'/pg/update/:id'} exact
                                               render={() => userCan(pages, 'pg') ? <PgEditPage/> :
                                                   <ForbiddenPage/>}/>
                                        <Route path={'/pg/group/update'} exact
                                               render={() => userCan(pages, 'pg') ? <PgGroupEditPage/> :
                                                   <ForbiddenPage/>}/>

                                        <Route path={'/settings'} exact
                                               render={() => userCan(pages, 'my_account') ? <ProfilePage/> :
                                                   <ForbiddenPage/>}/>
                                        <Route path={'/logout'} exact
                                               render={() => userCan(pages, 'logout') ? <LogoutPage/> :
                                                   <ForbiddenPage/>}/>

                                        <Route path={'/accounts'} exact
                                               render={() => userCan(pages, 'accounts') ? <AccountsPage/> :
                                                   <ForbiddenPage/>}/>
                                        <Route path={'/accounts/create'} exact
                                               render={() => userCan(permissions, 'ADD_STAFF') ? <AccountCreatePage/> :
                                                   <ForbiddenPage/>}/>
                                        <Route path={'/accounts/update/:id'} exact
                                               render={() => userCan(permissions, 'EDIT_STAFF') ? <AccountEditPage/> :
                                                   <ForbiddenPage/>}/>
                                        <Route path={'/accounts/types'} exact
                                               render={() => userCan(pages, 'account_types') ? <AccountTypesPage/> :
                                                   <ForbiddenPage/>}/>
                                        <Route path={'/accounts/types/update/:id'} exact
                                               render={() => userCan(permissions, 'EDIT_ROLE') ? <AccountTypeEditPage/> :
                                                   <ForbiddenPage/>}/>
                                        <Route path={'/accounts/types/create'} exact
                                               render={() => userCan(permissions, 'ADD_ROLE') ? <AccountTypeCreatePage/> :
                                                   <ForbiddenPage/>}/>

                                        <Route path={'/txns'} exact
                                               render={() => userCan(pages, 'all') ? <TxnsPage/> :
                                                   <ForbiddenPage/>}/>
                                        <Route path={'/txns/detail/:id'} exact
                                               render={() => userCan(pages, 'all') ? <TxnsDetailPage/> :
                                                   <ForbiddenPage/>}/>
                                        <Route path={'/txns/completed'} exact
                                               render={() => userCan(pages, 'completed') ? <TxnsCompletedPage/> :
                                                   <ForbiddenPage/>}/>
                                        <Route path={'/txns/hold'} exact
                                               render={() => userCan(pages, 'on_hold') ? <TxnsHoldPage/> :
                                                   <ForbiddenPage/>}/>
                                        <Route path={'/txns/failed'} exact
                                               render={() => userCan(pages, 'failed') ? <TxnsFailedPage/> :
                                                   <ForbiddenPage/>}/>
                                        <Route path={'/txns/refunded'} exact
                                               render={() => userCan(pages, 'refunded') ? <TxnsRefundedPage/> :
                                                   <ForbiddenPage/>}/>

                                        <Route path={'/404'} exact component={NotFoundPage}/>
                                        <Redirect to={'/404'}/>
                                    </Switch>
                                )
                                }
                            </HasAccess>
                        </InnerLayoutManager>

                    </IsAuth>
                    <IsGuest>
                        <Switch>
                            <Route path={'/auth'} exact component={LoginPage}/>
                            <Route path={'/auth/set-password/:uid'} exact component={SetPasswordPage}/>
                            <Route path={'/auth/forgot-password'} exact component={ForgotPasswordPage}/>
                            <Redirect to={'/auth'}/>
                        </Switch>
                    </IsGuest>
                </LayoutManager>
            </AuthLoader>
        </WebRouter>
    );
};

export default Router;
