import React from 'react';
import {Card, CardText, RaisedButton} from 'material-ui';
import Actions from '../actions';

class Login extends React.Component {
	static contextTypes = {
		router: React.PropTypes.func.isRequired
	}

	onClick() {
		Actions.login(this.context.router);
	}

	render() {
		return (
			<Card style={{
				maxWidth: 800,
				margin: '30px auto',
				padding: 50
			}}>
				<CardText style={{
					textAlign: 'center'
				}}>
					To start chatting away, please log in with your Google account.
				</CardText>

				<RaisedButton style={{
					display: 'block'
				}} onClick={this.onClick.bind(this)} label="Log in with Google" primary={true} />
			</Card>
		);
	}
}

export default Login;