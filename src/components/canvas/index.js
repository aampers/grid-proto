import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import useCanvas from '../../hooks/useCanvas';
import { useMouseState } from '../../store/mouse/context';

const Canvas = ({ draw, options = {}, ...rest }) => {
	const { context } = options;
	const canvasRef = useCanvas(draw, { context });
	const {
		handleMouseDown,
		handleMouseUp,
		handleMouseMove,
		useMouseDown,
	} = useMouseState();

	const [mouseDown] = useMouseDown;
	console.log('mouseDown', mouseDown);

	return (
		<canvas
			ref={canvasRef}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseMove={handleMouseMove}
			{...rest}
		/>
	);
};

Canvas.propTypes = {
	draw: PropTypes.func,
	options: PropTypes.object,
};

export default Canvas;

/* 
export default class canvas extends React.Component{
    constructor(props) {
        super(props);
        //added state 
        this.state={
            isDown: false,
            previousPointX:'',
            previousPointY:''
        }
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }
    render() {
        return (
            <div>    
                <canvas id="canvas" ref="canvas"
                        width={640}
                        height={425}
                        onMouseDown={
                            e => {
                                let nativeEvent = e.nativeEvent;
                                this.handleMouseDown(nativeEvent);
                            }}
                        onMouseMove={
                            e => {
                                let nativeEvent = e.nativeEvent;
                                this.handleMouseMove(nativeEvent);
                            }}    
                        onMouseUp={
                            e => {
                                let nativeEvent = e.nativeEvent;
                                this.handleMouseUp(nativeEvent);
                            }}
                />
            </div>    
        );
    }

    handleMouseDown(event){ //added code here
        console.log(event);    
        this.setState({
            isDown: true,
            previousPointX:event.offsetX,
            previousPointY:event.offsetY
        },()=>{    
            const canvas = ReactDOM.findDOMNode(this.refs.canvas);    
            var x = event.offsetX;
            var y = event.offsetY;
            var ctx = canvas.getContext("2d");
            console.log(x,y);
            ctx.moveTo(x,y);
            ctx.lineTo(x+1,y+1);
            ctx.stroke();
        })
    }
    handleMouseMove(event){

    }
    handleMouseUp(event){
        this.setState({
            isDown: false
        });
        //if(this.state.isDown){
            const canvas = ReactDOM.findDOMNode(this.refs.canvas);
            var x = event.offsetX;
            var y = event.offsetY;
            var ctx = canvas.getContext("2d");

            ctx.moveTo(this.state.previousPointX,this.state.previousPointY);
            ctx.lineTo(x,y);
            ctx.stroke();
            ctx.closePath();
        //}
    }
    componentDidMount() {
        const canvas = ReactDOM.findDOMNode(this.refs.canvas);
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = 'rgb(200,255,255)';
        ctx.fillRect(0, 0, 640, 425);
    }
}
 */
