/**
 * 
 * https://github.com/facebook/react-native
 * 
 */

import React, { Component } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View ,Image,TouchableOpacity} from 'react-native';


const CITY_NAMES = [
    {
        goodsTitle: '1卖萌神器|我不是狼外婆，我只是一个卖耳罩的小女孩。哈哈哈',
        goodsUrl: "https://gd3.alicdn.com/imgextra/i3/893954391/TB1paz1mMoQMeJjy0FoXXcShVXa_!!0-item_pic.jpg",
        goodsId: "111"

    },
    {
        goodsTitle: '2卖萌神器|我不是狼外婆，我只是一个卖耳罩的小女孩。哈哈哈',
        goodsUrl: "https://gd3.alicdn.com/imgextra/i3/893954391/TB1paz1mMoQMeJjy0FoXXcShVXa_!!0-item_pic.jpg",
        goodsId: "222"

    },
    {
        goodsTitle: '3卖萌神器|我不是狼外婆，我只是一个卖耳罩的小女孩。哈哈哈',
        goodsUrl: "https://gd3.alicdn.com/imgextra/i3/893954391/TB1paz1mMoQMeJjy0FoXXcShVXa_!!0-item_pic.jpg",
        goodsId: "333"

    },
    {
        goodsTitle: '4卖萌神器|我不是狼外婆，我只是一个卖耳罩的小女孩。哈哈哈',
        goodsUrl: "https://gd3.alicdn.com/imgextra/i3/893954391/TB1paz1mMoQMeJjy0FoXXcShVXa_!!0-item_pic.jpg",
        goodsId: "444"

    },
    {
        goodsTitle: '5卖萌神器|我不是狼外婆，我只是一个卖耳罩的小女孩。哈哈哈',
        goodsUrl: "https://gd3.alicdn.com/imgextra/i3/893954391/TB1paz1mMoQMeJjy0FoXXcShVXa_!!0-item_pic.jpg",
        goodsId: "555"

    },
    {
        goodsTitle: '6卖萌神器|我不是狼外婆，我只是一个卖耳罩的小女孩。哈哈哈',
        goodsUrl: "https://gd3.alicdn.com/imgextra/i3/893954391/TB1paz1mMoQMeJjy0FoXXcShVXa_!!0-item_pic.jpg",
        goodsId: "666"

    },
    {
        goodsTitle: '7卖萌神器|我不是狼外婆，我只是一个卖耳罩的小女孩。哈哈哈',
        goodsUrl: "https://gd3.alicdn.com/imgextra/i3/893954391/TB1paz1mMoQMeJjy0FoXXcShVXa_!!0-item_pic.jpg",
        goodsId: "777"

    },
    {
        goodsTitle: '8卖萌神器|我不是狼外婆，我只是一个卖耳罩的小女孩。哈哈哈',
        goodsUrl: "https://gd3.alicdn.com/imgextra/i3/893954391/TB1paz1mMoQMeJjy0FoXXcShVXa_!!0-item_pic.jpg",
        goodsId: "888"

    },

];
export default class Recommend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataArray: CITY_NAMES
        }
    }

    loadData(refreshing) {
        console.warn('5::',5);
        if (refreshing) {
            this.setState({
                isLoading: true
            });
        }
        setTimeout(() => { // 模拟网络请求
            

            this.setState({
                
                isLoading: false,
            })
        }, 2000);
    }

    _renderItem({item}) {
        console.warn('1111::',1111);
        const colors=["#75633C","#75633C","#05583C","#F69870","#A493A2","#A291A0"]
        const index  = parseInt(Math.random()*6)
        return (
            <TouchableOpacity style={[styles.item,{backgroundColor:colors[index]}]}>
                <Image
                    source={{uri:item.goodsUrl}}
                    style={{width:480,height:400}}
                />
                <Text style={{fontSize:30,color:'#fff'}}>{item.goodsTitle}</Text>
            </TouchableOpacity>
        )
    }

    genIndicator() {
        return <View style={styles.indicatorContainer}>
            <ActivityIndicator // 这个是小菊花组件 安卓和ios有点样式区别
                style={styles.indicator}
                size={'large'}
                color={'#666'}
                animating={true} // 是否有动画
            />
            <Text>正在加载更多</Text>
        </View>
    }

    render() {
        
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataArray}
                    renderItem={(data) => this._renderItem(data)}
                    // refreshing={this.state.isLoading}
                    // onRefresh={() => {
                    //     this.loadData();
                    // }}
                    refreshControl={ // 定制下拉刷新功能 上面注释语句也能实现，但是不能自定义
                        <RefreshControl
                            title={'Loading'}
                            colors={['red']} // android 里面 菊花颜色
                            tintColor={'orange'} // ios 里面 菊花颜色
                            titleColor={'red'}
                            refreshing={this.state.isLoading} //下拉刷新
                            onRefresh={() => { // 和上面的属性配套使用
                                this.loadData(true);
                            }}
                        />
                    }
                    ListFooterComponent={() => this.genIndicator()} // 距离底部还有一定距离的时候 出现菊花 触发刷新
                    onEndReached={() => { //到底部的时候会触发这个方法
                        this.loadData(true)
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        borderRadius: 20,
        padding: 20,
        height: 550,
        marginRight: 40,
        marginLeft: 40,
        marginBottom: 40,
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
    indicatorContainer: {
        alignItems: 'center'
    },
    indicator: {
        color: '#333',
        margin: 10
    }
});
