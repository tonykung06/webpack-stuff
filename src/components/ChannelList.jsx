import React from 'react';
import Channel from './Channel';
import {Card, List, CircularProgress} from 'material-ui';
import connectToStores from 'alt/utils/connectToStores';
import ChatStore from '../stores/ChatStore';
import _ from 'lodash';

@connectToStores
class ChannelList extends React.Component {
	constructor(props) {
		super(props);

		// ChatStore.getChannels();
	}

	componentDidMount() {
		this.selectedChannel = this.props.params.channel;
		ChatStore.getChannels(this.selectedChannel);
	}

	componentWillReceiveProps(nextProps) {
		if (this.selectedChannel !== nextProps.params.channel) {
			this.selectedChannel = nextProps.params.channel;
			ChatStore.getChannels(this.selectedChannel);
		}
	}

	static getStores() {
		return [ChatStore];
	}

	static getPropsFromStores() {
		return ChatStore.getState();
	}

	render() {
		if (!this.props.channels) {
			return (
				<Card style={{
					flexGrow: 1
				}}>
					<CircularProgress
						mode="indeterminate"
						style={{
							paddingTop: 20,
							paddingBottom: 20,
							margin: '0 auto',
							display: 'block',
							width: 60
						}} />
				</Card>
			);
		}

		const channelNodes = _(this.props.channels).keys().map((item) => {
			const channel = this.props.channels[item];

			return (
				<Channel key={item} channel={channel} />
			);
		}).value();

		return (
			<Card style={{
				flexGrow: 1
			}}>
				<List>
					{channelNodes}
				</List>
			</Card>	
		);
	}
}

export default ChannelList;