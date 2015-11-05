import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import history from './history';
import { pushState } from 'redux-router';

class ContactCreateForm extends Component {
	onSubmit = (e) => {
		e.preventDefault();
		const { name, number, description, file } = this.refs;
		const { addContact } = this.props;
		const fileNode = findDOMNode(file);
		let contact = new FormData();
		contact.append('name', name.value);
		contact.append('number', number.value);
		contact.append('description', description.value);
		contact.append('file', fileNode.files[0]);
		
		addContact(contact);

		pushState(null, `/contacts/${contact.name}`);

		name.value = '';
		number.value = '';
		description.value = '';

	}

	render = () => {
		return (
			<div>
				<form onSubmit={this.onSubmit} >
					<div className="form-group">
						<label htmlFor="name"> Name: </label>
						<input 	type="text" 
								ref="name" 
								id="name" 
								className="form-control" 
								required />
					</div>
					<div className="form-group">
						<label htmlFor="number" >Number:</label>
						<input 	type="text" 
								ref="number" 
								id="number" 
								className="form-control" 
								required />
					</div>
					<div className="form-group">						
						<label htmlFor="description" > Description: </label>
						<textarea 	ref="description" 
									id="description" 
									rows="5" 
									className="form-control" />
					</div>
					
					<div className="form-group">	
						<label htmlFor="file" > Profile picture: </label>
						<input type="file" ref="file" accept="image/*" id="file" />	
					</div>
					<input type="submit" className="btn btn-primary" />
				</form>
			</div>
		);
	}
}

export default ContactCreateForm;