import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {Header, Left, Right} from 'native-base';
import Colors from '../../../styles/colors';
import {scale} from '../../../styles/size-matters';

type Props = {
  title?: string;
  right?: React.ReactNode;
  hasBackButton?: boolean;
  onBackClick?: () => void;
};

type State = {};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.NAVY_BLUE,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  backButton: {
    width: scale(18),
    height: scale(18),
  },
});

export default class RegisterBike extends React.PureComponent<Props, State> {
  render() {
    return (
      <Header transparent>
        <View style={styles.container}>
          <View>
            {this.props.hasBackButton && (
              <TouchableOpacity onPress={this.props.onBackClick}>
                <Image
                  source={require('../../../assets/icons/back.png')}
                  style={styles.backButton}
                />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.title}>{this.props.title}</Text>
          <View>{this.props.right}</View>
        </View>
      </Header>
    );
  }
}
