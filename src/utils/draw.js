import { matrixDotProduct } from './matrix';
import { rotateGrid } from './grid';

const padding = 150;
const size = 50;
const xCenter = (size * 5) / 2 + padding;
const yCenter = (size * 5) / 2 + padding;

// export const drawGrid = (grid, options = {}) => (context, frameCount) => {
export const drawGrid = (originalGrid, options = {}) => (context) => {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	const { sortedGrid: grid, cornerCoords } = rotateGrid(originalGrid, {
		...options,
		padding,
		size,
	});

	if (cornerCoords.length) {
		for (const corner of cornerCoords) {
			const [cx, cy0] = corner;
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
	}

	for (const { coords, fillStyle } of grid) {
		context.fillStyle = fillStyle;
		context.beginPath();
		context.moveTo(coords[0][0], coords[0][1]);
		context.lineTo(coords[1][0], coords[1][1]);
		context.lineTo(coords[2][0], coords[2][1]);
		context.lineTo(coords[3][0], coords[3][1]);
		context.closePath();
		context.fill();
		context.stroke();
	}
};
