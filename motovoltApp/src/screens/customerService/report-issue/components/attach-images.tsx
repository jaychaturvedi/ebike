import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ActiveIssueIcon from '../../../../assets/svg/active-issues';
import AttachedImageIcon from '../../../../assets/svg/attached-images';
import BlueCrossHair from '../../../../assets/svg/blue-cross-hair';
import * as ImagePicker from 'react-native-image-picker';
import Moment from 'moment';


function truncateString(str: string) {
  const n = str.length
  return "img_" + str.substr(n - 8, n);
};

export default function AttachImage(props: {
  photo: ImagePicker.ImagePickerResponse;
  onDelete: () => void;
}) {
  return (
    <View style={{
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
    }}>
      <View style={{
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "row",
        flex: 2
      }}>
        <AttachedImageIcon />
        <Text
          style={{ marginLeft: 24 }}
          numberOfLines={1}>
          {truncateString(props.photo.fileName!)}
          {" "}
          <Text style={{ color: "rgba(0, 0, 0, 0.4)" }}>
            ({Math.floor(props.photo.fileSize! / 41052 * 1000)}kb)
          </Text>
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          props.onDelete()
        }}>
        <BlueCrossHair />
      </TouchableOpacity >
    </View>
  );
}
