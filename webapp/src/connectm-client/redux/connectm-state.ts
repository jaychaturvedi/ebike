export interface State {
    user: {
        name: string,
        email: string
    }
}

const connectmState: State = {
    user: {
        name: "",
        email: ""
    }
}

export default connectmState;