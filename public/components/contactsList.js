import React, { Component } from 'react';
import { Link } from 'react-router';
import { valueSeq } from 'immutable';

class ContactsList extends Component {
	render = () => {
		const { contacts } = this.props;
		const nodes = contacts.get('contacts').valueSeq().map((contact, i) => { 
			return (
				<Link key={i} to={`/contacts/${contact.get('id')}`} >{contact.get('name')}</Link>
			);
		});

		return (
			<aside>
				<nav>
					{nodes}							
				</nav>
				{ this.props.children }
			</aside>

		);
		

	}
}

export default ContactsList;