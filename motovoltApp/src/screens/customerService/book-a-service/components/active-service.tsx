import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import RequestServiceIcon from '../../../../assets/svg/service_stations';
import Moment from 'moment';

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
      }}>
      <View style={{flexDirection: 'row'}}>
        <RequestServiceIcon style={{marginRight: 16}} stroke={'white'} />
        {/* <ActiveIssueIcon style={{marginRight: 16}} /> */}
        <View>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: '600',
            }}>
            {props.serviceCenterName}
          </Text>
          <Text style={{color: 'white', fontSize: 16}}>{props.slot}</Text>
          <Text style={{color: 'white', fontSize: 14, marginTop: 8}}>
            {Moment(props.createDate).fromNow()}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => props.onCancel()}>
        <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
          Cancel
        </Text>
      </TouchableOpacity>
    </View>
  );
}
