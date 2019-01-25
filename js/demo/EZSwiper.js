/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image
} from 'react-native';

const { height, width } = Dimensions.get('window');
import EZSwiper from 'react-native-ezswiper';
import PageControl from 'react-native-page-control';

const images = [require(`../../res/pageImage/swipper1.jpg`),require(`../../res/pageImage/swipper1.jpg`),require(`../../res/pageImage/swipper1.jpg`),require(`../../res/pageImage/swipper1.jpg`),require(`../../res/pageImage/swipper1.jpg`),require(`../../res/pageImage/swipper1.jpg`),require(`../../res/pageImage/swipper1.jpg`),require(`../../res/pageImage/swipper1.jpg`),require(`../../res/pageImage/swipper1.jpg`)]

export default class App extends Component<{}> {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 0,
    };
  }

  renderTitle(title){
    return <Text style={{backgroundColor:'green'}}>{title}</Text>
  }

  renderRow(obj, index) {
    return (
      <View style={[styles.cell,{backgroundColor:index % 2 === 0 ? 'red' : 'yellow'}]}>
        <Text>{obj}</Text>
      </View>
    )
  }

  renderImageRow(obj, index) {    
    return (
      <View style={[styles.cell,{backgroundColor: '#EEEEEE',overflow:'hidden'}]}>
       <Image
       style={{position:'absolute',top:0,right:0,bottom:0,left:0,width: undefined, height: undefined}}
        resizeMode={'contain'}
        source={obj}/>
                <Text style={{backgroundColor:'transparent',color:'white'}}>{'Victoria\'s Secre ' + index}</Text>

      </View>
    )
  }
  
  
  onPressRow(obj, index) {
    console.log('onPressRow=>obj:'+ obj + ' ,index:' + index);
    alert('onPressRow=>obj:'+ obj + ' ,index:' + index);
  }

  onWillChange(obj, index) {
    console.log('onWillChange=>obj:'+ obj + ' ,index:' + index);
    // alert('onWillChange=>obj:'+ obj + ' ,index:' + index);
  }
  
  onDidChange(obj, index) {
    console.log('onDidChange=>obj:'+ obj + ' ,index:' + index);
    // alert('onDidChange=>obj:'+ obj + ' ,index:' + index);
  }

  render() {
    return (
        <ScrollView style={[styles.container]} contentInsetAdjustmentBehavior="automatic">
          {this.renderTitle('test')}
          <EZSwiper style={[styles.swiper,{width: width,height: 150 }]}
                    dataSource={['0', '1' ,'2','3']}
                    width={ width }
                    height={150 }
                    renderRow={this.renderRow}
                    onPress={this.onPressRow}      
                    onWillChange={this.onWillChange}     
                    onDidChange={this.onDidChange}                                                                                
                    ratio={0.6}
                    index={2}   
                    horizontal={true}  
                    loop={true}  
                    autoplayTimeout={2}                                      
                    />
          {this.renderTitle('normal')}
          <View>
          <EZSwiper style={[styles.swiper,{width: width,height: 150 }]}
                    dataSource={['0', '1' ,'2','3']}
                    width={ width }
                    height={150 }
                    renderRow={this.renderRow}
                    onPress={this.onPressRow}
                    onDidChange={(obj, index) => { this.setState({ currentPage: index }) }}/>
                    <PageControl
          style={styles.pageControl}
          numberOfPages={4}
          currentPage={this.state.currentPage}
          hidesForSinglePage
          indicatorStyle={{ borderWidth: 1, borderColor: 'white', marginLeft: 5, marginRight: 0 }}
          currentIndicatorStyle={{ marginLeft: 5, marginRight: 0 }}
          pageIndicatorTintColor='rgba(255,255,255,0.50)'
          currentPageIndicatorTintColor={'green'}
          indicatorSize={{ width: 5, height: 5 }} />
                    </View>
          {this.renderTitle('card: ratio={0.867}')}
          <EZSwiper style={[styles.swiper,{width: width,height: 150 }]}
                    dataSource={images}
                    width={ width }
                    height={150 }
                    renderRow={this.renderImageRow}
                    onPress={this.onPressRow} 
                    // ratio={0.867}    
                    ratio={0.5}                 
                    />
          {this.renderTitle('card: ratio={0.867},loop={false},index={2},width: width - 100')}
            <EZSwiper style={[styles.swiper,{width: width - 100,height: 150,marginHorizontal:50 }]}
                    dataSource={['0', '1' ,'2','3','4']}
                    width={ width - 100}
                    height={150 }
                    renderRow={this.renderRow}
                    onPress={this.onPressRow} 
                    ratio={0.867}  
                    loop={false}  
                    index={2}                
                    />
          {this.renderTitle('card: ratio={0.867},horizontal={false}aaaa')}
          <EZSwiper style={[styles.swiper,{width: width,height: 150 }]}
                    dataSource={['0', '1' ,'2','3']}
                    width={ width }
                    height={150 }
                    renderRow={this.renderRow}
                    onPress={this.onPressRow} 
                    cardParams={{cardSide:width*0.867, cardSmallSide:150*0.867,cardSpace:width*(1-0.867)/2*0.2}}  
                    />
          {this.renderTitle('card: ratio={0.867},horizontal={false}')}
          <EZSwiper style={[styles.swiper,{width: width,height: 200 }]}
                    dataSource={['0', '1' ,'2','3']}
                    width={ width }
                    height={200 }
                    renderRow={this.renderRow}
                    onPress={this.onPressRow} 
                    ratio={0.867} 
                    horizontal={false}  
                    />
          </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',    
  },
  swiper: {
    backgroundColor: 'white',
  },
  cell: {
    backgroundColor: 'red',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageControl: {
    position: 'absolute',
    bottom: 4,
    right: 10,
  },
});