import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import Grid from '../../classes/grid';

const GridStateContext = createContext();
const GridDispatchContext = createContext();

function gridReducer(state, action) {
	switch (action.type) {
		case 'set': {
			return { grid: action.value };
		}

		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
}

export function GridProvider({ children }) {
	const [state, dispatch] = useReducer(gridReducer, { grid: new Grid() });

	return (
		<GridStateContext.Provider value={state}>
			<GridDispatchContext.Provider value={dispatch}>
				{children}
			</GridDispatchContext.Provider>
		</GridStateContext.Provider>
	);
}

GridProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export function useGridState() {
	const context = useContext(GridStateContext);

	if (context === undefined) {
		throw new Error('useGridState must be used within a GridProvider');
	}

	return context;
}

export function useGridDispatch() {
	const context = useContext(GridDispatchContext);

	if (context === undefined) {
		throw new Error('useGridDispatch must be used within a GridProvider');
	}

	return context;
}
