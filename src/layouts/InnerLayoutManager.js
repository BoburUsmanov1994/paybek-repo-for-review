import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import HomeInnerLayout from "../modules/home/layouts/HomeInnerLayout";
import UsersInnerLayout from "../modules/users/layouts/UsersInnerLayout";
import TxnsInnerLayout from "../modules/txns/layouts/TxnsInnerLayout";
import PgInnerLayout from "../modules/pg/layouts/PgInnerLayout";
import SettingsInnerLayout from "../modules/settings/layouts/SettingsInnerLayout";
import AccountsInnerLayout from "../modules/accounts/layouts/AccountsInnerLayout";

class LayoutManager extends Component {

    getLayout = (pathname) => {
        if (pathname === '/') {
            return 'home'
        }
        if (/^\/users(?=\/|$)/i.test(pathname)) {
            return 'users'
        }
        if (/^\/txns(?=\/|$)/i.test(pathname)) {
            return 'txns'
        }
        if (/^\/pg(?=\/|$)/i.test(pathname)) {
            return 'pg'
        }
        if (/^\/settings(?=\/|$)/i.test(pathname)) {
            return 'settings'
        }
        if (/^\/accounts(?=\/|$)/i.test(pathname)) {
            return 'accounts'
        }
        return 'home'
    }

    getLayouts = () => {
        return {
            home: HomeInnerLayout,
            users: UsersInnerLayout,
            txns: TxnsInnerLayout,
            pg: PgInnerLayout,
            settings:SettingsInnerLayout,
            accounts:AccountsInnerLayout
        }
    }

    render() {
        const {children, location: {pathname}} = this.props;
        const Layout = this.getLayouts()[this.getLayout(pathname)];
        return (
            <>
                <Layout>
                    {children}
                </Layout>
            </>
        );
    }
}

export default withRouter(LayoutManager);
