import {Icon} from 'native-base';
import React from 'react';
import {View, Image, Text} from 'react-native';

type Props = {
  icon: React.ReactNode;
  textLine1: string;
  textLine2: string;
  statusIcon: React.ReactNode;
};

type State = {};

export default class Tile extends React.PureComponent<Props, State> {
  render() {
    return (
      <View
        style={{
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          paddingVertical: 28,
          borderRadius: 10,
          width: '48%',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{height: 40, width:40}}>{this.props.icon}</View>
          <View style={{marginLeft: 8}}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '400',
              }}
              numberOfLines={1}>
              {this.props.textLine1}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '400',
              }}
              numberOfLines={1}>
              {this.props.textLine2}
            </Text>
          </View>
        </View>
        {this.props.statusIcon}
      </View>
    );
  }
}
