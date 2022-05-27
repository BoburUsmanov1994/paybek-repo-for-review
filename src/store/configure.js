import {createStore} from 'redux'
import {composeWithDevTools} from "redux-devtools-extension";
import reducers from './reducers'
import {apply, afterCreate} from "./middlewares";

export default function configureStore(initialState = {}) {
    return afterCreate(createStore(reducers, composeWithDevTools(apply)));
}
