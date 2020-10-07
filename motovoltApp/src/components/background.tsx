import React from 'react';
import {View, Text, Button, StyleSheet, Dimensions, Image} from 'react-native';
import {ThemeContext} from '../styles/theme/theme-context';

export default class Background extends React.Component {
  render() {
    let Theme = this.context.theme;
    return (
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: Theme.BACKGROUND, //change dark theme
          position: 'absolute',
        }}>
        <Image
          source={require('../assets/images/yellow_bg.png')}
          style={{
            width: Dimensions.get('window').width,
          }}
          resizeMode={'contain'}
        />
        {/* <View style={{ height: '45%', backgroundColor: '#FFC40F', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ ...styles.triangle, borderBottomColor: Theme.BACKGROUND }}>
                    </View>
                </View > */}
      </View>
    );
  }
}
Background.contextType = ThemeContext; //attach theme context in class as this.context

const styles = StyleSheet.create({
  triangle: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#FFC40F',
    borderLeftWidth: Dimensions.get('window').width,
    borderBottomWidth: 150,
    borderLeftColor: 'transparent',
    borderBottomColor: '#F0F0F0',
  },
});
