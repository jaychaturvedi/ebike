import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { scale, verticalScale } from '../../styles/size-matters';
import Colors from '../../styles/colors';
import CTAButton from '../../components/cta-button';
import Input from './components/input';
import CTAHeader from './components/header';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native'
import { OnboardingStackParamList } from '../../navigation/onboarding';
import { ValidateFrame } from '../../service/redux/actions/saga/bike-actions';
import { Store_UpdateBike } from '../../service/redux/actions/store';
import { TStore } from '../../service/redux/store';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface ReduxState {
  validateFrame: (params: ValidateFrame) => void,
  bike: TStore['bike'];
};

type EnterFrameNumberNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'EnterFrameNumber'
>;

interface Props extends ReduxState {
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

class InputFrameNumber extends React.PureComponent<
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
    if (this.props.bike.id) {
      this.props.navigation.replace("FrameRegistered", {})
    }
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
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
            disabled={!this.state.frameId}
            onPress={() => {
              if (this.state.frameId)
                this.props.validateFrame({
                  type: "ValidateFrame",
                  payload: {
                    frameNumber: this.state.frameId
                  }
                })
              // this.props.navigation.navigate("FrameRegistered", {})
            }}
            text={'Verify'}
            textColor={Colors.WHITE}
            backgroundColor={Colors.NAVY_BLUE}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}


export default connect(
  (store: TStore) => {
    return {
      bike: store['bike'],
    };
  },
  (dispatch: Dispatch) => {
    return {
      validateFrame: (params: ValidateFrame) => dispatch(params),
    };
  },
)(InputFrameNumber);