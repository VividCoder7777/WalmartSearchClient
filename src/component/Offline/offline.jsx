import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

class OfflineNotification extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	displayOfflineAlert = () => {
		return (
			<Alert bsStyle="info">
				<strong>Offline Mode.</strong> Only cache data will be available until network is available. &#8635;
			</Alert>
		);
	};

	displayOnlineAlert = () => {
		return (
			<Alert bsStyle="warning">
				<strong>Welcome!</strong> Access the products that you need!
			</Alert>
		);
	};
	render() {
		return (
			<React.Fragment>
				{this.props.isOnline === true ? this.displayOnlineAlert() : this.displayOfflineAlert()}
			</React.Fragment>
		);
	}
}

export default OfflineNotification;
