// TODO move logic to a usePointer hook

export const pointerReducer = (state, action) => {
	switch (action.type) {
		case 'acknowledgeClickEvent': {
			console.log(`click at ${state.pointerDownPos}`);
			return { ...state, clickEvent: false };
		}
		case 'setIsPointerDown': {
			const { isPointerDown, pointerPos } = action.value;
			if (isPointerDown) {
				return { ...state, isPointerDown, pointerDownPos: pointerPos };
			} else {
				const { pointerDownPos: lastPointerPos } = state;

				const xDiff = Math.abs(pointerPos[0] - lastPointerPos[0]);
				const yDiff = Math.abs(pointerPos[1] - lastPointerPos[1]);

				const clickEvent = xDiff < 4 && yDiff < 4 ? true : false;

				return { ...state, clickEvent, isPointerDown };
			}
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
