import React, {Component} from 'react';
import Loader from "../../components/loader";
import Consumer from "./../../context/auth/AuthConsumer";

class AuthLoader extends Component {
    render() {
        const {
            children, fallback = () => {
            }
        } = this.props;
        return <Consumer>
            {({isFetched = false}) => {
                return isFetched ? children : <Loader />;
            }}
        </Consumer>
    }
}

export default AuthLoader;
