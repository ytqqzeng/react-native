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
    View
} from 'react-native';
import Swiper from 'react-native-swiper'



export default class Swipper extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        // fetch("http://10.0.2.2:18081/b2c/api/shop/cart/get-cart-data.do?_=1543904137654")
        //     .then((response) => response.json())        // json方式解析，如果是text就是 response.text()
        //     .then((responseData) => {   // 获取到的数据处理
        //         console.warn(`responseData:${responseData.data.count}`)
        //     })
        //     .catch((error) => {     // 错误处理 
        //         console.warn(`error:${error}`)
        //     })
    }
    render() {
        return (
            <View style={styles.container}>
                <Swiper style={styles.wrapper} showsButtons={false}
                    height={240}
                >
                    <View style={styles.slide1}>
                        <Text style={styles.text}>Hello Swiper</Text>
                    </View>
                    <View style={styles.slide2}>
                        <Text style={styles.text}>Beautiful</Text>
                    </View>
                    <View style={styles.slide3}>
                        <Text style={styles.text}>And simple</Text>
                    </View>
                </Swiper>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',

    },
    wrapper: {
        flexDirection: 'row'
    },
    slide1: {

        height: 400,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {

        height: 400,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {

        height: 400,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
});
