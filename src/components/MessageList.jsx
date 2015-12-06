import React from 'react';
import Message from './Message';
import {Card, List, CircularProgress} from 'material-ui';
import Firebase from 'firebase';
import _ from 'lodash';
import connectToStores from 'alt/utils/connectToStores';
import ChatStore from '../stores/ChatStore';

@connectToStores
class MessageList extends React.Component {
	constructor(props) {
		super(props);
	}

	static getStores() {
		return [ChatStore];
	}

	static getPropsFromStores() {
		return ChatStore.getState();
	}

	render() {
		let messageNodes;

		if (this.props.messages) {
			messageNodes = _.values(this.props.messages).map((item, index) => {
				return (
					<Message key={index} message={item} />
				);
			});
		}

		return (
			<Card style={{
				flexGrow: 2,
				marginLeft: 30
			}}>
				<List>
					{
						messageNodes || 
							<CircularProgress mode="indeterminate" style={{
								paddingTop: 20,
								paddingBottom: 20,
								margin: '0 auto',
								display: 'block',
								width: 60
							}} />
					}
				</List>
			</Card>	
		);
	}
}

export default MessageList;