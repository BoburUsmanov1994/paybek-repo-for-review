import React, {Component} from 'react';
import {get, isEqual} from "lodash";
import Provider from "../../context/auth/AuthProvider";
import {connect} from 'react-redux';
import Actions from "../../modules/auth/Actions";
import {hasAccess} from "../../utils";

class Auth extends Component {

    componentDidMount() {
        const {checkAuth} = this.props;
        checkAuth();
    }

    render() {
        const {
            children,
            isAuthenticated,
            isFetched,
            user,
            departments,
            pages,
            permissions,

        } = this.props;


        return <Provider value={{
            isAuthenticated,
            isFetched,
            user,
            departments,
            pages,
            permissions,
            // acsses to pages
            userCan: (items=[...pages, 'all'], can = "") => {
                return hasAccess(items, can);
            }

        }}>
            {children}
        </Provider>
    }
}


const mapDispatchToProps = dispatch => {
    return {
        checkAuth: () => dispatch({
            type: Actions.CHECK_AUTH.REQUEST
        })
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: get(state, 'auth.isAuthenticated', false),
        isFetched: get(state, 'auth.isFetched', false),
        user: get(state, 'auth.user', {}),
        departments: get(state, 'auth.user.departments', []),
        pages: get(state, 'auth.user.pages', []),
        permissions: get(state, 'auth.user.permissions', []),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
