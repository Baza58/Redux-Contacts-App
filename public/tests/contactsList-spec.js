import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithTag, findRenderedDOMComponentWithClass, scryRenderedDOMComponentsWithTag,  Simulate } from 'react-addons-test-utils';
import { expect } from 'chai';
import ContactList from '../components/contactsList';
import { Map } from 'immutable';

describe('contactsList', () => {
	it('renders properly', () => {

		const contacts = Map({
			contacts: Map({
				"1": Map({
					name: 'Petr',
					number: 1234,
					description: 'lorem'
				})
			})
		});

		const component = renderIntoDocument(
				<ContactList contacts={ contacts } />
		);

		const list = findRenderedDOMComponentWithTag(component, 'ul');
		const item = findRenderedDOMComponentWithClass(component, 'list-group-item');
		expect(list.children.length).to.equal(1);
		expect(item.textContent).to.equal('Petr');
	});
});

