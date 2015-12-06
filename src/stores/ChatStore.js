import alt from '../alt';
import Actions from '../actions';
import {decorate, bind, datasource} from 'alt/utils/decorators';
import ChannelSource from '../sources/ChannelSource';
import MessageSource from '../sources/MessageSource';
import _ from 'lodash';

@datasource(ChannelSource, MessageSource)
@decorate(alt)
class ChatStore {
	constructor() {
		this.state = {
			user: null,
			messages: null,
			channels: null,
			selectedChannel: null
		};
	}

	@bind(Actions.sendMessage)
	sendMessage(message) {
		this.state.message = message;
		setTimeout(this.getInstance().sendMessage, 10);
	}

	@bind(Actions.messageDeleted)
	messageDeleted(msgKey) {
		delete this.state.messages[msgKey];
		this.setState({
			messages: this.state.messages
		});
	}

	@bind(Actions.messageReceived)
	messageReceived(msg) {
		if (!this.state.messages[msg.key]) {
			this.state.messages[msg.key] = msg;
			this.setState({
				messages: this.state.messages
			});
		}
	}

	@bind(Actions.messagesLoading)
	messagesLoading() {
		this.setState({
			messages: null
		});
	}

	@bind(Actions.messagesReceived)
	receivedMessages(messages) {
		_(messages).keys().each(k => {
			messages[k].key = k;
		}).value();

		this.setState({
			messages
		});
	}

	@bind(Actions.channelOpened)
	channelOpened(selectedChannel) {
		_(this.state.channels).values().each(item => {
			item.selected = false;
		}).value();

		//dangerous, the selectedChannel could be an immutable
		// and the selectedChannel passed in as an argument may not be the same object stored in channels state
		selectedChannel.selected = true;

		this.setState({
			selectedChannel,
			channels: this.state.channels
		});

		//what a hack!! cascading action dispatch?
		// this.getInstance().getMessages(selectedChannel)
		setTimeout(this.getInstance().getMessages, 100);
	}

	@bind(Actions.channelsReceived)
	receivedChannels(channels) {
		let selectedChannel;

		_(channels).keys().each((key, index) => {
			channels[key].key = key;

			if (channels[key].selected) {
				selectedChannel = channels[key];
			}
		}).value();

		this.setState({
			channels,
			selectedChannel
		});

		//what a hack!! cascading action dispatch?
		// this.getInstance().getMessages(selectedChannel)
		setTimeout(this.getInstance().getMessages, 100);
	}

	@bind(Actions.login)
	login(user) {
		this.setState({
			user
		});
	}
}

export default alt.createStore(ChatStore);
