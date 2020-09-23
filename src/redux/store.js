import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const logger = createLogger({ collapsed: true });
const createStoreWithMiddleware = applyMiddleware(thunk, logger);
const store = createStore(rootReducer, compose(createStoreWithMiddleware));

export default store;
