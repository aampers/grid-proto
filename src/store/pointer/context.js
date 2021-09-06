import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import pointerReducer from './reducer';

const PointerStateContext = createContext();
const PointerDispatchContext = createContext();

export const defaultState = {
	isPointerDown: false,
	pointerDownPos: [null, null],
	lastPointerPos: [0, 0],
	pointerPos: [0, 0],
	pointerPosDiff: [0, 0],
};

export function PointerProvider({ children }) {
	const [state, dispatch] = useReducer(pointerReducer, defaultState);

	return (
		<PointerStateContext.Provider value={state}>
			<PointerDispatchContext.Provider value={dispatch}>
				{children}
			</PointerDispatchContext.Provider>
		</PointerStateContext.Provider>
	);
}

PointerProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export function usePointerState() {
	const context = useContext(PointerStateContext);

	if (context === undefined) {
		throw new Error('usePointerState must be used within a PointerProvider');
	}

	return context;
}

export function usePointerDispatch() {
	const context = useContext(PointerDispatchContext);

	if (context === undefined) {
		throw new Error('usePointerDispatch must be used within a PointerProvider');
	}

	return context;
}
