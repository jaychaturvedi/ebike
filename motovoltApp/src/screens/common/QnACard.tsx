import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../styles/colors';
import FontWeight from '../../styles/font-weight';
import { scale } from '../../styles/size-matters';
import { verticalScale } from 'react-native-size-matters';

type Props = {
  title: string;
  description: string;
};

type State = {
  expanded: boolean;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    borderRadius: scale(8),
    padding: scale(16),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    color: Colors.BLACK,
    fontWeight: FontWeight.SEMI_BOLD,
  },
  button: {
    backgroundColor: Colors.BG_GREY,
    width: scale(24),
    height: scale(24),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(12),
  },
  image: {
    width: scale(12),
    height: scale(12),
  },
  body: {
    lineHeight: verticalScale(16),
    marginTop: verticalScale(12),
    fontSize: 12,
    color: Colors.BLACK,
    fontWeight: FontWeight.REGULAR,
  },
});

export default class Card extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{this.props.title}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({ expanded: !this.state.expanded });
            }}>
            <Image
              source={
                this.state.expanded
                  ? require('../../assets/icons/minus.png')
                  : require('../../assets/icons/plus.png')
              }
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
        {this.state.expanded && (
          <Text style={styles.body}>{this.props.description}</Text>
        )}
      </View>
    );
  }
}