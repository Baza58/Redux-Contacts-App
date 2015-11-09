import { expect } from 'chai';
import { fromJS } from 'immutable';
import * as types from '../constants/contacts-actions';
import * as actions from '../actions/action-creators';

describe('actions', () => {
	it('should create action to show spinner', () => {
		const expectedAction = {
			type: types.SHOW_SPINNER
		}
		expect(actions.showSpinner()).to.eql(expectedAction);
	});
	it('should create action to hide spinner', () => {
		const expectedAction = {
			type: types.HIDE_SPINNER
		}
		expect(actions.hideSpinner()).to.eql(expectedAction);
	});
	it('should create action to set contacts', () => {
		const contacts = fromJS({
			'1': {
				name: 'Petr',
				number: '1234',
				describe: 'lorem'
			}
		});
		const expectedAction = {
			type: types.SET_CONTACTS,
			contacts
		}
		expect(actions.setContacts(contacts)).to.eql(expectedAction);
	});
	it('should create action to show error', () => {
		const error = 'error';
		const expectedAction = {
			type: types.SHOW_ERROR,
			error
		}
		expect(actions.showError(error)).to.eql(expectedAction);
	});
	it('should create action to create contact', () => {
		const contact = fromJS({
			'1': {
				name: 'Petr',
				number: 1234,
				description: 'lorem'
			}
		});
		const expectedAction = {
			type: types.ADD_CONTACT,
			contact
		};
		expect(actions.addContact(contact)).to.eql(expectedAction);
	});
	it('should create action to get contact', () => {
		const id = 1;
		const expectedAction = {
			type: types.GET_CONTACT,
			id
		}
		expect(actions.getContact(id)).to.eql(expectedAction);
	});
	it('should create action to remove contact', () => {
		const id = 1;
		const expectedAction = {
			type: types.REMOVE_CONTACT,
			id
		}
		expect(actions.removeContact(id)).to.eql(expectedAction);
	});
	it('should create action to update contact', () => {
		const contact = fromJS({
			id: 1,
			name: 'Petr',
			number: 1234,
			description: 'lorem'
		});
		const expectedAction = {
			type: types.EDIT_CONTACT,
			contact
		}
		expect(actions.updateContact(contact)).to.eql(expectedAction);
	});
});

