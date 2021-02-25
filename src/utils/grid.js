import Grid from '../classes/grid';
import Space from '../classes/space';

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
