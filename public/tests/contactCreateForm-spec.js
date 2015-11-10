import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithTag, findRenderedDOMComponentWithClass, scryRenderedDOMComponentsWithTag,  Simulate } from 'react-addons-test-utils';
import { expect } from 'chai';
import ContactCreateForm from '../components/contactCreateForm';
import { Map } from 'immutable';

describe('contactCreateForm', () => {

	it('renders correctly', () => {

		const component = renderIntoDocument(
			<ContactCreateForm addContact={ () => {} } />
		);

		const divs = scryRenderedDOMComponentsWithTag(component, 'div');
		const labels = scryRenderedDOMComponentsWithTag(component, 'label');
		const input = scryRenderedDOMComponentsWithTag(component, 'input');
		const textarea = scryRenderedDOMComponentsWithTag(component, 'textarea');
		const form = scryRenderedDOMComponentsWithTag(component, 'form');
		const button = scryRenderedDOMComponentsWithTag(component, 'button');
		const span = findRenderedDOMComponentWithTag(component, 'span');

		expect(divs.length).to.equal(5);
		expect(labels.length).to.equal(4);
		expect(input.length).to.equal(3);
		expect(textarea.length).to.equal(1);
		expect(button.length).to.equal(1);
		expect(form.length).to.equal(1);
		expect(span.style.display).to.equal('none');
	});

	it('renders error when file is too big', () => {

		const component = renderIntoDocument(
			<ContactCreateForm addContact={ () => {} } />
		);
		component.setState({
			showError: true,
			errorMessage: 'File must be smaller than 2MB.'
		})
		const span = findRenderedDOMComponentWithTag(component, 'span');
		expect(span.style.display).to.equal('block');
		expect(span.textContent).to.equal('File must be smaller than 2MB.');
	});

	it('renders error when name or number are empty', () => {
		const component = renderIntoDocument(
			<ContactCreateForm addContact={ () => {} } />
		);
		const span = findRenderedDOMComponentWithTag(component, 'span');
		Simulate.click(component.refs.submitBtn);

		expect(span.style.display).to.equal('block');
		expect(span.textContent).to.equal('Name and number fiels cannot be empty.');
	});

	it('calls addContact callback on form submit', () => {
		let contactSubmitted;
		const component = renderIntoDocument(
			<ContactCreateForm addContact={ contact => contactSubmitted = contact } />
		);

		component.refs.name.value = 'Petr';
		component.refs.number.value = '1234';
		component.refs.description.value = 'lorem'
		
		Simulate.click(component.refs.submitBtn);

		const form = new FormData();
		form.append('name', 'Petr');
		form.append('number', '1234');
		form.append('description', 'lorem');
		form.append('file', undefined);

		expect(form).to.eql(contactSubmitted);
	});
});