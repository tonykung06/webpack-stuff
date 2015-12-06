import React from 'react';
import App from '../components/App';
import Chat from '../components/Chat';
import Login from '../components/Login';
import {run, Route, DefaultRoute, HashLocation} from 'react-router';

const routes = (
	<Route path="/" handler={App}>
		<DefaultRoute handler={Chat} />
		<Route path="chat" handler={Chat} />
		<Route path="chat/:channel" handler={Chat} />
		<Route path="login" handler={Login} />
	</Route>
);

run(routes, HashLocation, Root => {
	React.render(<Root />, document.getElementById('container'));
});