import React from 'react';
import {Card} from 'material-ui';
import trim from 'trim';
import Actions from '../actions';

class MessageBox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			message: ''
		};
	}

	onChange(e) {
		this.setState({
			message: e.target.value
		});
	}

	onKeyUp(e) {
		if (e.keyCode === 13 && trim(e.target.value)) {
			e.preventDefault();

			Actions.sendMessage(this.state.message);

			this.setState({
				message: ''
			});

			console.log(`Sent a new message: ${e.target.value}`);
		}	
	}

	render() {
		return (
			<Card style={{
				maxWidth: 1200,
				margin: '30px auto',
				padding: 30
			}}>
				<textarea
					value={this.state.message}
					onChange={this.onChange.bind(this)}
					onKeyUp={this.onKeyUp.bind(this)}
					style={{
						width: '100%',
						borderColor: '#D0D0D0',
						resize: 'none',
						borderRadius: 3,
						minHeight: 50,
						color: '#555',
						fontSize: 14,
						outline: 'auto 0px'
				}} />
			</Card>
		);
	}
}

export default MessageBox;