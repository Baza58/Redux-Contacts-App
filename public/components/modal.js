import React, { Component } from 'react';

const Modal = (props) => {
	return (
		<div className="modal" style={{display: props.open ? 'flex' : 'none'}}>
			<img src="/default.gif" alt="Loading" className="loader-img"  />
		</div>
	);
}

export default Modal;