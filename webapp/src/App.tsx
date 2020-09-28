import React, { PureComponent } from 'react';
import Content from "./component/rnd-home-page"
import Home from './views/home';
import Login from './views/login';
import ForgotPassword from './views/forgotPassword'

interface AppProp { }
interface AppState { }
class App extends PureComponent<AppProp, AppState>{
  render() {
    console.log('App life cycle');

    return <>
      <Home />
      {/* <Login /> */}
      {/* <ForgotPassword /> */}
    </>
  }
}

export default App;
