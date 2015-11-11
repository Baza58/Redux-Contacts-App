import React from 'react';
import { renderIntoDocument, scryRenderedDOMComponentsWithClass, findRenderedDOMComponentWithTag, scryRenderedComponentsWithType, mockComponent, findRenderedDOMComponentWithClass, scryRenderedDOMComponentsWithTag,  Simulate } from 'react-addons-test-utils';
import { expect } from 'chai';
import App from '../components/app';
import { Map } from 'immutable';
import ContactsList from '../components/contactsList';
import Modal from '../components/modal';
import ErrorBox from '../components/errorBox';
import HomeIndex from '../components/homeIndex';
import Header from '../components/header';
import Nav from '../components/nav';

describe('app', () => {

	it('renders properly', () => {
		const contacts = Map({
			showSpinner: true,
			error: Map({
				showError: true,
				errorMessage: 'kjad'
			}),
			contacts: Map(),
			contact: Map()
			});
		const component = renderIntoDocument(
			<App  actions={{}} router={{}} contacts={ contacts } />
		);

		const nav = scryRenderedComponentsWithType(component, Nav);
		const header = scryRenderedComponentsWithType(component, Header);
		const contactList = scryRenderedComponentsWithType(component, ContactsList);
		const modal = scryRenderedComponentsWithType(component, Modal);
		const errorBox = scryRenderedComponentsWithType(component, ErrorBox);
		const homeIndex = scryRenderedComponentsWithType(component, HomeIndex);
		const containerDiv = scryRenderedDOMComponentsWithClass(component, 'container');
		const contactsListContainer = scryRenderedDOMComponentsWithClass(component, 'contacts-list-container');

		expect(nav).to.have.length(1);
		expect(contactList).to.have.length(1);
		expect(header).to.have.length(1);
		expect(errorBox).to.have.length(1);
		expect(modal).to.have.length(1);
		expect(homeIndex).to.have.length(1);
		expect(containerDiv).to.have.length(1);
		expect(contactsListContainer).to.have.length(1);
	});
});