import React from 'react';
import Channel from './Channel';
import {Card, List} from 'material-ui';

class ChannelList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			channels: [
				'Dogs',
				'Cats'
			]
		};
	}

	render() {
		const channelNodes = this.state.channels.map((item, index) => {
			return (
				<Channel key={index} channel={item} />
			);
		});

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