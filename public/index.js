import React, { Component } from 'react';
import { render } from 'react-dom';
import configureStore from './store/configure-store';
import { Provider } from 'react-redux';
import App from './containers/app';
import { Route, Link } from 'react-router';
import { ReduxRouter } from 'redux-router';
import ContactsList from './components/contactsList';
import Contact from './components/contact';
import ContactCreateForm from './components/contactCreateForm';
import './app.sass';
import { getContacts } from './actions/action-creators';

const store = configureStore();
store.dispatch(getContacts());

render(
	<Provider store={store}>
		<ReduxRouter>
			<Route path="/" component={App} >
				<Route path="contacts/create" component={ContactCreateForm} />
				<Route path="contacts/:id" component={Contact} />
			</Route>
		</ReduxRouter>
	</Provider>

, document.getElementById('root'));