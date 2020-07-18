import React from 'react';
import { StyleSheet, View, Text, ViewStyle, Image, TouchableOpacity } from 'react-native';
import Colors from '../../../styles/colors';
import FontWeight from '../../../styles/font-weight';
import { scale, verticalScale, moderateScale } from '../../../styles/size-matters';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    width: '100%',
    borderRadius: scale(6),
    backgroundColor: Colors.WHITE,
  },
  leftBorder: {
    borderLeftColor: Colors.LINK_BLUE,
    borderLeftWidth: scale(4),
  },
  title: {
    marginBottom: verticalScale(8),
    fontSize: 16,
    fontWeight: FontWeight.BOLD,
    color: Colors.DARK_BLACK,
  },
  singleInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: verticalScale(8),
  },
  key: {
    fontSize: 14,
    fontWeight: FontWeight.SEMI_BOLD,
  },
  value: {
    fontSize: 14,
    fontWeight: FontWeight.REGULAR,
    color: Colors.BLACK,
  },
  addNew: {
    width: 18,
    height: 18,
  },
});

type Props = {
  hasLeftBorder?: boolean;
  hasTitle?: boolean;
  hasHeader?: boolean,
  title?: string;
  data: {
    key: string;
    value: string;
  }[];
  style?: ViewStyle;
};

export default function ProfileInfo(props: Props) {
  return (
    <View
      style={{
        ...styles.container,
        ...(props.hasLeftBorder ? styles.leftBorder : {}),
        ...(props.style || {}),
      }}>

      {
        props.hasTitle && <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text style={styles.title}>{props.title}&nbsp;&nbsp;
          <TouchableOpacity onPress={() => console.log("Pencil pressed")}>
              <Image source={require("../../../assets/icons/pencil-edit-button.png")} />
            </TouchableOpacity>
          </Text>
          <Text style={{
            fontSize: moderateScale(14), color: Colors.LINK_BLUE
          }}> {props.hasHeader ? "Default" : null}
          </Text>
        </View>
      }


      {props.data.map((data) => (
        <View style={styles.singleInfo}>
          <Text style={styles.key}>{data.key}</Text>
          <Text style={styles.value}>{data.value}</Text>
        </View>
      ))}
    </View>
  );
}
