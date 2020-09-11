import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../../styles/colors';
import { ThemeContext } from '../../../styles/theme/theme-context';

const cardStyles = StyleSheet.create({
  title: {
    color: Colors.BORDER_GREY,
    fontSize: 14,
    lineHeight: 28,
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
export default class Card extends React.Component<CardProps, {}> {

  render() {
    let props = this.props
    let Theme = this.context.theme; //load theme from context
    return (
      <View style={{ alignItems: 'flex-start' }}>
        <Text style={{
          ...cardStyles.title, color: Theme.BORDER_GREY,
        }}>{props.title}</Text>
        <Text>
          <Text style={{
            ...cardStyles.value, color: Theme.TEXT_WHITE, //change dark theme
          }}>{props.value}</Text>
          <Text style={{
            ...cardStyles.unit, color: Theme.TEXT_WHITE //change dark theme
          }}>{` ${props.unit}`}</Text>
        </Text>
      </View>
    );
  }
}

Card.contextType = ThemeContext