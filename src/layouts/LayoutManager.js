import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import MainLayout from "./main";
import AuthLayout from "./auth/AuthLayout";
import ErrorLayout from "./error/ErrorLayout";
import Toastify from "../components/toastify";


class LayoutManager extends Component {

    getLayout = (pathname) => {
        if (pathname === '/') {
            return 'main'
        }
        if (/^\/auth(?=\/|$)/i.test(pathname)) {
            return 'auth'
        }

        if (/^\/error(?=\/|$)/i.test(pathname)) {
            return 'error'
        }
        return 'main'
    }

    getLayouts = () => {
        return {
            main: MainLayout,
            auth: AuthLayout,
            error: ErrorLayout,
        }
    }

    render() {
        const {children, location: {pathname}} = this.props;
        const Layout = this.getLayouts()[this.getLayout(pathname)];
        return (
            <>
                <Layout>
                    <Toastify />
                    {children}
                </Layout>
            </>
        );
    }
}

export default withRouter(LayoutManager);
