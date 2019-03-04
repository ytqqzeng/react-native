import React, { Component } from 'react';
// import App from "./containers/index";
import {
    View,
    BackHandler,
    Alert,SafeAreaView
} from "react-native";
import AppNavigator from './navigators/AppNavigator'
import { Provider } from "react-redux";
// import store from "./store/index";
import { store, persistor } from "./store/index";
import SplashScreen from 'react-native-splash-screen'
import { NavigationActions } from 'react-navigation';

import { PersistGate } from 'redux-persist/integration/react'

export default class Index extends Component {
    componentDidMount() {
        // SplashScreen.hide()
        // 对安卓物理后退按键的监听
        // BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }
     
    render() {
        return <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            <SafeAreaView style={{flex: 1, backgroundColor: '#333'}}>
                <AppNavigator />
                </SafeAreaView>
            </PersistGate>
        </Provider>;
    }
}