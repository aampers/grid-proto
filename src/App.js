import React from 'react';
import { GridProvider } from './store/grid/context';
import Grid from './components/grid';
import { setup } from './utils/grid';

const App = () => {
	const grid = setup();
	console.log('grid', grid);
	return (
		<GridProvider>
			<div className='container'>
				<Grid grid={grid} />
			</div>
		</GridProvider>
	);
};

export default App;
