import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useGridState } from '../../store/grid/context';

const Grid = ({ grid }) => {
	console.log('grid', grid);
	// const {
	// grid: { spaces },
	// } = useGridState();
	const spaces = grid.flat(1);

	return (
		<div>
			{spaces.map(({ position: { x, y } }, i) => {
				console.log(`${x}, ${y}`);
				return (
					<Fragment key={i}>
						{i}, {x}, {y}
						<br />
					</Fragment>
				);
			})}
		</div>
	);
};

Grid.propTypes = {
	grid: PropTypes.array,
};

export default Grid;
