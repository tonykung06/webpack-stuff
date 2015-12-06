import React from 'react';
import {ListItem} from 'material-ui';
import Actions from '../actions';

class Channel extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const style = {};

		if (this.props.channel.selected) {
			style.backgroundColor = '#f0f0f0';
		}

		return (
			<ListItem
				href={`/#/chat/${this.props.channel.key}`}
				style={style}>
				
				{this.props.channel.name}
			</ListItem>
		);
	}
}

export default Channel;