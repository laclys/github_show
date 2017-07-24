import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

export default class RepositoryCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite:this.props.projectModel.isFavorite,
      favoriteIcon:this.props.projectModel.isFavorite?
        require('../../res/images/ic_star.png')
        :require('../../res/images/ic_unstar_transparent.png')
    }
  }
  setFavoriteState(flag){
    this.setState({
      isFavorite:flag,
      favoriteIcon:flag?require('../../res/images/ic_star.png')
        :require('../../res/images/ic_unstar_transparent.png')
    })
  }
  componentWillReceiveProps(nextProps){
    this.setFavoriteState(nextProps.projectModel.isFavorite)
  }
  // 收藏✨btn
  onPressFavorite() {
    this.setFavoriteState(!this.state.isFavorite);
    this.props.onFavorite(this.props.projectModel.item,!this.state.isFavorite);
  }
  render() {
    let data = this.props.projectModel.item?this.props.projectModel.item :this.props.projectModel
    let favoriteBtn = <TouchableOpacity
      onPress={()=>this.onPressFavorite()}
    >
      <Image
        style={[{
        width: 22,
        height: 22
        },
        {tintColor:"#2196f3"}
        ]}
        source={this.state.favoriteIcon}
      />
    </TouchableOpacity> 
    return <TouchableOpacity style={styles.container}
      onPress={this.props.onSelect}
    >
      <View style={styles.cell_container}>
        {/*全名*/}
        <Text style={styles.title}>{data.full_name}</Text>
        {/*项目描述*/}
        <Text style={styles.description}>{data.description}</Text>
        {/*底部：作者 ✨数*/}
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
            <Text>Author:</Text>
              <Image
              style={{
              height: 22,
              width: 22
              }}
              source={{
              uri: data.owner.avatar_url
            }}/>  
          </View>
          <View
            style={{
            flexDirection: 'row',
            alignItems: 'center'
            }}>
            <Text>Stars:</Text>
            <Text>{data.stargazers_count}</Text>
          </View>
          {favoriteBtn}
        </View>
      </View>
    </TouchableOpacity>
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
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
  cell_container:{
    backgroundColor:'white',
    padding:10,
    marginLeft:5,
    marginRight:5,
    marginVertical:3,
    borderWidth:0.5,
    borderColor:'#ddd',
    //ios:
    shadowOffset:{
      width:0.5,
      height:0.5
    },
    shadowOpacity:0.4,
    shadowRadius:1,
    // android:
    elevation:2
  }
})