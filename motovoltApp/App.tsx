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

import SplashScreen from 'react-native-splash-screen';
import {fetchCredentials} from './src/service/secure-storage';

import {TStore} from './src/service/redux/store';
import {signIn, signout} from './src/service/authentication';
import {getUser} from './src/service/redux/saga/user';
import {SignIn} from './src/service/redux/actions/saga';
import {connect} from 'react-redux';
import {
  Store_Init,
  Store_Reset,
  Store_UpdateError,
  Store_UpdateUser,
} from 'src/service/redux/actions/store';
import {StyleSheet, Text, View} from 'react-native';
import {ReadUser} from 'src/service/redux/actions/saga/user';
import Toast from 'react-native-simple-toast';

declare const global: {HermesInternal: null | {}};

const styles = StyleSheet.create({
  defaultFontFamily: {
    fontFamily: 'Roboto',
  },
});

const NewText = Text as any;

const oldRender = (NewText as any).render;
NewText.render = function (...args: any[]) {
  const origin: any = oldRender.call(this, ...args);
  return React.cloneElement(origin, {
    style: [styles.defaultFontFamily, origin.props.style],
  });
};

interface ReduxState {
  user: TStore['user'];
  error: TStore['error'];
  signInUser: (params: SignIn) => void;
  updateUser: (params: Store_UpdateUser) => void;
  getUser: (params: ReadUser) => void;
  initStore: (params: Store_Init) => void;
  resetStore: (params: Store_Reset) => void;
  resetError: (params: Store_UpdateError) => void;
}

interface Props extends ReduxState {}

interface State {}

class App extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('In component did mount');
    this.props.initStore({
      type: 'Store_Init',
      payload: {},
    });
    return fetchCredentials()
      .then(async (cred) => {
        console.log('Cred', cred);
        if (cred) {
          const response = await signIn(cred.username, cred.password);
          console.log(response);
          if (response.success) {
            //Fetch user from backend and update isBikeRegistered , isPhoneValidated
            console.log('Response ', response);
            const user = await getUser();
            if (!user.success) {
              Toast.show('We couldn’t connect to the server. Please retry.');
              return;
            }
            console.log('Initial User : ', user);
            this.props.updateUser({
              type: 'Store_UpdateUser',
              payload: {
                isPhoneValidated:
                  response.user.attributes.phone_number_verified,
                id: user.response.uid,
                email: user.response.email,
                name: user.response.fullName,
                phone: user.response.phone,
                defaultBikeId: user.response.frameId,
                isBikeRegistered: Boolean(user.response.frameId),
                isLoggedIn: true,
              },
            });
          } else {
            await signout();
            this.props.resetStore({
              type: 'Store_Reset',
              payload: {},
            } as Store_Reset);
          }
        } else {
          this.props.resetStore({
            type: 'Store_Reset',
            payload: {},
          } as Store_Reset);
        }
        SplashScreen.hide();
      })
      .catch((err) => {
        console.log(err);
        SplashScreen.hide();
      });
  }

  componentDidCatch() {
    console.log('Catched err');
    this.props.resetStore({
      type: 'Store_Reset',
      payload: {},
    });
  }

  render() {
    console.log('In app', this.props);
    if (this.props.error) {
      Toast.show(this.props.error);
      this.props.resetError({
        type: 'Store_UpdateError',
        payload: {
          error: null,
        },
      });
    }
    if (!this.props.user.isLoggedIn) return <Onboarding />;
    if (this.props.user.isBikeRegistered) return <FooterNavigation />;
    return <Registration />;
  }
}

export default connect(
  (store: TStore) => {
    return {
      user: store['user'],
      error: store['error'],
    };
  },
  (dispatch) => {
    return {
      updateUser: (params: Store_UpdateUser) => dispatch(params),
      signInUser: (params: SignIn) => dispatch(params),
      getUser: (params: ReadUser) => dispatch(params),
      initStore: (params: Store_Init) => dispatch(params),
      resetStore: (params: Store_Reset) => dispatch(params),
      resetError: (params: Store_UpdateError) => dispatch(params),
    };
  },
)(App);
