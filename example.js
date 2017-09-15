/**
 * Created by xukankan on 17/6/28.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity,
    Dimensions,
    PanResponder,
    FlatList,
} from 'react-native';
import SlidToDetailView from "../../SlideToDetailVIew/SlideToDetailView";
const {height,width} =Dimensions.get("window");
export default class App extends Component {
    constructor(){
        super();
        this.detailDataSource=["q", 'b', "q", 'b', "q", 'b', "q", 'b', "q", 'b', "q", 'b', "q", 'b', "q", 'b', "q", 'b', "q", 'b',];
        this.mainDataSource=["q", 'b', "q", 'b', "q", 'b', "q", 'b', "q", 'b', "q", 'b', "q", 'b', "q", 'b', "q", 'b', "q", 'b',];
    }
    main() {
        return(
        <FlatList
            data={this.state.mainDataSource}
            renderItem={({item}) => <View style={{height:50,width:width,backgroundColor:"#FFF",margin:20}}><Text>规格</Text></View>}
            keyExtractor={(item, index)=>index}
            onEndReached={this.stop}
            onEndReachedThreshold={0.01}
            contentContainerStyle={{paddingVertical: 20}}
            initialNumToRender={8}
            removeClippedSubviews={false}
            onScrollShouldSetResponder={false}
            onStartShouldSetResponder={()=>false}
            bounces={false}
            ref="main"
        />
        )
    }
    detail() {
        return(
            <FlatList
                data={this.state.mainDataSource}
                renderItem={({item}) =><View style={{height:50,width:width,backgroundColor:"#FFF",margin:20}}><Text>详情</Text></View>}
                keyExtractor={(item, index)=>index}
                contentContainerStyle={{paddingVertical: 20}}
                bounces={false}
                onMomentumScrollEnd={this._onMomentumScrollEnd}
                onScrollEndDrag={this._onScrollEndDrag}
                onStartShouldSetResponder={()=>false}
                onScrollShouldSetResponder={false}
                ref="detail"
            />)
    }

    componentWillMount() {

    }


    render() {
        return (
                <SlidToDetailView main={this.main} detail={this.detail} detailDataSource={this.detailDataSource} mainDataSource={this.mainDataSource}/>
        );
    }
}