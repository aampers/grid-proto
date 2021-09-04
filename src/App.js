import React from 'react';
import { GridProvider } from './store/grid/context';
import Grid from './components/grid';
import { PointerProvider } from './store/pointer/context';

const App = () => {
	return (
		<GridProvider>
			<PointerProvider>
				<Grid />
			</PointerProvider>
		</GridProvider>
	);
};

export default App;
