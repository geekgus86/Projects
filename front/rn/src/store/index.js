import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore } from 'redux-persist';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import { reducers } from './rootReducer'
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ })

const enhancer = compose(
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
    )
)

const store = createStore(
    reducers,
    enhancer
)

const persistor = persistStore(
    store,
    null,
    () => {
        store.getState()
    }
)

export { store, persistor }