import createHistory from 'history/lib/createBrowserHistory';
import { useBasename } from 'history';

const history = useBasename(createHistory)({
	basename: '/home'
});

export default history;