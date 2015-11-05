import React, { Component, cloneElement } from 'react';
import { Link, IndexLink } from 'react-router';
import ContactsList from './contactsList';
import Nav from './nav';
import Modal from './modal';
import Header from './header';
import HomeIndex from './homeIndex';
import ErrorBox from './errorBox';

export default class App extends Component {
	render = () => {
		const { actions, contacts, router } = this.props;
		
		return (
			<div>
				<Nav />
				<div className="container">
					<ErrorBox error={contacts.getIn(['error', 'errorMessage'])} show={contacts.getIn(['error', 'showError'])} />
					<Modal open={contacts.get('showSpinner')} />
					<Header />
					<div className="contacts-list-container">
						<ContactsList contacts={contacts} />
						{ cloneElement(this.props.children || <HomeIndex/>, { contacts: contacts ,
								addContact: actions.addContact, 
								getContact: actions.getContact, 
								contact: contacts.get('contact'), 
								router: router,
								deleteContact: actions.deleteContact,
								editContact: actions.editContact }) }
					</div>
				</div>				
			</div>
		);
	}
}