import Actions from "./Actions";
import {get} from "lodash";
import { act } from "react-dom/test-utils";

export default function AccountsReducer(state = {oldPaginationPage: false}, action) {
    switch (action.type) {
        case Actions.SET_OLD_PAGINATION_PAGE:
            return {
                ...state,
                oldPaginationPage: action.payload
            }
        default:
            return state
    }
}
