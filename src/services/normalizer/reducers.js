import actions from './actions';
import {get} from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case actions.NORMALIZE.REQUEST:
            return ((action, state) => {
                const { storeName } = action.payload;
                return {
                    ...state,
                    data: {
                        ...get(state, 'data', {}),
                        [storeName]: {
                            ...get(state, `data.${storeName}`, {}),
                            isFetched: false,
                        },
                    },
                };
            })(action, state);
        case actions.NORMALIZE.SUCCESS:
            return ((action, state) => {
                const { entities, result, storeName, entityName } = action.payload;
                const entitiesKeys = Object.keys(entities);
                let _entities_ = get(state, 'entities', {});
                let entities_ = get(state, 'entities', {});

                if (entitiesKeys.length > 0) {
                    entitiesKeys.map((_entityName_) => {
                        return (_entities_[_entityName_] = {
                            ...entities_[_entityName_],
                            ...entities[_entityName_],
                        });
                    });
                }
                return {
                    ...state,
                    entities: {
                        ...get(state, 'entities'),
                        ..._entities_,
                    },
                    data: {
                        ...get(state, 'data', {}),
                        [storeName]: { result, isFetched: true, entityName },
                    },
                };
            })(action, state);
        case actions.NORMALIZE.FAILURE:
            return (() => {
                const { storeName, errors } = action.payload;
                return {
                    ...state,
                    data: {
                        ...get(state, 'data', {}),
                        [storeName]: {
                            isFetched: true,
                            hasErrors: true,
                            errors,
                        },
                    },
                };
            })();

        case actions.NORMALIZE.TRIGGER:
            return (() => {
                const { storeName } = action.payload;
                return {
                    ...state,
                    data: {
                        ...get(state, 'data', {}),
                        [storeName]: {
                            isFetched: false,
                        },
                    },
                };
            })();
        default:
            return state;
    }
};
