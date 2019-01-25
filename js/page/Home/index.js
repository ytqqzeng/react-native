/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Image,
    Text,
    View,
    Button,
    RefreshControl,
    FlatList,
    TextInput
} from 'react-native';
import {scaleSize,scaleHeight,setSpText2,} from '../../util/screenUtil'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'
import NewGood from './NewGood'
import RecommendGood from './Recommend'
 
const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars'
export default class HomeIndex extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const navigation = this.props.navigation;
        return (
            <View style={styles.container}>
                <ScrollableTabView
                    tabBarBackgroundColor='#fff' // 背景色
                    tabBarInactiveTextColor='#999' // 未激活状态的颜色
                    tabBarActiveTextColor='#333' // 激活状态颜色
                    // 下划线样式
                    tabBarUnderlineStyle={{ backgroundColor: '#FF3C50', height: scaleSize(2.5) }}

                    // 这个是插件里面自定义的一个头组件
                    renderTabBar={() => <ScrollableTabBar
                        tabsContainerStyle={styles.scrollBox}
                        textStyle={{ fontSize: setSpText2(18)}}
                    //    style={{fontSize:50}}
                    // style ={styles.scrollBox}
                    />} // 自定义tabbar 可以不要这个
                >
                    <NewGood tabLabel="新品" navigation={navigation} />
                    <RecommendGood tabLabel="推荐" navigation={navigation}/>
                </ScrollableTabView>
            </View>
        );
    }
}
class PopularTab extends Component {
    state = {
        dataSource: [],
        refreshing: false
    }
    dataRepository = new DateRepository()
    componentDidMount() {
        this.onLoad()
    }
    genUrl(key) {
        return URL + key + QUERY_STR
    }
    onLoad() {
        this.setState({
            refreshing: true
        })
        let url = this.genUrl(this.props.tabLabel)
        this.dataRepository.fetchNetRepository(url)
            .then(result => {
                this.setState({
                    dataSource: result.items,
                    refreshing: false
                })
            })
            .catch(error => {

            })
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataSource}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing} //刚刚进入的时候有个加载的图标配合下面函数使用
                            onRefresh={() => {
                                this.onLoad()
                            }}
                            colors={['yellow']}
                            title={'正在加载...'}
                        />
                    }
                    renderItem={({ item }) => <RepositoryCell data={item} />}

                    onEndReachedThreshold={0.2} // 距离底部多少距离调用回调配合下面函数使用
                    onEndReached={() => {
                        this.onLoad()
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
    scrollBox: {
        paddingHorizontal: 80,
        justifyContent: 'center',
    },
});
