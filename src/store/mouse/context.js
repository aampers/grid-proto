import React, { createContext, useContext, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import mouseReducer from './reducer';
import throttle from 'lodash.throttle';

const MouseStateContext = createContext();
const MouseDispatchContext = createContext();

export function MouseProvider({ children }) {
	const [isMouseDown, setMouseDown] = useState(false);
	const [mousePos, setMousePos] = useState(null);

	const handleMouseMove = throttle((event) => {
		if (isMouseDown) {
			if (mousePos) {
				let moveX = mousePos[0] - event.clientX;
				console.log('moveX', moveX);
				let moveY = mousePos[1] - event.clientY;
				console.log('moveY', moveY);
			}
			setMousePos([event.clientX, event.clientY]);
		}
	}, 16);

	const handleMouseDown = () => setMouseDown(true);
	const handleMouseUp = () => setMouseDown(false);

	const [state, dispatch] = useReducer(mouseReducer, {
		useMouseDown: [isMouseDown, setMouseDown],
		useMousePos: [mousePos, setMousePos],
		handleMouseMove,
		handleMouseDown,
		handleMouseUp,
	});

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
