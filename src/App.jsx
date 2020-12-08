import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import StoreProvider from './store/StoreProvider';

import './App.scss';
import Header from './components/Header/Header';
import AsideMenu from './components/Header/AsideMenu/AsideMenu';

const App = () => {
	return (
		<StoreProvider>
			<Header />
			<Router>
				<div className='content-wrapper'>
					<AsideMenu />
				</div>
			</Router>
		</StoreProvider>
	);
};

export default App;
