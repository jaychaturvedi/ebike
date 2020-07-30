import React, { PureComponent } from 'react';

import './index.scss';

import { mapStateToProps, mapDispatchToProps, ReduxUserState, ReduxUserAction } from '../../connectm-client/actions/user';
import { connect } from 'react-redux';

interface UserProp extends ReduxUserState, ReduxUserAction { 
    //remove error
    user :{
        name: string;
        email: string;
    }
}
interface UserState {
    name: string;
    email: string;
    getUserData: boolean;
}
class User extends PureComponent<UserProp, UserState>{
    // constructor(prop: UserProp) {
    //     super(prop);
    //     this.state = {
    //         email: "",
    //         name: "test",
    //         getUserData: true
    //     }
    // }

    // static getDerivedStateFromProps(props: UserProp, state: UserState,) {
    //     console.log("Get user", state)
    //     state = {
    //         ...state,
    //         name: props.user.name ? props.user.name : state.name,
    //         email: props.user.email ? props.user.email : state.email
    //     }

    //     if (state.email == "") {
    //         state.getUserData = true;
    //     } else {
    //         state.getUserData = false;
    //     }

    //     return state;
    // }
    getUser = () => {
        if (this.state.getUserData) {
            this.props.usersAction({
                type: "GET_USER",
                payload: ""
            });
        }
    }
    render() {
        console.log("User lifecycle");
        return <div><button onClick={this.getUser}>click</button> Hello {this.props.user.name}</div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
