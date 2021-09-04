import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { useGridState } from '../../store/grid/context';
import { setup } from '../../utils/grid';
import { drawGrid } from '../../utils/draw';
import { usePointerState } from '../../store/pointer/context';
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

const normalizeX = normalizeRotation(0, 1.3, 1, -0.001);
const normalizeZ = normalizeRotation(-Infinity, Infinity, 1, 0.003);

const Grid = () => {
	const grid = setup();
	const { pointerPosDiff } = usePointerState();
	const [xRotation, setXRotation] = useState(1);
	const [zRotation, setZRotation] = useState(1);

	useEffect(() => {
		setZRotation(normalizeZ(zRotation, pointerPosDiff[0]));
		setXRotation(normalizeX(xRotation, pointerPosDiff[1]));
	}, [pointerPosDiff]);

	const options = {
		xRotation,
		zRotation,
	};

	const draw = useCallback(drawGrid(grid, options), [grid]);

	return (
		<div id='grid-container'>
			<Canvas draw={draw} width='1500px' height='1500px' />
			{[]}
		</div>
	);
};

Grid.propTypes = {
	grid: PropTypes.array,
};

export default Grid;
