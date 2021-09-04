export const pointerReducer = (state, action) => {
	switch (action.type) {
		case 'setIsPointerDown': {
			return { ...state, isPointerDown: action.value };
		}

		case 'setPointerPos': {
			const { pointerPos: lastPointerPos } = state;
			const { value: pointerPos } = action;
			const cap = (value) =>
				value >= 0 ? Math.min(value, 20) : Math.max(value, -20);
			const pointerPosDiff = [
				cap(pointerPos[0] - lastPointerPos[0]),
				cap(pointerPos[1] - lastPointerPos[1]),
			];
			return {
				...state,
				lastPointerPos,
				pointerPos,
				pointerPosDiff,
			};
		}

		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
};

export default pointerReducer;
