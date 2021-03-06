import React from 'react';
import {View, Text} from 'react-native';
import Moment from 'moment';
import PastServiceIcon from '../../../../assets/svg/past-service';

export default function PastService(props: {
  serviceType: string;
  serviceDate: string;
}) {
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Text style={{opacity: 0.6, fontSize: 16}}>{props.serviceType}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{
          marginRight: 20,
          fontSize:16
        }}>
          {Moment(props.serviceDate)
            .startOf('day')
            .format('DD MMM YYYY')
            .toString()}
        </Text>
        <PastServiceIcon />
      </View>
    </View>
  );
}
