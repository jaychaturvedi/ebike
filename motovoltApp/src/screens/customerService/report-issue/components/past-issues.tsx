import React from 'react';
import { View, Text } from 'react-native';
import Moment from 'moment';
import PastIssuesIcon from '../../../../assets/svg/past-service';

export default function PastIssues(props: {
  issueType: string;
  issueDate: string;
  onClick: () => void;
}) {
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Text style={{
        opacity: 0.6,
        fontSize: 16
      }}>
        {props.issueType
        }</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ marginRight: 20, fontSize: 16 }}>
          {Moment(props.issueDate)
            .startOf('day')
            .format('DD MMM YYYY')
            .toString()}
        </Text>
        <PastIssuesIcon onPress={()=>{
          props.onClick()
        }}/>
      </View>
    </View>
  );
}
