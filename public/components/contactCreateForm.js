import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import history from './history';
import { pushState } from 'redux-router';

export default class ContactCreateForm extends Component {
	state = {
		showError: false,
		errorMessage: ''
	}

	onSubmit = (e) => {
		e.preventDefault();
		const { name, number, description, file } = this.refs;
		const { addContact } = this.props;
		const fileNode = findDOMNode(file);
		if (fileNode.files[0] && fileNode.files[0].size > 2000000) {
			return this.setState({
				showError: true,
				errorMessage: 'File must be smaller than 2MB.'
			});
		}
		if ( !name.value || !number.value ) {
			return this.setState({
				showError: true,
				errorMessage: 'Name and number fiels cannot be empty.' 
			});
		}

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
						<span style={{ 'display': this.state.showError ? 'block' : 'none', 'color': 'red' }} >{this.state.errorMessage}</span>
					</div>
					<button className="btn btn-primary" ref="submitBtn" disabled={this.state.disabled} onClick={this.onSubmit} >Submit</button>
				</form>
			</div>
		);
	}
}

ContactCreateForm.propTypes = {
	addContact: React.PropTypes.func.isRequired
}