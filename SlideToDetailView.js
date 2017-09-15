import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Animated,
    PanResponder,
    Dimensions,
    Platform
} from 'react-native';
const {height, width} =Dimensions.get("window");
export default class SlideToDetailView extends Component {
    constructor(props) {
        super(props);
        this.borderTag = false;//判断是否到达边界
        this.mainTag = true;//判断处于main还是detail
        this.state = {
            mainDataSource: this.props.mainDataSource
        }
    }
    componentWillMount() {
        this._animatedValue = new Animated.ValueXY();
        this._value = {x: 0, y: 0}
        this._animatedValue.addListener((value) => {
            this._value = value;
        });
        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponderCapture: this._MoveShouldSetPanResponderCapture,
            onPanResponderMove: Animated.event([
                null, {dy: this._animatedValue.y}
            ]),
            onPanResponderRelease: this._onPanResponderRelease,
            onPanResponderGrant: (e, gestureState) => {
                if (!this.mainTag) {
                    this._animatedValue.setOffset({x: 0, y: -height});
                } else {
                    this._animatedValue.setOffset({x: 0, y: 0});
                }
                this._animatedValue.setValue({x: 0, y: 0});
            },
            onPanResponderTerminate: (evt, gestureState) => {

            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者 
                // 默认返回true。目前暂时只支持android。 
                return true;
            },
        });
    }

    /**
     * 是否拦截滑动事件
     * @param evt
     * @param gestureState
     * @returns {boolean}
     * @private
     */
    _MoveShouldSetPanResponderCapture = (evt, gestureState)=> {
        if (!this.borderTag) {return false;}
        if(this.mainTag){
            if (gestureState.vy > 0) {
                this.borderTag = false;return false;}
            return true
        }else{
            if (gestureState.vy < 0) {this.borderTag = false;return false;}
            return true
        }


    }

    /**
     * 滑动结束调用
     * @param evt
     * @param gestureState
     * @private
     */
    _onPanResponderRelease = (evt, gestureState) => {
        if(!this.borderTag){
            return
        }
        if(this.mainTag) {

            if(gestureState.vy<0 && Platform.OS!="ios"){this.mainTag = false;Animated.spring(this._animatedValue, {toValue: -height, tension: 8}).start();return}
            if (gestureState.dy >= 0) {Animated.spring(this._animatedValue, {toValue: 0, tension: 8}).start();return}
            if (gestureState.dy > -30) {Animated.spring(this._animatedValue, {toValue: 0, tension: 8}).start();return}
            if (gestureState.dy < -30) {this.mainTag = false;Animated.spring(this._animatedValue, {toValue: -height, tension: 8}).start();return}
            } else {
            if(gestureState.vy>0 && Platform.OS!="ios"){this.mainTag = true;Animated.spring(this._animatedValue, {toValue: height, tension: 8}).start();return}
            if (gestureState.dy <= 0) {Animated.spring(this._animatedValue, {toValue: 0, tension: 8}).start();return}
                if (gestureState.dy < 30) {Animated.spring(this._animatedValue, {toValue:0, tension: 8}).start();return}
                if (gestureState.dy > 30) {this.mainTag = true;Animated.spring(this._animatedValue, {toValue: height, tension: 8}).start();return}
            }
    }
    /**
     *列表滚动结束调用
     * @private
     */
    _onMomentumScrollEnd=(e)=>{
        let distance = e.nativeEvent.contentOffset.y;
        if (distance <5) {
            this.borderTag=true;
        }else{
            this.borderTag=false;
        }
    }
    /**
     * 触摸滑动手指离开时调用
     * @private
     */
    _onScrollEndDrag=(e)=>{
        let distance = e.nativeEvent.contentOffset.y;
        if (distance <5) {
            this.borderTag=true;
        }else{
            this.borderTag=false;
        }
    }
    /**
     * mian列表到达底部调用
     */
    stop = ()=> {
        if (!this.borderTag) {
            this.borderTag = true;
        }
        this.setState({
            mainDataSource: [...this.state.mainDataSource]
        })
    }
    render() {
        const {main, detail}=this.props;
        return (
            <Animated.View style={{height:height*2, backgroundColor: "#AAAAAA", transform: [{translateY: this._animatedValue.y}]}} {...this._panResponder.panHandlers}>
                <View style={{height: height}}>
                    {main.bind(this)()}
                </View>
                <View style={{height: height,backgroundColor:"#FFF"}}>
                    {detail.bind(this)()}
                </View>
            </Animated.View>)
    }
}
SlideToDetailView.propTypes = {
    main: PropTypes.func,
    detail: PropTypes.func
}
SlideToDetailView.defaultProps = {
    main: ()=> {
    },
    detail: ()=> {
    },
}
