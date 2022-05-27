import Actions from "./Actions";
import {get} from "lodash";

const initialState = {
    userStatus: {},
    oldPaginationPage: false,
};

export default function UsersReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_USER_BY_STATUS":
            return {
                ...state,
                userStatus: {
                    ...state.userStatus,
                    ...action.payload,
                }
            }
        case Actions.SET_INITIAL_USERS_PAGINATION_PAGE:
            return {
                ...state,
                oldPaginationPage: action.payload,
            }
        default:
            return state
    }
}
