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
import NavigationBar from '../common/NavigationBar'
import DateRepository  from '../expand/dao/DateRepository'
import RepositoryCell  from '../common/RepositoryCell'
import ScrollableTabView ,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
const URL='https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars'
export default class PopularPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                 <NavigationBar
                    title= '最热'
                    style = {{backgroundColor:'#2196F3'}}
                 />
                 <ScrollableTabView
                    tabBarBackgroundColor='#2196F3' // 背景色
                    tabBarInactiveTextColor='green' // 未激活状态的颜色
                    tabBarActiveTextColor ='#fff' // 激活状态颜色
                    // 下划线样式
                    tabBarUnderlineStyle ={{backgroundColor:'#e7e7e7',height:2}}
                    renderTabBar={()=> <ScrollableTabBar/>} // 自定义tabbar 可以不要这个
                 >
                    <PopularTab tabLabel="java" />
                    <PopularTab tabLabel="javascript" />
                    <PopularTab tabLabel="ios" />
                    <PopularTab tabLabel="android" />
                </ScrollableTabView>
            </View>
        );
    }
}
class PopularTab extends Component {
    state = {
        dataSource:[],
        refreshing:false
    }
    dataRepository = new DateRepository()
    componentDidMount(){
        this.onLoad()
    }
    genUrl(key){
        return URL+key+QUERY_STR
    }
    onLoad(){
        this.setState({
            refreshing:true
        })
        let url = this.genUrl(this.props.tabLabel)
        this.dataRepository.fetchNetRepository(url)
        .then( result => {
            this.setState({
                dataSource: result.items,
                refreshing:false
            })
        })
        .catch(error =>{
             
        })
    }
    render(){
        return (
            <View style={styles.container}>
              <FlatList
                data={this.state.dataSource}
                refreshControl={
                    <RefreshControl
                        refreshing= {this.state.refreshing} //刚刚进入的时候有个加载的图标配合下面函数使用
                        onRefresh = {() => {
                                this.onLoad()
                            }}
                        colors={['yellow']}
                        title={'正在加载...'}
                    />
                  }
                renderItem={({item}) => <RepositoryCell data={item}/>}
                
                onEndReachedThreshold = {0.2} // 距离底部多少距离调用回调配合下面函数使用
                onEndReached ={() => {
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
    tips: {
        fontSize: 29
    },
    input:{
        height:45,
    borderWidth:1,
    marginLeft: 5,
    paddingLeft:5,
    borderColor: '#ccc',
    borderRadius: 4
    },
    textbtn:{
        paddingTop:10,
        paddingBottom:10,
        fontSize:15
    }
});
