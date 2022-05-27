import Actions from "./Actions";
import {get} from "lodash";
import Storage from "./../../services/local-storage"

export default function AuthReducer(state = {
    env: Storage.get('env') ?? 'prod'
}, action) {
    switch (action.type) {
        case Actions.CHECK_AUTH.TRIGGER:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isFetched: false
            }
        case Actions.CHECK_AUTH.REQUEST:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isFetched: false
            }
        case Actions.CHECK_AUTH.FAILURE:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isFetched: true,
            }
        case Actions.CHECK_AUTH.SUCCESS:
            return {
                ...state,
                user: get(action, "payload.user"),
                isAuthenticated: true,
                isFetched: true,
            }
        case Actions.SET_ENV.SUCCESS:
            return {
                ...state,
                env: get(action, "payload.env"),
            }
        default:
            return state
    }
}
