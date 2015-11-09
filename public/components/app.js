import React, { Component, cloneElement, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import ContactsList from './contactsList';
import Nav from './nav';
import Modal from './modal';
import Header from './header';
import HomeIndex from './homeIndex';
import ErrorBox from './errorBox';
import ImmutablePropTypes from 'react-immutable-proptypes';

export default class App extends Component {
	render = () => {
		const { actions, contacts, router } = this.props;
		
		return (
			<div>
				<Nav />
				<div className="container">
					<ErrorBox error={contacts.getIn(['error', 'errorMessage'])} show={contacts.getIn(['error', 'showError'])} />
					<Header />
					<div className="contacts-list-container">
						<ContactsList contacts={contacts} />
						<Modal open={contacts.get('showSpinner')} />
						{ cloneElement(this.props.children || <HomeIndex/>, { contacts: contacts ,
								addContact: actions.addContactReq, 
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

App.propTypes = {
	actions: PropTypes.object.isRequired,
	contacts: ImmutablePropTypes.map.isRequired,
	router: PropTypes.object.isRequired
};