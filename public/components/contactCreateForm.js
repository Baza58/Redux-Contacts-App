import React, { Component } from 'react';
import history from './history';
import { pushState } from 'redux-router';

class ContactCreateForm extends Component {
	onSubmit = (e) => {
		e.preventDefault();
		const { name, number, description } = this.refs;
		const { addContact } = this.props;
		const contact = {
			name: name.value,
			number: number.value,
			description: description.value
		}
		
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
					<input type="submit" className="btn btn-primary" />
				</form>
			</div>
		);
	}
}

export default ContactCreateForm;