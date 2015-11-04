import * as Actions from '../constants/contacts-actions';
import { Map, fromJS, toArray } from 'immutable';

const initialState = Map({
	showSpinner: false,
	error: Map({
		showError: false,
		errorMessage: ''
	}),
	contacts: Map(),
	contact: Map()

});

function handleResponse(state, action) {
	return state.set('showSpinner', false).set('contacts', fromJS(action.contacts.data));
}

function showSpinner(state, action) {
	return state.set('showSpinner', true);
}

function showContact(state, action) {
	return state.set('showSpinner', false).set('contact', state.getIn(['contacts', action.id]));
}

function editContact(state, action) {
	
	return state.set('contact', fromJS(action.contact.data))
				.set('showSpinner', false)
				.setIn(['contacts', action.contact.data.id], fromJS(action.contact.data));
}

function removeContact(state, action) {
	return state.deleteIn(['contacts', action.id]).set('showSpinner', false);
}

function addContact(state, action) {
	return state.set('showSpinner', false).setIn(['contacts', action.contact.data.id], fromJS(action.contact.data));
}

function contacts(state = initialState, action) {
	switch(action.type) {
		case Actions.HANDLE_RESPONSE:
			return handleResponse(state, action);
		case Actions.HANDLE_CONTACT:
			return showContact(state, action);
		case Actions.INIT_REQUEST:
			return showSpinner(state, action);
		case Actions.EDIT_CONTACT:
			return editContact(state, action);
		case Actions.REMOVE_CONTACT:
			return removeContact(state, action);
		case Actions.ADD_CONTACT:
			return addContact(state, action);
		default:
			return state;
	}
}

export default contacts;