import Space from '../classes/space';
import { matrixDotProduct } from './matrix';

export const setup = ({ height = 15, width = 15 } = {}) => {
	const spaces = [];

	// todo useRef here
	for (let y = 0; y < height; y++) {
		const row = [];
		for (let x = 0; x < width; x++) {
			const space = new Space({
				position: { x, y },
			});
			row.push(space);
		}
		spaces.push(row);
	}

	return spaces;
};

export const rotateGrid = (grid, options) => {
	let { padding, size, xRotation, zRotation } = options;

	xRotation = xRotation == null ? 1 : xRotation;
	zRotation = zRotation || 1;

	const xCenter = (size * 15) / 2 + padding;
	const yCenter = (size * 15) / 2 + padding;
	const sinZ = Math.sin(zRotation);
	const cosZ = Math.cos(zRotation);
	const sinX = Math.sin(xRotation);
	const cosX = Math.cos(xRotation);

	const rotatedGrid = [];
	const cornerCoords = [];

	for (let row of grid) {
		for (let space of row) {
			const { x, y } = space.position;

			const x0 = padding + size * x;
			const y0 = padding + size * y;
			const p0 = [[x0], [y0], [1]];
			const p1 = [[x0 + size], [y0], [1]];
			const p2 = [[x0 + size], [y0 + size], [1]];
			const p3 = [[x0], [y0 + size], [1]];

			// const zRotationMatrix = [
			// 	[cosZ, sinZ, 0],
			// 	[-sinZ, cosZ, 0],
			// 	[0, 0, 1],
			// ];

			// const xRotationMatrix = [
			// 	[1, 0, 0],
			// 	[0, cosX, sinX],
			// 	[0, -sinX, cosX],
			// ];

			// const translateMatrixA = [
			// 	[1, 0, -xCenter],
			// 	[0, 1, -yCenter],
			// 	[0, 0, 1],
			// ];

			// const translateMatrixB = [
			// 	[1, 0, xCenter],
			// 	[0, 1, yCenter],
			// 	[0, 0, 1],
			// ];

			const compositionMatrix = [
				[
					cosZ, sinZ, xCenter - (yCenter * sinZ) - (xCenter * cosZ)
				],
				[
					(-sinZ * cosX), (cosZ * cosX), (xCenter * sinZ * cosX) - (yCenter * cosZ * cosX) + (yCenter * cosX) + (sinX)
				],
				[
					sinZ * sinX, -cosZ * sinX, (-xCenter * sinZ * sinX) + (yCenter * cosZ * sinX) - (yCenter * sinX) + cosX
				]
			];

			const p0α = matrixDotProduct(compositionMatrix, p0);
			const p1α = matrixDotProduct(compositionMatrix, p1);
			const p2α = matrixDotProduct(compositionMatrix, p2);
			const p3α = matrixDotProduct(compositionMatrix, p3);

			const centerX = (p0α[0][0] + p2α[0][0]) / 2;
			const centerY = (p0α[1][0] + p2α[1][0]) / 2;

			const fillStyle = `hsl(${125 + 0.15 * centerX + 0.15 * centerY}, ${
				10 + 0.25 * centerY}%, ${30 + 0.05 * centerY}%)`;

			if (y === 0) {
				if (x === 0) {
					cornerCoords.push([p0α[0][0], p0α[1][0]]);
				} else if (x === row.length - 1) {
					cornerCoords.push([p1α[0][0], p1α[1][0]]);
				}
			} else if (y === grid.length - 1) {
				if (x === 0) {
					cornerCoords.push([p3α[0][0], p3α[1][0]]);
				} else if (x === row.length - 1) {
					cornerCoords.push([p2α[0][0], p2α[1][0]]);
				}
			}

			rotatedGrid.push({
				coords: [
					[p0α[0][0], p0α[1][0]],
					[p1α[0][0], p1α[1][0]],
					[p2α[0][0], p2α[1][0]],
					[p3α[0][0], p3α[1][0]],
				],
				center: [centerX, centerY],
				fillStyle,
			});
		}
	}

	const sortedGrid = rotatedGrid.sort((a, b) =>
		a.center[1] > b.center[1] ? 1 : -1
	);

	return {
		sortedGrid,
		cornerCoords,
	};
};
