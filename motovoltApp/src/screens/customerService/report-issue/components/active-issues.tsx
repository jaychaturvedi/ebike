import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ActiveIssueIcon from '../../../../assets/svg/active-issues';
import Moment from 'moment';

export default function ActiveIssue(props: {
  categoryName: string;
  issueId: number;
  createDate: string;
  onClick: () => void;
  onCancel?: () => void;
}) {
  return (
    <View
      style={{
        marginVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity
        onPress={() => { props.onClick() }}
        style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* <ActiveIssueIcon style={{marginRight: 16}} stroke={'white'} /> */}
        <ActiveIssueIcon style={{ marginRight: 16, marginTop: 6 }} />
        <View>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            {"IR-" + props.issueId}
          </Text>
          <Text style={{ color: 'white', fontSize: 16 }}>{Moment(props.createDate)
            .format('DD MMM YYYY: h:mm a')
            .toString()}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
