export const mouseReducer = (state, action) => {
	switch (action.type) {
		case 'set': {
			return { mouse: action.value };
		}

		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
};

export default mouseReducer;
