import {combineReducers} from 'redux';
import normalizer from "./../../services/normalizer/reducers";
import auth from "./../../modules/auth/Reducers";
import settings from "../../modules/settings/Reducers";
import accounts from "../../modules/accounts/Reducers";
import users from "../../modules/users/Reducers";
import txns from "../../modules/txns/Reducers";
import dashboard from "../../modules/home/Reducers";
import pg from "../../modules/pg/Reducers";

export default combineReducers({
    normalizer,
    auth,
    settings,
    accounts,
    users,
    txns,
    dashboard,
    pg,
});
