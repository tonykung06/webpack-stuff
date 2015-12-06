import React from 'react';
import {Styles, AppBar} from 'material-ui';
import {RouteHandler} from 'react-router';

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
				<RouteHandler />
			</div>
		);
	}
}

export default App;