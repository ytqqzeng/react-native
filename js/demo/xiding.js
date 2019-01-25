import React, { Component } from 'react'
import NavPage from './NavPage'
import { View, ScrollView, Image, Dimensions, Platform } from 'react-native'

let { width } = Dimensions.get('window')
let navHeight = (Platform.OS === 'ios' ? 20 : 0) + 45

export default class Xiding extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opacity: 0
    }
  }

  onScroll = (event) => {
    let offsetY = event.nativeEvent.contentOffset.y
    let opacity = offsetY / navHeight
    // if(opacity > 5 || opacity < -5) { // 这里可以优化减少render， 1和0 滑快了会有些影响， 这里你可以看着给值， 当然也可以不优化
    //   return
    // }
    this.setState({
      opacity
    }) 
  }

  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <NavPage title={'个人中心'} opacity={this.state.opacity} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref='scroll'
          onScroll={this.onScroll}
          scrollEventThrottle={10}>
          <Image style={{ width: width, height: 300 }} source={{ uri: 'https://dimg07.c-ctrip.com/images/100e0t000000ihd4r494C_C_500_280.jpg' }} />
          <Image style={{ width: width, height: 300, marginTop: 20 }} source={{ uri: 'https://dimg04.c-ctrip.com/images/300e0q000000g5o8b658A_C_500_280.jpg' }} />
          <Image style={{ width: width, height: 300, marginTop: 20 }} source={{ uri: 'https://dimg04.c-ctrip.com/images/100l0s000000hg344225B_C_500_280.jpg' }} />
          <Image style={{ width: width, height: 300, marginTop: 20 }} source={{ uri: 'https://youimg1.c-ctrip.com/target/100f0d0000006xaav4A5E_C_220_110.jpg' }} />
        </ScrollView>
      </View>
    )
  }
}
