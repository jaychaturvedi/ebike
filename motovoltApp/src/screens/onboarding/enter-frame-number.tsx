import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { scale, verticalScale } from '../../styles/size-matters';
import Colors from '../../styles/colors';
import CTAButton from '../../components/cta-button';
import Input from './components/input';
import CTAHeader from './components/header';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native'
import { OnboardingStackParamList } from '../../navigation/onboarding'

type EnterFrameNumberNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'EnterFrameNumber'
>;

type Props = {
  navigation: EnterFrameNumberNavigationProp,
  route: RouteProp<OnboardingStackParamList, 'EnterFrameNumber'>
};

type State = {
  frameId: string;
};

const styles = StyleSheet.create({
  title: {
    marginVertical: verticalScale(30),
    fontSize: 20,
    color: Colors.BLACK,
    fontWeight: 'bold',
  },
  container: {
    height: '100%',
    alignItems: 'center',
  },
  body: {
    height: '30%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    flexDirection: 'row',
  },
  link: {
    color: Colors.LINK_BLUE,
    textDecorationLine: 'underline',
  },
  button: {
    marginVertical: verticalScale(30),
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default class InputFrameNumber extends React.PureComponent<
  Props,
  State
  > {
  constructor(props: Props) {
    super(props);
    this.state = {
      frameId: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <CTAHeader />
        <View style={styles.body}>
          <Text style={styles.title}>Validate Frame Number</Text>
          <Input
            placeHolder="Enter the Cycle Frame Number"
            onChange={(value: string) => {
              this.setState({
                frameId: value,
              });
            }}
          />
          <Text style={styles.text}>
            <Text>Need help with your Frame Number? </Text>
            <Text style={styles.link} onPress={() => console.log("Help Pressed")}>
              Click here
            </Text>
          </Text>
        </View>
        <View style={styles.button}>
          <CTAButton
            onPress={() => {
              if (this.state.frameId)
                this.props.navigation.navigate("FrameRegistered", {})
            }}
            text={'Verify'}
            textColor={Colors.WHITE}
            backgroundColor={Colors.NAVY_BLUE}
          />
        </View>
      </View>
    );
  }
}
