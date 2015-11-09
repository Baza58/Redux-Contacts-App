import { expect } from 'chai';
import reducer from '../reducers/contacts-reducer';
import * as types from '../constants/contacts-actions';
import { Map, fromJS } from 'immutable';

describe('reducer', () => {
	it('sets contacts', () => {
		const state = Map({
			showSpinner: false,
			error: Map({
				showError: false,
				errorMessage: ''
				}),
			contacts: Map(),
			contact: Map()
		});
		const action = {
			type: types.SET_CONTACTS,
			contacts: { 
				data: {
					1: {
						name: 'Petr',
						number: 1234,
						description: 'lorem'
					}
				}
			}
		};

		const nextState = reducer(state, action);

		expect(nextState).to.equal(Map({
			showSpinner: false,
			error: Map({
				showError: false,
				errorMessage: ''
				}),
			contacts: fromJS({
				"1": {
					name: 'Petr',
					number: 1234,
					description: 'lorem'
				},
			}),
			contact: Map()
		}));
	});

	it('gets the contact', () => {
		const state = Map({
			showSpinner: false,
			error: Map({
				showError: false,
				errorMessage: ''
				}),
			contacts: fromJS({
				"1": {
					name: 'Petr',
					number: 1234,
					description: 'lorem'
				},
			}),
			contact: Map()
		});
		const action = {
			type: types.GET_CONTACT,
			id: '1'
		}
		const nextState = reducer(state, action);

		expect(nextState).to.equal(Map({
			showSpinner: false,
			error: Map({
				showError: false,
				errorMessage: ''
				}),
			contacts: fromJS({
				"1": {
					name: 'Petr',
					number: 1234,
					description: 'lorem'
				},
			}),
			contact: fromJS({
				
					name: 'Petr',
					number: 1234,
					description: 'lorem'
				
			})
		
		}));
	});

	it('shows spinner', () => {
		const state = Map({
			showSpinner: false,
			error: Map({
				showError: false,
				errorMessage: ''
				}),
			contacts: Map(),
			contact: Map()
		});
		const action = {
			type: types.SHOW_SPINNER
		}

		const nextState = reducer(state, action);

		expect(nextState).to.equal(Map({
			showSpinner: true,
			error: Map({
				showError: false,
				errorMessage: ''
				}),
			contacts: Map(),
			contact: Map()
		}));
	});

	it('hides spinner', () => {
		const state = Map({
			showSpinner: true,
			error: Map({
				showError: false,
				errorMessage: ''
				}),
			contacts: Map(),
			contact: Map()
		});
		const action = {
			type: types.HIDE_SPINNER
		}

		const nextState = reducer(state, action);

		expect(nextState).to.equal(Map({
			showSpinner: false,
			error: Map({
				showError: false,
				errorMessage: ''
				}),
			contacts: Map(),
			contact: Map()
		}));
	});

	it('removes contact', () => {
		const state = Map({
			showSpinner: false,
			error: Map({
				showError: false,
				errorMessage: ''
				}),
			contacts: fromJS({
				"1": {
					name: 'Petr',
					number: 1234,
					description: 'lorem'
				},
			}),
			contact: Map()
		});
		const action = {
			type: types.REMOVE_CONTACT,
			id: "1"
		};
		const nextState = reducer(state, action);
		expect(nextState).to.equal(Map({
			showSpinner: false,
			error: Map({
				showError: false,
				errorMessage: ''
				}),
			contacts: Map(),
			contact: Map()
		}));
	});

	it('adds contact', () => {
		const state = Map({
			showSpinner: false,
			error: Map({
				showError: false,
				errorMessage: ''
				}),
			contacts: Map(),
			contact: Map()
		});
		const action = {
			type: types.ADD_CONTACT,
			contact: {
				data: {
					id: "1",
					name: 'Petr',
					number: 1234,
					description: 'lorem'
				}
			}
		};
		const nextState = reducer(state, action);
	
		expect(nextState).to.equal(Map({
			showSpinner: false,
			error: Map({
				showError: false,
				errorMessage: ''
				}),
			contacts: fromJS({
				"1": {
					id: "1",
					name: 'Petr',
					number: 1234,
					description: 'lorem'
				}
			}),
			contact: Map()
		}))
	});

	it('shows error', () => {
		const state = Map({
			showSpinner: false,
			error: Map({
				showError: false,
				errorMessage: ''
				}),
			contacts: Map(),
			contact: Map()
		});
		const action = {
			type: types.SHOW_ERROR,
			error: '404 Not Found'
		};

		const nextState = reducer(state, action);

		expect(nextState).to.equal(Map({
			showSpinner: false,
			error: Map({
				showError: true,
				errorMessage: '404 Not Found'
				}),
			contacts: Map(),
			contact: Map()
		}));
	});

	it('edits the contact', () => {
		const state = Map({
			showSpinner: false,
			error: Map({
				showError: false,
				errorMessage: ''
				}),
			contacts: fromJS({
				"1": {
					name: 'Petr',
					number: 1234,
					description: 'lorem'
				},
			}),
			contact: Map()
		});
		const action = {
			type: types.EDIT_CONTACT,
			contact: {
				data: {
					id: "1",
					name: 'Jarda',
					number: 6789,
					description: 'ipsum'
				}
			}
		};

		const nextState = reducer(state, action);

		expect(nextState).to.equal(Map({
			showSpinner: false,
			error: Map({
				showError: false,
				errorMessage: ''
				}),
			contacts: fromJS({
				"1": {
					id: "1",
					name: 'Jarda',
					number: 6789,
					description: 'ipsum'
				},
			}),
			contact: fromJS({
				
					id: "1",
					name: 'Jarda',
					number: 6789,
					description: 'ipsum'
			})
		}))
	});
});