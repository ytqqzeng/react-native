import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';


/**
 * 自定义导航栏
 */
let height = (Platform.OS === 'ios' ? 20 : 0) + 45
export default class NavPage extends Component {

  render() {
    let { opacity, children, title } = this.props
    return (
      <View style={[styles.container, { backgroundColor: `rgba(255,255,255, ${opacity})` }]}>
        {
          <View style={{ alignItems: 'center', flex: 1 }}>
            {
              opacity < 0.1 ? null :
                (children || <Text style={{ fontSize: 17,color: `rgba(0,0,0, ${opacity})` }}>{title}</Text>)
            }
          </View>
        }
      </View>
    );
  }
//   render() {
//     let { opacity, children, title } = this.props
//     return (
//       <View style={[styles.container, { backgroundColor: `rgba(16,94,174, ${opacity})` }]}>
//         <TouchableOpacity style={styles.item} onPress={() => { alert('返回') }}>
//           <Image style={styles.icon} source={require('../../res/pageImage/mq_redirect_queue_01.png')} />
//         </TouchableOpacity>
//         {

//           <View style={{ alignItems: 'center', flex: 1 }}>
//             {
//               opacity < 0.4 ? null :
//                 (children || <Text style={{ color: '#FFF', fontSize: 17 }}>{title}</Text>)
//             }
//           </View>
//         }
//         <TouchableOpacity style={styles.item} onPress={() => { alert('更多') }}>
//           <Image style={[styles.icon, { width: 25, height: 5 }]} source={require('../../res/pageImage/mq_redirect_queue_01.png')} />
//         </TouchableOpacity>

//       </View>
//     );
//   }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: height,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    paddingHorizontal: 10,
    position: 'absolute',
    zIndex: 10
  },
  icon: {
    width: 21,
    height: 21,
  },
  item: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

NavPage.defaultProps = {
  title: 'title',
  opacity: 0
}
 