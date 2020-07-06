import React from 'react';
import {View, StyleSheet, Text, TextInput, Image} from 'react-native';
import {scale, verticalScale} from '../../styles/size-matters';
import Colors from '../../styles/colors';
import CTAButton from '../../components/cta-button';
import CTAHeader from './components/header';
import Input from './components/input';

type Props = {
  onContinue?: (password: string) => void;
};

type State = {
  isValid: boolean;
  password: string;
  confirmPassword: string;
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    paddingHorizontal: scale(64),
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    color: Colors.BLACK,
    fontWeight: 'bold',
  },
  bottom: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    marginBottom: verticalScale(32),
    justifyContent: 'flex-end',
  },
  warningContainer: {
    paddingBottom: verticalScale(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  warningLogo: {
    width: scale(18),
    height: scale(18),
  },
  warningText: {
    fontSize: 12,
  },
});

const InputMarginVeritical = 6;

export default class NewPassword extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      confirmPassword: '',
      password: '',
      isValid: false,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <CTAHeader />
        <Text style={styles.title}>Create New Password</Text>
        <View style={{marginVertical: verticalScale(100)}}>
          <Input
            placeHolder="Enter New Password"
            marginVeritical={verticalScale(InputMarginVeritical)}
            secure
            onChange={(value: string) => {
              let isValid = false;
              if (value.length >= 8) isValid = true;
              this.setState({password: value, isValid});
            }}
          />
          {!this.state.isValid && (
            <View style={styles.warningContainer}>
              <Image
                style={styles.warningLogo}
                source={require('../../assets/icons/error_outline-grey.png')}
              />
              <Text style={styles.warningText}>
                Password must be alphanumeric with min 8 characters, 1 upper
                case and a special character.
              </Text>
            </View>
          )}
          <Input
            placeHolder="Re-enter Password"
            marginVeritical={verticalScale(InputMarginVeritical)}
            onChange={(value: string) => {
              this.setState({confirmPassword: value});
            }}
            secure
          />
          {this.state.confirmPassword !== this.state.password && (
            <View style={styles.warningContainer}>
              <Image
                style={styles.warningLogo}
                source={require('../../assets/icons/error_outline-red.png')}
              />
              <Text style={{...styles.warningText, color: Colors.ERROR_RED}}>
                Password Mismatch
              </Text>
            </View>
          )}
        </View>
        <View style={styles.bottom}>
          <CTAButton
            text={'Save & Continue'}
            textColor={Colors.WHITE}
            backgroundColor={Colors.NAVY_BLUE}
            onPress={() => {
              if (
                this.props.onContinue &&
                this.state.isValid &&
                this.state.confirmPassword == this.state.password
              ) {
                this.props.onContinue(this.state.password);
              }
            }}
          />
        </View>
      </View>
    );
  }
}
