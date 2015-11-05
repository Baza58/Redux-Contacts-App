import * as Actions from '../constants/contacts-actions.js';
import history from '../components/history';

export function initRequest() {
	return {
		type: Actions.SHOW_SPINNER
	};
}

export function setContacts(contacts) {
	return {
		type: Actions.SET_CONTACTS,
		contacts
	}
}

export function showError(error) {
	console.log(error);
	return {
		type: Actions.SHOW_ERROR,
		error
	}
}

export function setContact(contact) {
	return {
		type: Actions.ADD_CONTACT,
		contact
	};
}

export function getContact(id) {
	return {
		type: Actions.SET_CONTACT,
		id
	};
}

export function removeContact(id) {
	return {
		type: Actions.REMOVE_CONTACT,
		id
	};
}

export function updateContact(contact) {
	return {
		type: Actions.EDIT_CONTACT,
		contact
	};
}

export function addContact(contact) {
	return dispatch => {
		dispatch(initRequest()) 
		return $.ajax({
			method: 'POST',
			url: '/api/contacts/create',
			data: contact,
			processData: false,
			contentType: false
		})
			.success(data => { 
				console.log(data);
				dispatch(setContact(data))
				history.pushState(null, `/contacts/${data.data.id}`);
			})
			.fail((jqXHR, textStatus, errorThrown) => dispatch(showError(textStatus)));
	}
}

export function getContacts() {
	return dispatch => {
		dispatch(initRequest());
		return $.get('/api/contacts')
			.success(data => dispatch(setContacts(data)))
			.fail((jqXHR, textStatus, errorThrown) => dispatch(showError(textStatus)));
		}
}

export function deleteContact(id) {
	return dispatch => {
		dispatch(initRequest());
		return $.ajax({
			url: `/api/contacts/${id}/delete`,
			method: 'DELETE',
		})
			.success(data => {
				history.replaceState(null, '/');
				dispatch(removeContact(id));
				
			})
			.fail((jqXHR, textStatus, errorThrown) => dispatch(showError(textStatus)));
	}
}

export function editContact(contact, id) {
	return dispatch => {
		dispatch(initRequest());
		return $.ajax({
			url: `/api/contacts/${id}/edit`,
			method: 'POST',
			data: contact,
			processData: false,
			contentType: false
		})
			.success(data => {			
				dispatch(updateContact(data));
			})
			.fail((jqXHR, textStatus, errorThrown) => dispatch(showError(textStatus)));
	}
}