/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 *  
 */

import React, { Component } from 'react';
import {
    Platform,
    Dimensions,
    ActivityIndicator,
    StyleSheet,
    WebView,
    View
} from 'react-native';
import NavigationBar from '../../../common/NavigationBar'
import ViewUtils from '../../../util/ViewUtils'
import HelpCenterModel from '../../../models/helpCenter'
const { width } = Dimensions.get('window')
export default class HelpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            helpPageData: ""
        }
    }
    componentDidMount() {
        const { params } = this.props.navigation.state;
        const title = params ? params.title : null;
        HelpCenterModel.getHelpPage({ title: title }).then(res => {
            if (res.result == 1) {
                this.setState({
                    helpPageData: res.data.content
                })
            }
        })
    }
    _webViewLoaded = () => {
        this.refs.webview.injectJavaScript(`
          const height = document.body.clientHeight;
          window.postMessage(JSON.stringify({height: height}));
        `);
    }
    render() {
        const { navigation } = this.props;
        const { params } = this.props.navigation.state;
        const title = params ? params.title : null;
        const { helpPageData } = this.state
        console.warn('this.state.helpPageData::', this.state.helpPageData);
        let html = `<!DOCTYPE html> 
        <html lang="en">
        <head>
        </head>
        <body width=320px style=\"word-wrap:break-word; font-family:Arial\">
        
          ${helpPageData}
       
          
        </body>
        </html>`
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={title}
                    statusBar={{ backgroundColor: 'steelblue', hidden: true }}
                    style={{ backgroundColor: 'steelblue', }}
                    leftButton={ViewUtils.getLeftButton(() => {
                        navigation.goBack()
                    })}
                />
                {helpPageData ?
                    <WebView
                        scalesPageToFit={true}
                        ref={'webview'}
                        source={{ html: html, baseUrl: '' }}// 这里可以使用uri
                        decelerationRate='normal'
                        scrollEnabled={false}
                        onLoadEnd={this._webViewLoaded}
                        javaScriptEnabled={true}
                        style={{ width:width }}
                    /> :
                    <ActivityIndicator size="large" color="#0000ff" />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
});
