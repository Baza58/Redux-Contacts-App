import React, { Component, PropTypes } from 'react';

export default class Modal extends Component {
	render = () => {
		const { open } = this.props;
		return (
			<div className="modal" style={{display: open ? 'flex' : 'none'}}>
				<img src="/default.gif" alt="Loading" className="loader-img"  />
			</div>
	);
	}
}
Modal.propTypes = {
	open: PropTypes.bool.isRequired
};