import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../../styles/colors';

const cardStyles = StyleSheet.create({
  title: {
    color: Colors.BORDER_GREY,
    fontSize: 14,
  },
  value: {
    color: 'rgba(0, 0, 0, 1)',
    fontSize: 24,
    fontWeight: 'bold',
  },
  unit: {
    fontSize: 16,
  },
});

type CardProps = {
  title: string;
  value: string;
  unit: string;
};

export default function Card(props: CardProps) {
  return (
    <View style={{alignItems: 'flex-start'}}>
      <Text style={cardStyles.title}>{props.title}</Text>
      <Text>
        <Text style={cardStyles.value}>{props.value}</Text>
        <Text style={cardStyles.unit}>{` ${props.unit}`}</Text>
      </Text>
    </View>
  );
}
