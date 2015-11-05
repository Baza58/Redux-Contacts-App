import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';


class Contact extends Component {
	state = {
		visible: false,
		name: '',
		number: null,
		description: '',
	}

	componentDidMount = () => {
		this.props.getContact(this.props.router.params.name);
	}
	

	componentWillReceiveProps = (nextProps) => {
		if (this.props.router.params.name !== nextProps.router.params.name) {
			this.props.getContact(nextProps.router.params.name);
			this.setState({
			visible: false 
			});
		}

	}
	onClick = (e) => {
		const { deleteContact } = this.props;
		deleteContact(this.props.contact.get('id'));
	}

	onSubmit = (e) => {
		e.preventDefault();
		const { name, number, description } = this.refs;
		const { editContact } = this.props;
		const contact = {
			name: name.value,
			number: number.value,
			description: description.value
		}
		
		editContact(contact, this.props.contact.get('id'));

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
		this.setState({
			visible: true,
			name: this.props.contact.get('name'),
			number: this.props.contact.get('number'), 
			description: this.props.contact.get('description'),
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
					<input type="submit" className="btn btn-primary" />
				</form>
			</div>
			);
		}

		const { contact } = this.props;

		return (
			<div className="thumbnail" >
				<img src="http://placehold.it/100x100" />
				<div className="caption">
					<h3> { contact.get('name') } </h3>
					<p> { contact.get('number') } </p>
					<p> { contact.get('description') } </p>
					<button className="btn btn-default" onClick={this.changeVisible}>Edit contact</button>
					{'  '}
					<button className="btn btn-danger" onClick={this.onClick} >Delete contact</button>
				</div>
			</div>

		);
	}
}

export default Contact;