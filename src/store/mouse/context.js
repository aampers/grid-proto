import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import mouseReducer from './reducer';

const MouseStateContext = createContext();
const MouseDispatchContext = createContext();

export const defaultState = {
	isMouseDown: false,
	lastMousePos: [0, 0],
	mousePos: [0, 0],
	mousePosDiff: [0, 0],
};

export function MouseProvider({ children }) {
	const [state, dispatch] = useReducer(mouseReducer, defaultState);

	return (
		<MouseStateContext.Provider value={state}>
			<MouseDispatchContext.Provider value={dispatch}>
				{children}
			</MouseDispatchContext.Provider>
		</MouseStateContext.Provider>
	);
}

MouseProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export function useMouseState() {
	const context = useContext(MouseStateContext);

	if (context === undefined) {
		throw new Error('useMouseState must be used within a MouseProvider');
	}

	return context;
}

export function useMouseDispatch() {
	const context = useContext(MouseDispatchContext);

	if (context === undefined) {
		throw new Error('useMouseDispatch must be used within a MouseProvider');
	}

	return context;
}
