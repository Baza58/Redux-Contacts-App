import * as Actions from '../constants/contacts-actions.js';
import history from '../components/history';
import $ from 'jquery';

export function showSpinner() {
	return {
		type: Actions.SHOW_SPINNER
	}; 
}

export function hideSpinner() {
	return {
		type: Actions.HIDE_SPINNER
	};
}

export function setContacts(contacts) {
	return {
		type: Actions.SET_CONTACTS,
		contacts
	};
}

export function showError(error) {
	return {
		type: Actions.SHOW_ERROR,
		error
	};
}

export function addContact(contact) {
	return {
		type: Actions.ADD_CONTACT,
		contact
	};
}

export function getContact(id) {
	return {
		type: Actions.GET_CONTACT,
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

export function addContactReq(contact) {
	return dispatch => {
		dispatch(showSpinner()) 
		return $.ajax({
			method: 'POST',
			url: '/api/contacts/create',
			data: contact,
			processData: false,
			contentType: false
		})
			.success(data => { 
				dispatch(addContact(data));
				dispatch(hideSpinner());
				history.pushState(null, `/contacts/${data.data.id}`);
			})
			.fail((jqXHR, textStatus, errorThrown) => {
				dispatch(showError(textStatus));
				dispatch(hideSpinner());
			});
	};
}

export function getContacts() {
	return (dispatch, getState) => {
		dispatch(showSpinner());
		return $.get('/api/contacts')
			.success(data => {
				dispatch(setContacts(data));
				dispatch(getContact(getState().router.params.id));
				dispatch(hideSpinner());
			})
			.fail((jqXHR, textStatus, errorThrown) => {
				dispatch(showError(textStatus));
				dispatch(hideSpinner());
			});
		};
}

export function deleteContact(id) {
	return dispatch => {
		dispatch(showSpinner());
		return $.ajax({
			url: `/api/contacts/${id}/delete`,
			method: 'DELETE',
		})
			.success(data => {
				history.replaceState(null, '/');
				dispatch(removeContact(id));
				dispatch(hideSpinner());
			})
			.fail((jqXHR, textStatus, errorThrown) => {
				dispatch(showError(textStatus));
				dispatch(hideSpinner());
			});
	};
}

export function editContact(contact, id) {
	return dispatch => {
		dispatch(showSpinner());
		return $.ajax({
			url: `/api/contacts/${id}/edit`,
			method: 'POST',
			data: contact,
			processData: false,
			contentType: false
		})
			.success(data => {			
				dispatch(updateContact(data));
				dispatch(hideSpinner());
			})
			.fail((jqXHR, textStatus, errorThrown) => {
				dispatch(showError(textStatus));
				dispatch(hideSpinner());
			});
	};
}