import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root-reducer';
import createLogger from 'redux-logger';
import { reduxReactRouter } from 'redux-router';
import history from '../components/history';

const logger = createLogger();
const createStoreWithMiddleware = compose(
	applyMiddleware(thunk,logger),
	reduxReactRouter({ history })
)(createStore);

export default function configureStore(initialState) {
	const store = createStoreWithMiddleware(rootReducer, initialState);
	return store;
}

