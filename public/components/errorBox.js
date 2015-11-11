import React, { PropTypes, Component } from 'react';

export default class ErrorBox extends Component {
	render = () => {
		const { show, error } = this.props;
		return <div className="alert alert-danger" style={{ 'display': show ? 'block' : 'none' }}  > { error ? error : '' } </div>
	}
}

ErrorBox.propTypes = {
	error: PropTypes.string.isRequired,
	show: PropTypes.bool.isRequired
};