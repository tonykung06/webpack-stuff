import Actions from '../actions';
import Firebase from 'firebase';

const firebaseRef = new Firebase('https://webpack-stuff.firebaseio.com/channels');

const ChannelSource = {
	getChannels: {
		remote(state, selectedChannelKey) {
			return new Promise((resolve, reject) => {
				firebaseRef.once('value', dataSnapshot => {
					const channels = dataSnapshot.val();

					selectedChannelKey = selectedChannelKey || _.keys(channels)[0];
					const selectedChannel = channels[selectedChannelKey];
					if (selectedChannel) {
						selectedChannel.selected = true;
					}
					resolve(channels);
				});
			});
		},
		success: Actions.channelsReceived,
		error: Actions.channelsFailed
	}
};

export default ChannelSource;