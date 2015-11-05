import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Link, IndexLink } from 'react-router';


class Contact extends Component {
	state = {
		visible: false,
		name: '',
		number: null,
		description: '',
	}

	componentDidMount = () => {
		const { router, getContact } = this.props;
		//TODO: get rid of this
		setTimeout(() => {
			getContact(router.params.id);	
		}, 500);
		
	}
	

	componentWillReceiveProps = (nextProps) => {
		const { router, getContact } = this.props;

		if (router.params.id !== nextProps.router.params.id) {
			getContact(nextProps.router.params.id);
			this.setState({
			visible: false 
			});
		}

	}
	onClick = (e) => {
		const { contact, deleteContact } = this.props;
		deleteContact(contact.get('id'));
	}

	onSubmit = (e) => {
		e.preventDefault();
		const { name, number, description, file } = this.refs;
		const { contact, editContact } = this.props;
		const fileNode = findDOMNode(file);
		let contactForm = new FormData();
		contactForm.append('name', name.value);
		contactForm.append('number', number.value);
		contactForm.append('description', description.value);
		contactForm.append('file', fileNode.files[0]);
		
		editContact(contactForm, contact.get('id'));

		name.value = '';
		number.value = '';
		description.value = '';
		this.setState({
			visible: false 
		});
	}

	onChange = e => {
		const { name, number, description } = this.refs;
		this.setState({
			name: name.value,
			number: number.value,
			description: description.value
		});
	}

	changeVisible = (e) => {
		const { contact } = this.props;
		this.setState({
			visible: true,
			name: contact.get('name'),
			number: contact.get('number'), 
			description: contact.get('description'),
		});
	}

	cancelEditing = (e) => {
		this.setState({
			visible: false 
		});
	}

	render = () => {
		if (!this.props.contact) {
			return (
				<div>
					<h3>There is nothing.</h3>
					<IndexLink to="/" className="btn btn-default">Please go to Home</IndexLink>
				</div>
			);
		}

		if (this.state.visible === true) {
			return (
				<div>
				<form onSubmit={this.onSubmit} >
					<div className="form-group">
						<label htmlFor="name"> Name: </label>
						<input 	type="text" 
								ref="name" 
								id="name" 
								className="form-control" 
								value={this.state.name}
								onChange={this.onChange}
								required />
					</div>
					<div className="form-group">
						<label htmlFor="number" >Number:</label>
						<input 	type="text" 
								ref="number" 
								id="number" 
								className="form-control" 
								value={this.state.number}
								onChange={this.onChange}
								required />
					</div>
					<div className="form-group">						
						<label htmlFor="description" > Description: </label>
						<textarea 	ref="description" 
									id="description" 
									rows="5" 
									value={this.state.description}
									onChange={this.onChange}
									className="form-control" />
					</div>
					<div className="form-group">	
						<label htmlFor="file" > Profile picture: </label>
						<input type="file" ref="file" accept="image/*" id="file" />	
					</div>
					<input type="submit" className="btn btn-primary" />
					{' '}
					<button className="btn btn-danger" onClick={this.cancelEditing}>Cancel</button>
				</form>
			</div>
			);
		}

		const { contact } = this.props;
		return (
			<div className="thumbnail" >
				<img src={contact.get('profile-picture') || 'http://placehold.it/100x100' } className="profile-pic" />
				<div className="caption">
					<h3> { contact.get('name') } </h3>
					<p> { contact.get('number') } </p>
					<p> { contact.get('description') } </p>
					<button className="btn btn-default" onClick={this.changeVisible}>Edit contact</button>
					{' '}
					<button className="btn btn-danger" onClick={this.onClick} >Delete contact</button>
				</div>
			</div>

		);
	}
}

export default Contact;