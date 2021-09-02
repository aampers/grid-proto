import Space from '../classes/space';
import { matrixDotProduct } from './matrix';

export const setup = ({ height = 5, width = 5 } = {}) => {
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

	xRotation = xRotation || 1;
	zRotation = zRotation || 1;

	const xCenter = (size * 5) / 2 + padding;
	const yCenter = (size * 5) / 2 + padding;
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

			const zRotationMatrix = [
				[cosZ, sinZ, 0],
				[-sinZ, cosZ, 0],
				[0, 0, 1],
			];

			const xRotationMatrix = [
				[1, 0, 0],
				[0, cosX, sinX],
				[0, -sinX, cosX],
			];

			const translateMatrixA = [
				[1, 0, -xCenter],
				[0, 1, -yCenter],
				[0, 0, 1],
			];

			const translateMatrixB = [
				[1, 0, xCenter],
				[0, 1, yCenter],
				[0, 0, 1],
			];

			// const p0a = matrixDotProduct(translateMatrixA, p0);
			// const p1a = matrixDotProduct(translateMatrixA, p1);
			// const p2a = matrixDotProduct(translateMatrixA, p2);
			// const p3a = matrixDotProduct(translateMatrixA, p3);

			// const p0b = matrixDotProduct(zRotationMatrix, p0a);
			// const p1b = matrixDotProduct(zRotationMatrix, p1a);
			// const p2b = matrixDotProduct(zRotationMatrix, p2a);
			// const p3b = matrixDotProduct(zRotationMatrix, p3a);

			// const p0c = matrixDotProduct(translateMatrixB, p0b);
			// const p1c = matrixDotProduct(translateMatrixB, p1b);
			// const p2c = matrixDotProduct(translateMatrixB, p2b);
			// const p3c = matrixDotProduct(translateMatrixB, p3b);

			// const p0d = matrixDotProduct(xRotationMatrix, p0c);
			// const p1d = matrixDotProduct(xRotationMatrix, p1c);
			// const p2d = matrixDotProduct(xRotationMatrix, p2c);
			// const p3d = matrixDotProduct(xRotationMatrix, p3c);
			
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

			console.log(JSON.stringify(compositionMatrix, null, 4));

			const p0d = matrixDotProduct(compositionMatrix, p0);
			const p1d = matrixDotProduct(compositionMatrix, p1);
			const p2d = matrixDotProduct(compositionMatrix, p2);
			const p3d = matrixDotProduct(compositionMatrix, p3);

			const centerX = (p0d[0][0] + p2d[0][0]) / 2;
			const centerY = (p0d[1][0] + p2d[1][0]) / 2;

			const fillStyle = `hsl(${110 + 0.4 * centerX + 0.4 * centerY}, 60%, ${
				7.5 + 0.275 * centerY
			}%)`;

			if (y === 0) {
				if (x === 0) {
					cornerCoords.push([p0d[0][0], p0d[1][0]]);
				} else if (x === row.length - 1) {
					cornerCoords.push([p1d[0][0], p1d[1][0]]);
				}
			} else if (y === grid.length - 1) {
				if (x === 0) {
					cornerCoords.push([p3d[0][0], p3d[1][0]]);
				} else if (x === row.length - 1) {
					cornerCoords.push([p2d[0][0], p2d[1][0]]);
				}
			}

			rotatedGrid.push({
				coords: [
					[p0d[0][0], p0d[1][0]],
					[p1d[0][0], p1d[1][0]],
					[p2d[0][0], p2d[1][0]],
					[p3d[0][0], p3d[1][0]],
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
