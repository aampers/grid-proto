class Space {
	constructor({ position: { x, y } = {}, terrain = {}, occupant = {} }) {
		this.position = {
			x,
			y,
		};
		this.terrain = terrain;
		this.occupant = occupant;
	}
}

export default Space;
