import React from 'react';
import Message from './Message';
import {Card, List} from 'material-ui';
import Firebase from 'firebase';
import _ from 'lodash';

class MessageList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			messages: {}
		};

		this.firebaseRef = new Firebase('https://webpack-stuff.firebaseio.com/messages');
		this.firebaseRef.on('child_added', (msg) => {
			if (this.state.messages[msg.key()]) {
				return;
			}

			const msgVal = msg.val();

			msgVal.key = msg.key();
			this.state.messages[msgVal.key] = msgVal;
			this.setState({
				messages: this.state.messages
			});
		});

		this.firebaseRef.on('child_removed', msg => {
			const key = msg.key();
			delete this.state.messages[key];

			this.setState({
				messages: this.state.messages
			});
		});
	}

	render() {
		const messageNodes = _.values(this.state.messages).map((item, index) => {
			return (
				<Message key={index} message={item.message} />
			);
		});

		return (
			<Card style={{
				flexGrow: 2,
				marginLeft: 30
			}}>
				<List>
					{messageNodes}
				</List>
			</Card>	
		);
	}
}

export default MessageList;