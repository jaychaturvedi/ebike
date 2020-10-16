import React from 'react';
import {StyleSheet, View} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {Text} from 'native-base';
import {scale, moderateScale} from 'react-native-size-matters';
import ThumbsUp from '../../components/thumb-up';
import CTAButton from '../../components/cta-button';
import Colors from '../../styles/colors';

interface Props {
  onFilled: (code: string) => void;
  onResend: () => void;
  success: boolean;
  errored: boolean;
  successMessage: string;
}

type State = {
  code: string;
  ref: any;
};

export default class OTPInput extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      code: '',
      ref: React.createRef(),
    };
  }

  render() {
    if (this.state.code.length === 6 && this.props.errored) {
      this.setState({code: ''});
    }
    return this.props.success ? (
      <ThumbsUp msg={this.props.successMessage} />
    ) : (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>OTP Authentication</Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.helpText}>
            Please enter the 6-digit OTP (One Time Password){' '}
          </Text>
          <Text style={styles.helpText}>sent to your registered mobile no</Text>
        </View>
        <View style={styles.otp}>
          <OTPInputView
            style={{width: '100%'}}
            pinCount={6}
            code={this.state.code}
            onCodeChanged={(code) => {
              this.setState({code});
              // if (code.length === 6) {
              //   this.props.onFilled(code);
              // }
            }}
            ref={this.state.ref}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
          />
        </View>
        <View style={styles.footer}>
          <View
            style={{
              width: '100%',
              // flex: 1,
              marginBottom: moderateScale(20),
              flexDirection: 'row',
            }}>
            <View style={{width: '50%', paddingHorizontal: 10}}>
              <CTAButton
                fullWidth
                text="CLEAR"
                onPress={() => {
                  this.setState({code: ''});
                  // this.state.ref.current.clear();
                }}
                textColor={Colors.WHITE}
                backgroundColor={Colors.NAVY_BLUE}
              />
            </View>
            <View style={{width: '50%', paddingHorizontal: 10}}>
              <CTAButton
                fullWidth
                text="SUBMIT"
                textColor={Colors.WHITE}
                onPress={() => this.props.onFilled(this.state.code)}
                backgroundColor={Colors.NAVY_BLUE}
              />
            </View>
          </View>
          <Text style={{textAlign: 'center'}}>
            <Text
              style={styles.resendOTP}
              onPress={() => {
                this.props.onResend();
              }}>
              Resend OTP
            </Text>
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: moderateScale(20),
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    height: '20%',
    paddingTop: moderateScale(40),
  },
  headerText: {
    color: 'black',
    fontSize: scale(20),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  description: {
    height: '10%',
  },
  helpText: {
    fontSize: scale(12),
    fontWeight: 'normal',
    textAlign: 'center',
  },
  otp: {
    height: '20%',
    padding: moderateScale(40),
  },
  footer: {
    height: '50%',
  },
  footerText: {
    fontSize: scale(12),
    textAlign: 'center',
  },
  resendOTP: {
    fontSize: scale(12),
    color: '#0889F7',
  },
  borderStyleHighLighted: {
    borderColor: 'black',
  },
  underlineStyleBase: {
    width: scale(30),
    // height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: 'black',
    borderColor: 'black',
  },
  underlineStyleHighLighted: {
    borderColor: 'black',
    color: 'black',
  },
});
