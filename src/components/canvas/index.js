import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useCanvas from '../../hooks/useCanvas';
import {
	usePointerState,
	usePointerDispatch,
} from '../../store/pointer/context';
import {
	acknowledgeClickEventAction,
	setIsPointerDownAction,
	setPointerPosAction,
} from '../../store/pointer/actions';
import throttle from 'lodash.throttle';

const Canvas = ({ draw, options = {}, ...rest }) => {
	const { context } = options;
	const canvasRef = useCanvas(draw, { context });
	const { isPointerDown } = usePointerState();
	const dispatch = usePointerDispatch();

	const handlePointerDown = (event) =>
		dispatch(
			setIsPointerDownAction({
				isPointerDown: true,
				pointerPos: [event.clientX, event.clientY],
			})
		);
	const handlePointerUp = (event) =>
		dispatch(
			setIsPointerDownAction({
				isPointerDown: false,
				pointerPos: [event.clientX, event.clientY],
			})
		);
	const handlePointerEnter = (event) => ({ buttons }) =>
		buttons ||
		dispatch(
			setIsPointerDownAction({
				isPointerDown: false,
				pointerPos: [event.clientX, event.clientY],
			})
		);

	const handlePointerMove = throttle((event) => {
		if (isPointerDown) {
			dispatch(setPointerPosAction([event.clientX, event.clientY]));
		}
	}, 16);

	return (
		<canvas
			ref={canvasRef}
			onPointerDown={handlePointerDown}
			onPointerUp={handlePointerUp}
			onPointerMove={handlePointerMove}
			onPointerEnter={handlePointerEnter}
			{...rest}
		/>
	);
};

Canvas.propTypes = {
	draw: PropTypes.func,
	options: PropTypes.object,
};

export default Canvas;
