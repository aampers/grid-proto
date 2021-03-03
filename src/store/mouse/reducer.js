export const mouseReducer = (state, action) => {
	switch (action.type) {
		case 'setIsMouseDown': {
			return { ...state, isMouseDown: action.value };
		}

		case 'setMousePos': {
			const { mousePos: lastMousePos } = state;
			const { value: mousePos } = action;
			const cap = (value) =>
				value >= 0 ? Math.min(value, 20) : Math.max(value, -20);
			const mousePosDiff = [
				cap(mousePos[0] - lastMousePos[0]),
				cap(mousePos[1] - lastMousePos[1]),
			];
			return {
				...state,
				lastMousePos,
				mousePos,
				mousePosDiff,
			};
		}

		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
};

export default mouseReducer;
