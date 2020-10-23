import React from 'react';
import { View, Image, StyleSheet, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { scale, verticalScale } from '../../styles/size-matters';
import Colors from '../../styles/colors';
import CTAButton from '../../components/cta-button';
import CTAHeader from './components/header';
import Input from './components/input';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RegistartionStackParamList } from '../../navigation/registration';
import { TStore } from '../../service/redux/store';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { UpdateBike } from 'src/service/redux/actions/saga';

type FrameRegisteredNavigationProp = StackNavigationProp<
  RegistartionStackParamList,
  'FrameRegistered'
>;

interface ReduxProps {
  bike: TStore['bike'],
  updateBike: (params: UpdateBike) => void
}

interface Props extends ReduxProps {
  navigation: FrameRegisteredNavigationProp;
  route: RouteProp<RegistartionStackParamList, 'FrameRegistered'>;
};

type State = {
  name: string
};

const inputStyles = StyleSheet.create({
  container: {},
  helperText: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginVertical: scale(8),
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  optional: {
    fontSize: 14,
    alignSelf: 'flex-end',
    marginVertical: scale(8),
    color: Colors.BORDER_GREY,
  },
});

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  bottomContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: verticalScale(40),
  },
  msg: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  logo: {
    marginTop: verticalScale(16),
    resizeMode: 'contain',
  },
  image: {
    marginBottom: verticalScale(16),
    height: verticalScale(200),
    width: '100%',
  },
});

class RegisterBike extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: ''
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        style={styles.container}>
        <CTAHeader
          hasBackButton
          title="Bike Registered Successfully"
          onBackClick={() => this.props.navigation.goBack()}
        />
        <Image
          source={require('../../assets/images/motovolt_logo_medium.png')}
          style={styles.logo}
        />
        <Image
          source={require('../../assets/images/cycle_with_headlight.png')}
          style={styles.image}
        />
        <Text style={styles.msg}>Welcome to the MotoVolt family!</Text>
        <Text style={styles.msg}>Happy e-cycling to you…</Text>
        <View style={styles.bottomContainer}>
          <View style={inputStyles.container}>
            <Text style={inputStyles.helperText}>
              Nickname you bike
            </Text>
            <Input placeHolder={'This name will be displayed on the screen'}
              onChange={(name: string) => this.setState({ name })}
            />
            <Text style={inputStyles.optional}>(Optional)</Text>
          </View>
          <CTAButton
            text={'Continue'}
            textColor={Colors.WHITE}
            backgroundColor={Colors.NAVY_BLUE}
            onPress={() => {
              this.props.updateBike({
                type: 'UpdateBike',
                payload: {
                  id: this.props.bike.id,
                  name: this.state.name
                }
              })
              this.props.navigation.navigate('PersonalDetails', {})
            }
            }
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
      updateBike: (params: UpdateBike) => dispatch(params)
    };
  },
)(RegisterBike);