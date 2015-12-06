import alt from '../alt';
import Firebase from 'firebase';

class Actions {
	constructor() {
		this.generateActions(
			'channelsReceived',
			'channelsFailed',
			'channelOpened',
			'messagesReceived',
			'messagesFailed',
			'messagesLoading',
			'sendMessage',
			'messageSendSuccess',
			'messageSendErro',
			'messageReceived',
			'messageDeleted'
		);
	}

	login(router) {
		return dispatch => {
			const firebaseRef = new Firebase('https://webpack-stuff.firebaseio.com');

			firebaseRef.authWithOAuthPopup('google', (error, user) => {
				if (error) {
					return;
				}

				dispatch(user);

				router.transitionTo('/chat');
			});
		};
	}
}

export default alt.createActions(Actions);