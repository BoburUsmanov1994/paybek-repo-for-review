import Actions from "./Actions";
import {get} from "lodash";

const initialState = [];

export default function AccountsReducer(state = initialState, action) {
    switch (action.type) {
        case "SAVE_DEFAULT_DATA":
            return [
                ...state,
                ...action.payload
            ]
        default:
            return state
    }
}
