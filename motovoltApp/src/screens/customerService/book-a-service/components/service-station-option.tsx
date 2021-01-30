import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {Icon} from 'native-base';

const styles = StyleSheet.create({
  address: {
    fontSize: 18,
    fontWeight: '500',
    flexDirection: 'column',
    display: 'flex',
  },
  icons: {
    flex: 1,
    alignItems: 'flex-end',
    // justifyContent: "center",
    marginTop: 5,
  },
});

export default function ServiceStationAction(props: {
  address: string;
  status: string;
  stationName: string;
  distance: number;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <TouchableOpacity
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        marginVertical: 10,
      }}
      onPress={() => {
        props.onClick();
      }}>
      <View
        style={{
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          marginTop: 5,
          marginRight: 12,
        }}>
        <Image
          source={require('../../../../assets/icons/service_location_pin.png')}
        />
      </View>
      <View
        style={{
          flex: 3,
          display: 'flex',
        }}>
        <View
          style={{
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              ...styles.address,
              color: 'black',
              fontSize: 16,
            }}
            numberOfLines={1}>
            {props.stationName}
          </Text>
          <Text
            style={{color: 'grey', fontSize: 14, marginTop: 5}}
            numberOfLines={1}>
            {`${props.distance} km. ${props.status}`}
          </Text>
          <Text
            style={{color: 'black', fontSize: 14, marginTop: 6}}
            numberOfLines={1}>
            {props.address}
          </Text>
        </View>
      </View>
      <View style={styles.icons}>
        <Icon
          type="FontAwesome"
          name="check-circle"
          style={{
            fontSize: 40,
            color: props.selected ? '#40A81B' : 'rgba(0, 0, 0, 0.1)',
          }}
        />
      </View>
    </TouchableOpacity>
  );
}
