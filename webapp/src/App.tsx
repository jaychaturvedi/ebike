import "./index.scss"
import React, { PureComponent } from 'react';
import Login from './views/login';
import ForgotPassword from './views/forgotPassword'
import { getUser, signIn } from "./connectm-client/authentication"
import { Route, Switch, Redirect } from "react-router-dom";
import { withRouter, RouteComponentProps } from "react-router";
import { RoleBasedMainRoutes } from "./connectm-client/roles/role-access"
import { connect } from 'react-redux'
import { ReduxUserAction, ReduxUserState, mapDispatchToProps, mapStateToProps } from "./connectm-client/actions/user"
import Content from "./component/rnd-home-page"
import Home from './views/home';
const MainRoutes = {
  HOME: "/",
  LOGIN: "/login",
  RESETPASSWORD: "/reset-password"
};

const RestrictedRoute = (props: {
  authenticated: boolean | null;
  path: string;
  component: any;
  role: string
}) => {
  console.log("restricted routes", props)
  // When the user has logged in and still visiting login page.
  if (props.path === MainRoutes.LOGIN && props.authenticated) {
    return <Redirect to={RoleBasedMainRoutes(props.role)} />;
  }
  // When the user is not logged in.
  if (props.path === MainRoutes.LOGIN && props.authenticated === false) {
    return <Route path={MainRoutes.LOGIN} component={props.component} />;
  }
  if (props.path !== MainRoutes.LOGIN && props.authenticated)
    return <Route path={props.path} component={props.component} />;
  return null
};

interface AppProp extends RouteComponentProps, ReduxUserAction, ReduxUserState { }
interface AppState {
  authenticated: boolean | null
  user: any
  userRole: string
}
class App extends PureComponent<AppProp, AppState>{
  constructor(props: AppProp) {
    super(props)
    this.state = {
      authenticated: null,
      user: {},
      userRole: ''
    }
  }

  componentDidMount() {
    getUser()
      .then(userObject => {
        console.log(userObject)
        if (userObject.success) {
          this.props.usersAction({
            type: "UPDATE_USER",
            payload: {
              authenticated: true,
              user: userObject.user
            }
          })
        } else {
          this.setState({
            authenticated: false
          })
          if (this.props.history.location.pathname != MainRoutes.RESETPASSWORD)
            this.props.history.push("/login");
        }
        console.log("move to login screen")
      })
  }
  static getDerivedStateFromProps(props: AppProp, state: AppState) {
    console.log("derived state", props.user)
    if (props.user?.user) {
      state.authenticated = props.user.authenticated
      state.user = props.user.user
      state.userRole = props.user.user.attributes['custom:role']
    }
    return state
  }
  render() {
    console.log('App life cycle', this.state);
    return this.props.history.location.pathname === MainRoutes.RESETPASSWORD && !this.state.authenticated ?
      <ForgotPassword /> :
      <Switch>
        <RestrictedRoute
          authenticated={this.state.authenticated}
          path={MainRoutes.LOGIN}
          role={this.state.userRole}
          component={Login}
        />
        <RestrictedRoute
          authenticated={this.state.authenticated}
          path={MainRoutes.HOME}
          role={this.state.userRole}
          component={Home}
        />
      </Switch>
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));