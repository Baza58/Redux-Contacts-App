import { combineReducers } from 'redux';
import contacts from './contacts-reducer';
import { routerStateReducer } from 'redux-router';

const rootReducer = combineReducers({
	contacts,
	router: routerStateReducer
});

export default rootReducer;