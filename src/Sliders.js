import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Sliders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sx: 0,
            sy: 0,
            currentPage: 0,
            totalPage: this.props.children.length - 1,
            w: 0,
            h: 0
        }
    }

    //设定基础参数
    startT = (event) => {
        event.persist();
        let touch = event.touches[0];
        this.init(touch);
        this.setState({
            w: this.props.step ? event.view.innerWidth * this.props.step : event.view.innerWidth * 0.3,
            h: this.props.step ? event.view.innerHeight * this.props.step : event.view.innerHeight * 0.3,
        })

    };
    //设置初始点击位置
    init = (touch) => {
        this.setState({
            sx: touch.pageX,
            sy: touch.pageY,
        })
    };
    //翻下一页
    nextPage = (touch) => {
        this.init(touch);
        if (this.state.currentPage < this.state.totalPage) {
            this.setState({
                currentPage: this.state.currentPage + 1,
            })
        }
    };
    //翻上一页
    prevPage = (touch) => {
        this.init(touch);
        if (this.state.currentPage > 0) {
            this.setState({
                currentPage: this.state.currentPage - 1,
            })
        }
    };

    //监听移动事件，根据条件判断翻页
    move = (event) => {
        event.persist();
        let touch = event.touches[0];
        if (!this.props.sliderY && touch.pageX - this.state.sx > this.state.w) {
            this.prevPage(touch);
        } else if (!this.props.sliderY && touch.pageX - this.state.sx < -this.state.w) {
            this.nextPage(touch)
        } else if (this.props.sliderY && touch.pageY - this.state.sy > this.state.h) {
            this.prevPage(touch)
        } else if (this.props.sliderY && touch.pageY - this.state.sy < -this.state.h) {
            this.nextPage(touch)
        }
    };

    render() {
        let style = {
            position: 'absolute',
            height: '100%',
            width: '100%',
            textAlign: 'center'
        };
        let sliders = this.props.children.map(
            (o, i) => i === this.state.currentPage ? React.cloneElement(o, {
                style: {
                    ...style,
                    display: 'block',
                    ...o.props.style
                },
                key: 'slider' + i
            }) : React.cloneElement(o, {
                style: {
                    ...style,
                    display: "none"
                },
                key: 'slider' + i
            })
        );
        return (
            <div onTouchStart={this.startT} onTouchMove={this.move}>
                {sliders}
            </div>
        );
    }
}

Sliders.propTypes = {
    sliderY: PropTypes.bool,
    step: PropTypes.number
};
export default Sliders;
