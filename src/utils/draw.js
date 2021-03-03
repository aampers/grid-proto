import { matrixDotProduct } from './matrix';

const padding = 150;
const size = 50;
const xCenter = (size * 5) / 2 + padding;
const yCenter = (size * 5) / 2 + padding;

// export const drawGrid = (grid, options = {}) => (context, frameCount) => {
export const drawGrid = (grid, options = {}) => (context) => {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	let { xRotation, zRotation } = options;
	xRotation = xRotation || Math.PI / 3;
	zRotation = zRotation || Math.PI / 3;

	const sinZ = Math.sin(zRotation);
	const cosZ = Math.cos(zRotation);
	const sinX = Math.sin(xRotation);
	const cosX = Math.cos(xRotation);

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

			const p0a = matrixDotProduct(translateMatrixA, p0);
			const p1a = matrixDotProduct(translateMatrixA, p1);
			const p2a = matrixDotProduct(translateMatrixA, p2);
			const p3a = matrixDotProduct(translateMatrixA, p3);

			// if (haslogged < 5) {
			// 	console.log('p0a', p0a);
			// 	console.log('p1a', p1a);
			// 	console.log('p2a', p2a);
			// 	console.log('p3a', p3a);
			// 	haslogged++;
			// }

			const p0b = matrixDotProduct(zRotationMatrix, p0a);
			const p1b = matrixDotProduct(zRotationMatrix, p1a);
			const p2b = matrixDotProduct(zRotationMatrix, p2a);
			const p3b = matrixDotProduct(zRotationMatrix, p3a);

			const p0c = matrixDotProduct(translateMatrixB, p0b);
			const p1c = matrixDotProduct(translateMatrixB, p1b);
			const p2c = matrixDotProduct(translateMatrixB, p2b);
			const p3c = matrixDotProduct(translateMatrixB, p3b);

			const p0d = matrixDotProduct(xRotationMatrix, p0c);
			const p1d = matrixDotProduct(xRotationMatrix, p1c);
			const p2d = matrixDotProduct(xRotationMatrix, p2c);
			const p3d = matrixDotProduct(xRotationMatrix, p3c);

			const centerX = (p0d[0][0] + p2d[0][0]) / 2;
			const centerY = (p0d[1][0] + p2d[1][0]) / 2;

			context.fillStyle = `hsl(${110 + 0.4 * centerX + 0.4 * centerY}, 60%, ${
				7.5 + 0.275 * centerY
			}%)`;

			const cornerCoords = [];
			if (y === 0) {
				if (x === 0) {
					cornerCoords.push(p0d[0][0], p0d[1][0]);
				} else if (x === row.length - 1) {
					cornerCoords.push(p1d[0][0], p1d[1][0]);
				}
			} else if (y === grid.length - 1) {
				if (x === 0) {
					cornerCoords.push(p3d[0][0], p3d[1][0]);
				} else if (x === row.length - 1) {
					cornerCoords.push(p2d[0][0], p2d[1][0]);
				}
			}

			if (cornerCoords.length) {
				const [cx, cy0] = cornerCoords;
				const cy1 = cy0 + 25;
				const grad = context.createLinearGradient(cx, cy0, cx, cy1);
				grad.addColorStop(0, '#000');
				grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
				context.strokeStyle = grad;
				context.beginPath();
				context.moveTo(cx, cy0);
				context.lineTo(cx, cy1);
				context.stroke();
				context.strokeStyle = '#000';
			}

			context.beginPath();
			context.moveTo(p0d[0][0], p0d[1][0]);
			context.lineTo(p1d[0][0], p1d[1][0]);
			context.lineTo(p2d[0][0], p2d[1][0]);
			context.lineTo(p3d[0][0], p3d[1][0]);
			context.closePath();
			context.fill();
			context.stroke();
		}
	}
};
