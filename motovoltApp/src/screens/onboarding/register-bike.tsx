import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { scale, verticalScale } from '../../styles/size-matters';
import Colors from '../../styles/colors';
import CTAButton from '../../components/cta-button';
import CTAHeader from './components/header';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RegistartionStackParamList } from '../../navigation/registration';

type RegisterBikeNavigationProp = StackNavigationProp<
  RegistartionStackParamList,
  'ValidateFrame'
>;

type Props = {
  navigation: RegisterBikeNavigationProp;
  route: RouteProp<RegistartionStackParamList, 'ValidateFrame'>;
};

type State = {};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottonContentContainer: {
    height: '70%',
    justifyContent: 'space-evenly',
  },
  msg: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  helpMsg: {
    color: Colors.LINK_BLUE,
    textDecorationLine: 'underline',
    fontSize: 16,
    textAlign: 'center',
  },
  image: {
    marginTop: verticalScale(16),
    marginBottom: verticalScale(16),
    height: verticalScale(200),
    width: scale(300),
  },
});

export default class RegisterBike extends React.PureComponent<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <CTAHeader
          hasBackButton
          title="Register your bike"
          onBackClick={() => {
            this.props.navigation.goBack();
          }}
        />
        <Image
          source={require('../../assets/images/cycle.png')}
          style={styles.image}
        />
        <Text style={styles.msg}>To register your Motovolt cycle, SCAN</Text>
        <Text style={styles.msg}>the QR code on your warranty card.</Text>
        <View style={styles.bottomContainer}>
          <View style={styles.bottonContentContainer}>
            <Text
              style={styles.helpMsg}
              onPress={() => console.log('Help pressed')}>
              Need help with your Frame Number?
            </Text>
            <CTAButton
              onPress={() => this.props.navigation.navigate('Scanner', {})}
              text={'Scan QR Code'}
              textColor={Colors.WHITE}
              backgroundColor={Colors.NAVY_BLUE}
            />
            <CTAButton
              onPress={() =>
                this.props.navigation.navigate('EnterFrameNumber', {})
              }
              text={'Enter Frame Number Manually'}
              textColor={Colors.NAVY_BLUE}
              borderColor={Colors.BORDER_GREY}
            />
          </View>
        </View>
      </View>
    );
  }
}
