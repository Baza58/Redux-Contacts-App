import React, { Component } from 'react';
import { Link } from 'react-router';

const Nav = (props) => {
	return (
		<nav className="navbar navbar-default">
  			<div className="container-fluid">
    
    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <a className="navbar-brand" href="/">Contacts App</a>
    </div>

    
    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav">
        
        <li><Link to="/">Home</Link></li>
        <li><Link to="/contacts/create">Create new contact</Link></li>
       
      </ul>
      
      <ul className="nav navbar-nav navbar-right">
        <li><a href="/auth/logout">Logout</a></li>
      </ul>
    </div>
  </div>
</nav>
	);
}

export default Nav;