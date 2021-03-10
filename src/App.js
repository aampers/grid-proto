import React from 'react';
import { GridProvider } from './store/grid/context';
import Grid from './components/grid';
import { MouseProvider } from './store/mouse/context';

const App = () => {
	return (
		<GridProvider>
			<MouseProvider>
				<Grid />
			</MouseProvider>
		</GridProvider>
	);
};

export default App;
