import {all} from 'redux-saga/effects';
import normalizer from "./../../services/normalizer/sagas";
import api from "./../../services/api/Saga";
import auth from "./../../modules/auth/Sagas";
import settings from "../../modules/settings/Sagas";
import accounts from "../../modules/accounts/Sagas";
import users from "../../modules/users/Sagas";
import txns from "../../modules/txns/Sagas";
import dashboard from "../../modules/home/Sagas";
import pg from "../../modules/pg/Sagas";

export default function* sagas() {
    yield all([
        normalizer(),
        api(),
        auth(),
        settings(),
        accounts(),
        users(),
        txns(),
        dashboard(),
        pg()
    ]);
}
