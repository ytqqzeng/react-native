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
    FlatList,
    TouchableOpacity,
    Text,
    View
} from 'react-native';
import HelpCenterModel from '../../../models/helpCenter'
import NavigationBar from '../../../common/NavigationBar'
import ViewUtils from '../../../util/ViewUtils'
import { scaleSize, scaleHeight, setSpText2, } from '../../../util/screenUtil'
export default class HelpCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            helpList: []
        }
    }
    componentDidMount() {
        HelpCenterModel.getTitleFn().then(res => {
            if (res.result == 1) {
                this.setState({
                    helpList: res.data
                })
            }
        })
    }
    _renderItem = (item) => {
        const { navigation } = this.props;
        return (
            <TouchableOpacity
                onPress={()=>{
                    navigation.navigate('HelpPage',{title:item.title})
                }}
            >
                <View style={{ marginVertical: scaleSize(20),flexDirection:'row' }}>
                <Image
                    source={require('../../../../res/image/tag.png')}
                    style={{width:scaleSize(20),height:scaleHeight(20),tintColor:'#666',marginRight:scaleSize(10)}}
                />
                    <Text style={{ fontSize: setSpText2(15) }}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        const navigation = this.props.navigation;
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={"帮助中心"}
                    statusBar={{ backgroundColor: 'steelblue', hidden: true }}
                    style={{ backgroundColor: 'steelblue', }}
                    leftButton={ViewUtils.getLeftButton(() => {
                        navigation.goBack()
                    })}
                />
                <View style={{ paddingHorizontal: scaleSize(30) }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.helpList}
                        renderItem={({ item }) => this._renderItem(item)}
                        keyExtractor={(item) => item.title}
                        ItemSeparatorComponent={() => (
                            <View style={{ height: 1, backgroundColor: '#eee', }} />
                        )}
                    />
                </View>
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
