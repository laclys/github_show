import React, {Component} from 'react';
import {View, Text, StyleSheet,TouchableOpacity,Image} from 'react-native';
import NavigationBar from './NavigationBar'

export default class Girl extends Component {
  renderButton(image){
    return <TouchableOpacity
              onPress={()=>{
                this.props.navigator.pop();
              }}
              >
              <Image style={{width:22,height:22,margin:5}} source={image}></Image>
            </TouchableOpacity>
  }
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'Girl'}
          style={{
            backgroundColor:'orange'
          }}
          leftButton={
            this.renderButton(require('./res/images/ic_arrow_back_white_36pt.png'))
          }
          rightButton={
            this.renderButton(require('./res/images/ic_star.png'))
          }
        />
        <Text style={styles.text}>I am girl</Text>
        <Text style={styles.text}>我收到了男孩送的{this.props.word}</Text>
        <Text style={styles.text}
          onPress={()=>{
            this.props.onCallBack('一个巧克力')
            this.props.navigator.pop()
          }}
        >回赠~</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20
  }
})