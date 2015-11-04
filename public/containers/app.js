import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/action-creators';
import App from '../components/app';

function mapStateToProps (state) {
	return {
		contacts: state.contacts,
		router: state.router
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Actions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);