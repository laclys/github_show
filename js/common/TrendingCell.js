import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

export default class TrendingCell extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <TouchableOpacity style={styles.container} onPress={this.props.onSelect}>
      <View style={styles.cell_container}>
        {/*全名*/}
        <Text style={styles.title}>{this.props.data.fullName}</Text>
        {/*项目描述*/}
        <Text style={styles.description}>{this.props.data.description}</Text>
        {/*✨数*/}
        <Text style={styles.description}>{this.props.data.meta}</Text>
        <View
          style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <View
            style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Text style={styles.author}>Build by:</Text>
            {this
              .props
              .data
              .contributors
              .map((result, i, arr) => {
                return <Image
                  style={{
                  height: 22,
                  width: 22
                }}
                  key={i}
                  source={{
                  uri: arr[i]
                }}/>
              })}
          </View>
          <Image
            style={{
            width: 22,
            height: 22
          }}
            source={require('../../res/images/ic_star.png')}/>
        </View>
      </View>
    </TouchableOpacity>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    color: '#212121'
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
    color: '#757575'
  },
  cell_container: {
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 3,
    borderWidth: 0.5,
    borderColor: '#ddd',
    //ios:
    shadowOffset: {
      width: 0.5,
      height: 0.5
    },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    // android:
    elevation: 2
  },
  author:{
    fontSize: 14,
    marginBottom: 2,
    color: '#757575'
  }
})