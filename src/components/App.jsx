import React from 'react';
import MessageList from './MessageList';
import ChannelList from './ChannelList';
import MessageBox from './MessageBox';
import {Styles, AppBar} from 'material-ui';

const themeManager = new Styles.ThemeManager();
const Colors = Styles.Colors;

class App extends React.Component {
	constructor(props) {
		super(props);

		themeManager.setPalette({
			primary1Color: Colors.blue500,
			primary2Color: Colors.blue700,
			primary3Color: Colors.blue100,
			accent1Color: Colors.pink400
		});
	}

	static childContextTypes = {
		muiTheme: React.PropTypes.object
	}

	getChildContext() {
		return {
			muiTheme: themeManager.getCurrentTheme()
		};
	}

	render() {
		return (
			<div>
				<AppBar title="Awesome Chat App" />
				<div style={{
					display: 'flex',
					flexWrap: 'wrap',
					flexDirection: 'row',
					maxWidth: 1200,
					width: '100%',
					margin: '30px auto'
				}}>
					<ChannelList />
					<MessageList />
				</div>
				<MessageBox />
			</div>
		);
	}
}

export default App;