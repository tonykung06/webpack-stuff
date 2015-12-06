import Actions from '../actions';
import Firebase from 'firebase';

let firebaseRef = null;

const MessageSource = {
	sendMessage: {
		remote(state) {
			return new Promise((resolve, reject) => {
				if (!firebaseRef) {
					return resolve();
				}

				firebaseRef.push({
					message: state.message,
					date: new Date().toUTCString(),
					author: state.user.google.displayName,
					userId: state.user.uid,
					profilePic: state.user.google.profileImageURL
				});

				resolve();
			});
		},
		success: Actions.messageSendSuccess,
		error: Actions.messageSendError
	},
	getMessages: {
		remote(state) {
			if (firebaseRef) {
				firebaseRef.off();
			}

			firebaseRef = new Firebase(`https://webpack-stuff.firebaseio.com/messages/${state.selectedChannel.key}`);

			return new Promise((resolve, reject) => {
				firebaseRef.once('value', dataSnapshot => {
					resolve(dataSnapshot.val());

					firebaseRef.on('child_added', (data) => {
						const msgVal = data.val();
						msgVal.key = data.key();

						Actions.messageReceived(msgVal);
					});

					firebaseRef.on('child_removed', msg => {
						Actions.messageDeleted(msg.key());
					});
				});
			});
		},
		loading: Actions.messagesLoading,
		success: Actions.messagesReceived,
		error: Actions.messagesFailed
	}
};

export default MessageSource;