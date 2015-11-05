import React, { Component, cloneElement } from 'react';
import { Link } from 'react-router';
import { valueSeq } from 'immutable';

class ContactsList extends Component {
	render = () => {
		const { contacts } = this.props;
		const nodes = contacts.get('contacts').valueSeq().map((contact, i) => { 
			return (
					<Link to={`/contacts/${contact.get('id')}`}  className="list-group-item" key={i} >{contact.get('name')}</Link>
			);
		});

		return (
			<aside>
				<ul className="list-group" >
					{nodes}							
				</ul>
				 { cloneElement(this.props.children || <div />, {
				 	contacts: contacts
				 }) }
			</aside>

		);
		

	}
}

export default ContactsList;