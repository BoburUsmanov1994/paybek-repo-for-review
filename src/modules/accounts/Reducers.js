import Actions from "./Actions";
import { get } from "lodash";

export default function AccountsReducer(state = {}, action) {
    switch (action.type) {
        case Actions.SET_ALL_PAGES_AND_PERMISSIONS.REQUEST:
            return {
                ...state,
                allPagesAndDepartments: {
                    ...state.allPagesAndDepartments,
                    ...action.payload,
                },
            };
        default:
            return state;
    }
}
