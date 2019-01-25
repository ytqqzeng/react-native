/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
    AsyncStorage,
    Platform,
    Alert,
    TouchableOpacity,
    StyleSheet,
    Image,
    Text,
    FlatList,
    Animated,
    TextInput,
    View,
    Dimensions
} from 'react-native';
import { scaleSize, scaleHeight, setSpText2, } from '../../../util/screenUtil'
import Goods from '../../../models/goods'
import SearchPage from '../../../common/Search'
const { width, height } = Dimensions.get('window')
export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textTop: new Animated.Value(scaleSize(60)),
            textLeft: new Animated.Value(scaleSize(20)),
            isShowSearch: true, // 是否显示搜索初始页面
            history: [], //历史搜索记录
            keyword: '',
            hotSearch: ["口红", "毛衣", "袜子", "保温杯"],
            goodsList: []
        }
    }
      
    render() {
        
        return (
            <View style={styles.container}>
                <SearchPage
                    type={"goodGoodsSearch"}
                    {...this.props} />
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    goBack: {
        width: scaleSize(10),
        height: scaleHeight(20),
        paddingHorizontal: scaleSize(10),
        tintColor: '#222',
    },
    textInput: {
        width: '85%',
        fontSize: setSpText2(30),
        color: '#CCC',
        borderBottomColor: '#CCC',
        borderBottomWidth: 1,
    },
    textInput2: {
        width: '76%',
        fontSize: 20,
        color: '#CCC',
        borderBottomColor: '#CCC',
        borderBottomWidth: 1,
    },
    hotSearch: {
        position: 'absolute',
        top: scaleSize(150),
        left: 0,
        zIndex: 100
    },
    history: {
        position: 'absolute',
        top: scaleSize(250),
        left: 0,
        zIndex: 100,
    },
    keyword: {
        padding: 10,
        backgroundColor: '#FFF3F4',
        color: '#FF4357',
        marginRight: 15,
        borderRadius: 3,
    },
    historyKeyword: {
        marginTop: 5,
        padding: 10,
        backgroundColor: '#eee',
        color: '#222',
        marginRight: 15,
        borderRadius: 3,
    }
});
