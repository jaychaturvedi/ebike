/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import Onboarding from './src/navigation/onboarding';
import FooterNavigation from './src/navigation/footer';
import Registration from './src/navigation/registration';

import { StyleSheet } from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import { fetchCredentials } from './src/service/secure-storage';

import { TStore } from './src/service/redux/store';
import { signIn } from './src/service/authentication';
import { getUser } from './src/service/redux/saga/user';
import { SignIn } from './src/service/redux/actions/saga';
import { connect } from 'react-redux';
import { Store_UpdateUser } from 'src/service/redux/actions/store';
import { ReadUser } from 'src/service/redux/actions/saga/user';

declare const global: { HermesInternal: null | {} };

const styles = StyleSheet.create({});

interface ReduxState {
  user: TStore['user'];
  signInUser: (params: SignIn) => void;
  updateUser: (params: Store_UpdateUser) => void;
  getUser: (params: ReadUser) => void;
}

interface Props extends ReduxState { }

class App extends React.PureComponent<Props, {}> {
  componentDidMount() {
    console.log("In component did mount")
    fetchCredentials().then(async (cred) => {
      if (cred) {
        const response = await signIn(cred.username, cred.password);
        if (response.success) {
          //Fetch user from backend and update isBikeRegistered , isPhoneValidated 
          console.log("Response ", response);
          const user = await getUser();
          console.log("Initial User : ", user);
          this.props.updateUser({
            type: 'Store_UpdateUser',
            payload: {
              isLoggedIn: true,
              isPhoneValidated: response.user.attributes.phone_number_verified,
              id: user.uid,
              email: user.email,
              name: user.fullName,
              phone: user.phone,
              defaultBikeId: user.frameId,
              isBikeRegistered: Boolean(user.frameId),
            },
          });
        }
      } else {
        this.props.updateUser({
          type: 'Store_UpdateUser',
          payload: {
            isLoggedIn: false,
          },
        });
      }
      SplashScreen.hide();
    });
  }

  componentDidCatch() {
    console.log('Catched err');
  }

  render() {
    return this.props.user.isBikeRegistered === false ? <Registration /> :
      this.props.user.isLoggedIn ? <FooterNavigation /> : <Onboarding />;
    // return <FooterNavigation />
  }
}

export default connect(
  (store: TStore) => {
    return {
      user: store['user'],
    };
  },
  (dispatch) => {
    return {
      updateUser: (params: Store_UpdateUser) => dispatch(params),
      signInUser: (params: SignIn) => dispatch(params),
      getUser: (params: ReadUser) => dispatch(params)
    };
  },
)(App);
