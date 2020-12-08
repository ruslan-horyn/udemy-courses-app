import React from 'react';
import StoreProvider from './store/StoreProvider';

import './App.scss';
import Header from './components/Header/Header';

const App = () => {
	
	return (
		<>
			<StoreProvider>
				<Header />
			</StoreProvider>
		</>
	);
};

export default App;
