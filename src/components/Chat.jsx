import React from 'react';
import MessageList from './MessageList';
import ChannelList from './ChannelList';
import MessageBox from './MessageBox';
import ChatStore from '../stores/ChatStore';

class Chat extends React.Component {
	render() {
		return (
			<div>
				<div style={{
					display: 'flex',
					flexWrap: 'wrap',
					flexDirection: 'row',
					maxWidth: 1200,
					width: '100%',
					margin: '30px auto'
				}}>
					<ChannelList {...this.props} />
					<MessageList />
				</div>
				<MessageBox />
			</div>
		);
	}

	static willTransitionTo(transition) {
		var state = ChatStore.getState();
		
		if (!state.user) {
			transition.redirect('/login');
		}
	}
}

export default Chat;