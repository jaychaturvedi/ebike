import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import RequestServiceIcon from '../../../../assets/svg/active-service';
import Moment from 'moment';
import { Button } from 'native-base';

export default function ActiveIssue(props: {
  serviceCenterName: string;
  slot: string;
  createDate: string;
  onCancel: () => void;
}) {
  return (
    <View
      style={{
        marginVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
      }}>
      <View style={{
        flexDirection: 'row',
        display: "flex",
        alignItems: "center"
      }}>
        <RequestServiceIcon style={{ marginRight: 16 }} stroke={'white'} />
        <View>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
            {Moment(props.slot)
              .subtract(1, 'h')
              .format('DD MMM YYYY, h a')
              .toString()}
            {"-"}
            {Moment(props.slot)
              .format('h a')
              .toString()}
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: '600',
            }}>
            {props.serviceCenterName}
          </Text>
          <Text style={{ color: 'white', fontSize: 12, marginTop: 8 }}>
            {Moment(props.createDate).fromNow()}
          </Text>
        </View>
      </View>
      <View>
        <Button onPress={() => props.onCancel()}
          style={{
            backgroundColor: "white",
            paddingHorizontal: 20,
            borderRadius: 4,
            height: 38
          }}>
          <Text style={{ color: '#5372FF', fontSize: 12, fontWeight: '600' }}>
            Cancel
          </Text>
        </Button>
      </View>
    </View>
  );
}
