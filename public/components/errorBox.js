import React, { PropTypes } from 'react';

const ErrorBox = (props) => {
	return <div className="alert alert-danger" style={{ 'display': props.show ? 'block' : 'none' }}  > { props.error ? props.error : '' } </div>
}

export default ErrorBox;

ErrorBox.propTypes = {
	error: PropTypes.string.isRequired,
	show: PropTypes.bool.isRequired
};