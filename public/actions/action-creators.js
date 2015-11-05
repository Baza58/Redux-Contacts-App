import * as Actions from '../constants/contacts-actions.js';
import history from '../components/history';

export function initRequest() {
	return {
		type: Actions.INIT_REQUEST
	};
}

export function handleResponse(contacts) {
	return {
		type: Actions.HANDLE_RESPONSE,
		contacts
	}
}

export function handleError(error) {
	console.log(error);
	return {
		type: Actions.HANDLE_ERROR,
		error
	}
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
				dispatch(mergeContact(data))
				history.pushState(null, `/contacts/${data.data.id}`);
			})
			.fail((jqXHR, textStatus, errorThrown) => dispatch(handleError(textStatus)));
	}
}

export function mergeContact(contact) {
	return {
		type: Actions.ADD_CONTACT,
		contact
	};
}

export function getContacts() {
	return dispatch => {
		dispatch(initRequest());
		return $.get('/api/contacts')
			.success(data => dispatch(handleResponse(data)))
			.fail((jqXHR, textStatus, errorThrown) => dispatch(handleError(textStatus)));
		}
}

export function initLoad() {
	return dispatch => dispatch(getContacts());
}


export function getContact(id) {
	return {
		type: Actions.HANDLE_CONTACT,
		id
	};
}

export function handleContact(contact) {
	return {
		type: Actions.HANDLE_CONTACT,
		contact
	};
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
				dispatch(updateDataAfterDelete(id));
				
			})
			.fail((jqXHR, textStatus, errorThrown) => dispatch(handleError(textStatus)));
	}
}

export function updateDataAfterDelete(id) {
	return {
		type: Actions.REMOVE_CONTACT,
		id
	};
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
			.fail((jqXHR, textStatus, errorThrown) => dispatch(handleError(textStatus)));
	}
}

export function updateContact(contact) {
	return {
		type: Actions.EDIT_CONTACT,
		contact
	};
}