export const acknowledgeClickEventAction = () => ({
	type: 'acknowledgeClickEvent',
});

export const setIsPointerDownAction = (body) => ({
	type: 'setIsPointerDown',
	value: body,
});

export const setPointerPosAction = (body) => ({
	type: 'setPointerPos',
	value: body,
});
