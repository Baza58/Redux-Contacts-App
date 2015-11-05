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

export default function contacts(state = initialState, action) {
	switch(action.type) {
		case Actions.SET_CONTACTS:
			return state.set('showSpinner', false).set('contacts', fromJS(action.contacts.data));

		case Actions.SET_CONTACT:
			return state.set('showSpinner', false).set('contact', state.getIn(['contacts', action.id]));

		case Actions.SHOW_SPINNER:
			return state.set('showSpinner', true);

		case Actions.EDIT_CONTACT:
			return state.set('contact', fromJS(action.contact.data))
						.set('showSpinner', false)
						.setIn(['contacts', action.contact.data.id], fromJS(action.contact.data));

		case Actions.REMOVE_CONTACT:
			return state.deleteIn(['contacts', action.id]).set('showSpinner', false);

		case Actions.ADD_CONTACT:
			return state.set('showSpinner', false).setIn(['contacts', action.contact.data.id], fromJS(action.contact.data));

		default:
			return state;
	}
}