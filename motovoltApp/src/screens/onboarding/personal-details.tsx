import React from 'react';
import {View, StyleSheet, Text, TextInput, Image} from 'react-native';
import {scale, verticalScale} from '../../styles/size-matters';
import Colors from '../../styles/colors';
import CTAButton from '../../components/cta-button';
import CTAHeader from './components/header';
import Input from './components/input';

type Props = {
  onBackClick?: () => void;
  onSubmit?: (name: string, email: string, password: string) => void;
};

type State = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
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
    alignItems: 'center',
    marginBottom: verticalScale(40),
    justifyContent: 'flex-end',
  },
  image: {
    marginBottom: verticalScale(16),
    height: verticalScale(200),
    width: '100%',
    opacity: 0.5,
  },
});

const InputMarginVeritical = 6;

export default class PersonalDetails extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      confirmPassword: '',
      email: '',
      name: '',
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
        <Text style={styles.title}>Please enter your details</Text>
        <Input
          placeHolder="Full Name*"
          marginVeritical={verticalScale(InputMarginVeritical)}
        />
        <Input
          placeHolder="Email*"
          marginVeritical={verticalScale(InputMarginVeritical)}
        />
        <Input
          placeHolder="Create a password*"
          marginVeritical={verticalScale(InputMarginVeritical)}
          secure
        />
        <Input
          placeHolder="Re-enter your password*"
          marginVeritical={verticalScale(InputMarginVeritical)}
          secure
        />
        <View style={styles.bottom}>
          <Image
            source={require('../../assets/images/cycle_with_headlight.png')}
            style={styles.image}
          />
          <CTAButton
            onPress={() => {
              if (this.props.onSubmit)
                this.props.onSubmit(
                  this.state.name,
                  this.state.email,
                  this.state.password,
                );
            }}
            text={'Create my account'}
            textColor={Colors.WHITE}
            backgroundColor={Colors.NAVY_BLUE}
          />
        </View>
      </View>
    );
  }
}
