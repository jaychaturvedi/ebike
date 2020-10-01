import React, { PureComponent } from 'react';
import Content from "./component/rnd-home-page"
import Home from './views/home';
import Login from './views/login';
import ForgotPassword from './views/forgotPassword'
import { Authenticator } from "aws-amplify-react";
import { getUser, signIn } from "./connectm-client/authentication"
import { Route, Switch, Redirect } from "react-router-dom";
import { withRouter, RouteComponentProps } from "react-router";

const MainRoutes = {
  HOME: "/",
  LOGIN: "/login",
  RESETPASSWORD: "/reset-password"
};

const RestrictedRoute = (props: {
  authenticated: boolean | null;
  path: string;
  component: any;
}) => {
  console.log("restricted routes", props)
  // When the user has logged in and still visiting login page.
  if (props.path === MainRoutes.LOGIN && props.authenticated) {
    return <Redirect to={MainRoutes.HOME} />;
  }

  // When the user is not logged in.
  if (props.path === MainRoutes.LOGIN && props.authenticated === false) {
    return <Route path={MainRoutes.LOGIN} component={props.component} />;
  }
  if (props.path !== MainRoutes.LOGIN && props.authenticated)
    return <Route path={props.path} component={props.component} />;

  return null;
};

interface AppProp extends RouteComponentProps { }
interface AppState {
  authenticated: boolean | null
  user: any
}
class App extends PureComponent<AppProp, AppState>{
  constructor(props: AppProp) {
    super(props)
    this.state = {
      authenticated: null,
      user: {}
    }
  }

  signedIn = (user: any) => {
    this.setState({
      authenticated: true,
      user: user
    })
    this.props.history.push("/");
  }

  componentDidMount() {
    if (this.props.history.location.pathname != MainRoutes.RESETPASSWORD)
      getUser()
        .then(userObject => {
          console.log(userObject)
          if (userObject.success) {
            this.setState({
              user: userObject.user,
              authenticated: true,
            })
            this.props.history.push("/");
          } else {
            this.setState({
              authenticated: false
            });
            this.props.history.push("/login");
          }
          console.log("move to login screen")
        })
  }

  render() {
    console.log('App life cycle');
    return this.props.history.location.pathname === MainRoutes.RESETPASSWORD ?
      <ForgotPassword /> :
      <Switch>
        <RestrictedRoute
          authenticated={this.state.authenticated}
          path={MainRoutes.LOGIN}
          component={Login}
        />
        <RestrictedRoute
          authenticated={this.state.authenticated}
          path={MainRoutes.HOME}
          component={Home}
        />
      </Switch>
  }
}

export default withRouter(App);
