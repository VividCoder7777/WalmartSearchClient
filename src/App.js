import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WalmartSearch from './component/Walmart/WalmartSearch';
import OfflineNotification from './component/Offline/offline';

// Create simple app that fetches data and uses service worker

class App extends Component {
	constructor(props) {
		super(props);

		let networkState = navigator.onLine;

		this.state = {
			isOnline: networkState
		};
	}
	componentDidMount() {
		window.addEventListener('online', () => {
			this.setState({
				isOnline: true
			});
		});
		window.addEventListener('offline', () => {
			this.setState({
				isOnline: false
			});
		});
	}

	render() {
		return (
			<div className="App">
				<OfflineNotification isOnline={this.state.isOnline} />
				<WalmartSearch />
			</div>
		);
	}
}

export default App;
