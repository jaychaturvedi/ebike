import React, { PureComponent } from 'react';
import Content from "./component/rnd-home-page"
import Home from './views/home';
interface AppProp { }
interface AppState { }
class App extends PureComponent<AppProp, AppState>{
  render() {
    console.log('App life cycle');

    return <>
      <Home />
    </>
  }
}

export default App;
