import { rotateGrid } from './grid';

const padding = 150;
const size = 50;

// export const drawGrid = (grid, options = {}) => (context, frameCount) => {
export const drawGrid = (originalGrid, options = {}) => (context) => {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	const { sortedGrid: grid, cornerCoords } = rotateGrid(originalGrid, {
		...options,
		padding,
		size,
	});

	// const offset = 250 - (cornerCoords[0][1] + cornerCoords[3][1]) / 2;
	const offset = 250 - (cornerCoords[0][1] + cornerCoords[3][1]) / 2;

	if (cornerCoords.length) {
		for (const corner of cornerCoords) {
			const [cx, cy0] = corner;
			const cy1 = cy0 + 25;
			const grad = context.createLinearGradient(
				cx,
				cy0 + offset,
				cx,
				cy1 + offset
			);
			grad.addColorStop(0, '#000');
			grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
			context.strokeStyle = grad;
			context.beginPath();
			context.moveTo(cx, cy0 + offset);
			context.lineTo(cx, cy1 + offset);
			context.stroke();
			context.strokeStyle = '#000';
		}
	}

	for (const { coords, fillStyle } of grid) {
		context.fillStyle = fillStyle;
		context.beginPath();
		context.moveTo(coords[0][0], coords[0][1] + offset);
		context.lineTo(coords[1][0], coords[1][1] + offset);
		context.lineTo(coords[2][0], coords[2][1] + offset);
		context.lineTo(coords[3][0], coords[3][1] + offset);
		context.closePath();
		context.fill();
		context.stroke();
	}

	context.fillStyle = 'black';
	context.font = '15px Arial';
	// context.fillText(`y1: ${cornerCoords[3][1]}`, 10, 90);
};
