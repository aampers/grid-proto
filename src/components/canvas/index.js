import React from 'react';
import PropTypes from 'prop-types';
import useCanvas from '../../hooks/useCanvas';
import {
	usePointerState,
	usePointerDispatch,
} from '../../store/pointer/context';
import {
	setIsPointerDownAction,
	setPointerPosAction,
} from '../../store/pointer/actions';
import throttle from 'lodash.throttle';

const Canvas = ({ draw, options = {}, ...rest }) => {
	const { context } = options;
	const canvasRef = useCanvas(draw, { context });
	const { isPointerDown } = usePointerState();
	const dispatch = usePointerDispatch();

	const handlePointerDown = () => dispatch(setIsPointerDownAction(true));
	const handlePointerUp = () => dispatch(setIsPointerDownAction(false));
	const handlePointerEnter = ({ buttons }) =>
		buttons || dispatch(setIsPointerDownAction(false));

	const handlePointerMove = throttle((event) => {
		if (isPointerDown) {
			dispatch(setPointerPosAction([event.clientX, event.clientY]));
		}
	}, 16);

	return (
		<canvas
			ref={canvasRef}
			onPointerDown={handlePointerDown}
			onPointerUp={handlePointerUp}
			onPointerMove={handlePointerMove}
			onPointerEnter={handlePointerEnter}
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
        this.handlePointerDown = this.handlePointerDown.bind(this);
        this.handlePointerMove = this.handlePointerMove.bind(this);
        this.handlePointerUp = this.handlePointerUp.bind(this);
    }
    render() {
        return (
            <div>    
                <canvas id="canvas" ref="canvas"
                        width={640}
                        height={425}
                        onPointerDown={
                            e => {
                                let nativeEvent = e.nativeEvent;
                                this.handlePointerDown(nativeEvent);
                            }}
                        onPointerMove={
                            e => {
                                let nativeEvent = e.nativeEvent;
                                this.handlePointerMove(nativeEvent);
                            }}    
                        onPointerUp={
                            e => {
                                let nativeEvent = e.nativeEvent;
                                this.handlePointerUp(nativeEvent);
                            }}
                />
            </div>    
        );
    }

    handlePointerDown(event){ //added code here
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
    handlePointerMove(event){

    }
    handlePointerUp(event){
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
