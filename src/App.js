import React, { useCallback } from 'react';
import { GridProvider } from './store/grid/context';
import Grid from './components/grid';
import Canvas from './components/canvas';
import {
	MouseProvider,
	useMouseDispatch,
	useMouseState,
} from './store/mouse/context';

const App = () => {
	return (
		<GridProvider>
			<MouseProvider>
				<div className='container'>
					<Grid />
				</div>
			</MouseProvider>
		</GridProvider>
	);
};

export default App;
