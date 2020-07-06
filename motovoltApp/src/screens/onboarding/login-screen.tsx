import React from 'react';
import {scale, verticalScale} from '../../styles/size-matters';
import {View, StyleSheet, Text} from 'react-native';
import Colors from '../../styles/colors';
import Input from './components/input';
import CTAHeader from './components/header';
import NextButton from './components/next-page-button';

type Props = {
  onBackClick?: () => void;
  onLogin?: (userName: string, password: string) => void;
  onForgotPassword?: () => void;
};

type State = {
  userName: string;
  password: string;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    marginBottom: 10,
    color: Colors.BLACK,
    fontWeight: 'bold',
  },
  bottom: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-end',
    paddingHorizontal: scale(32),
    marginBottom: verticalScale(32),
    justifyContent: 'flex-end',
  },
});

const InputMarginVeritical = 6;

export default class Login extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
    };
  }

  render() {
    return (
      <View
        style={{
          display: 'flex',
          height: '100%',
          alignItems: 'center',
        }}>
        <CTAHeader hasBackButton onBackClick={this.props.onBackClick} />
        <Text style={styles.title}>Log In</Text>
        <Input
          placeHolder="Email or Mobile No."
          marginVeritical={verticalScale(InputMarginVeritical)}
          onChange={(value: string) => {
            this.setState({userName: value});
          }}
        />
        <Input
          onChange={(value: string) => {
            this.setState({password: value});
          }}
          placeHolder="Password"
          secure
          marginVeritical={verticalScale(InputMarginVeritical)}
        />
        <Text
          onPress={this.props.onForgotPassword}
          style={{
            marginVertical: verticalScale(InputMarginVeritical),
            color: Colors.HYPERLINK_BLUE,
          }}>
          Forgot Password?
        </Text>
        <View style={styles.bottom}>
          <NextButton
            mode="Active"
            onPress={() => {
              if (this.props.onLogin)
                this.props.onLogin(this.state.userName, this.state.password);
            }}
          />
        </View>
      </View>
    );
  }
}
