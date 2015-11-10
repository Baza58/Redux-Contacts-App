import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithTag, findRenderedDOMComponentWithClass, scryRenderedDOMComponentsWithTag,  Simulate } from 'react-addons-test-utils';
import { expect } from 'chai';
import Contact from '../components/contact';
import { Map } from 'immutable';

describe('contact', () => {
	it('renders properly', () => {
		const router = {
			params: {
				id: 1
			}
		}
		const contact = Map({
			name: 'Petr',
			number: 1234,
			description: 'lorem'
		});
		const component = renderIntoDocument(
			<Contact contact={ contact } 
					 router={router}
					 getContact={ () => {} }
					 editContact={ () => {} }
					 deleteContact={ () => {} } />
		);

		const thumbnail = findRenderedDOMComponentWithClass(component, 'thumbnail');
		const caption = findRenderedDOMComponentWithClass(component, 'caption');
		const h3 = findRenderedDOMComponentWithTag(component, 'h3');
		const paragraphs = scryRenderedDOMComponentsWithTag(component, 'p');
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		expect(thumbnail.children.length).to.equal(2);
		expect(caption.children.length).to.equal(6);
		expect(h3.textContent).to.equal('Petr');
		expect(paragraphs[0].textContent).to.equal('1234');
		expect(paragraphs[1].textContent).to.equal('lorem');
		expect(buttons.length).to.equal(2);

	});

	it('renders "There is nothing" if there is no contact', () => {
		const router = {
			params: {
				id: 1
			}
		}
		const component = renderIntoDocument(	 
		<Contact router={router}
				 getContact={ () => {} }
				 editContact={ () => {} }
				 deleteContact={ () => {} } />
		);

		const div = findRenderedDOMComponentWithTag(component, 'div');
		const h3 = findRenderedDOMComponentWithTag(component, 'h3');
		const a = findRenderedDOMComponentWithTag(component, 'a');

		expect(div.children.length).to.equal(2);
		expect(h3.textContent).to.equal('There is nothing.');
		expect(a.textContent).to.equal('Please go to Home');
	});

	it('renders form when this.state.visible is true', () => {
		const router = {
			params: {
				id: 1
			}
		}
		const contact = Map({
			name: 'Petr',
			number: 1234,
			description: 'lorem'
		});
		const component = renderIntoDocument(
			<Contact contact={ contact } 
					 router={router}
					 getContact={ () => {} }
					 editContact={ () => {} }
					 deleteContact={ () => {} } />
		);

		Simulate.click(component.refs.EditBtn);
		const divs = scryRenderedDOMComponentsWithTag(component, 'div');
		const labels = scryRenderedDOMComponentsWithTag(component, 'label');
		const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
		const button = scryRenderedDOMComponentsWithTag(component, 'button');

		expect(divs.length).to.equal(5);
		expect(labels.length).to.equal(4);
		expect(button[0].textContent).to.equal('Submit');
		expect(button[1].textContent).to.equal('Cancel');
		expect(inputs.length).to.equal(3);
	});

	it('calls delete callback on delete button click', () => {
		const router = {
			params: {
				id: 1
			}
		}
		const contact = Map({
			name: 'Petr',
			number: 1234,
			description: 'lorem'
		});

		let deleted = false;

		const component = renderIntoDocument(
			<Contact contact={ contact } 
					 router={router}
					 getContact={ () => {} }
					 editContact={ () => {} }
					 deleteContact={ () => { return deleted = true } } />
		);

		Simulate.click(component.refs.deleteBtn);

		expect(deleted).to.equal(true);
	});

	it('calls editContact callback on form submit', () => {
		const router = {
			params: {
				id: 1
			}
		}
		const contact = Map({
			name: 'Petr',
			number: 1234,
			description: 'lorem'
		});
		let called = false;

		const component = renderIntoDocument(
			<Contact contact={ contact } 
					 router={router}
					 getContact={ () => {} }
					 editContact={ contact => called = true  }
					 deleteContact={ () => {} } />
		);

		Simulate.click(component.refs.EditBtn);

		Simulate.click(component.refs.submit);
		expect(called).to.equal(true);
	});
});