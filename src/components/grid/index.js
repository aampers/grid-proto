import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { useGridState } from '../../store/grid/context';
import { setup } from '../../utils/grid';
import { drawGrid } from '../../utils/draw';
import { useMouseState } from '../../store/mouse/context';
import Canvas from '../canvas';
import './grid.css';

const normalizeRotation = (min, max, deadzone, multiplier) => (
	previousValue,
	change
) => {
	if (Math.abs(change) < deadzone) return previousValue;
	const newValue = previousValue + change * multiplier;
	if (newValue > max) return max;
	if (newValue < min) return min;
	return newValue;
};

const normalizeX = normalizeRotation(0, 1.35, 1, -0.001);
const normalizeZ = normalizeRotation(-Infinity, Infinity, 1, 0.003);

const Grid = (props) => {
	const grid = setup();
	const { mousePosDiff } = useMouseState();
	const [xRotation, setXRotation] = useState(1);
	const [zRotation, setZRotation] = useState(1);

	useEffect(() => {
		setZRotation(normalizeZ(zRotation, mousePosDiff[0]));
		setXRotation(normalizeX(xRotation, mousePosDiff[1]));
	}, [mousePosDiff]);

	const options = {
		xRotation,
		zRotation,
	};

	const draw = useCallback(drawGrid(grid, options), [grid]);

	return (
		<div id='grid-container'>
			<Canvas draw={draw} width='500px' height='500px' />;
		</div>
	);
};

Grid.propTypes = {
	grid: PropTypes.array,
};

export default Grid;
