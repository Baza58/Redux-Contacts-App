import React from 'react';

const ErrorBox = (props) => {
	return <div className="alert alert-danger" style={{ 'display': props.show ? 'block' : 'none' }}  > { props.error ? props.error : '' } </div>
}

export default ErrorBox;