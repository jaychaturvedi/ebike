import React from 'react'
import { StyleSheet } from 'react-native'
import CheckBox from 'react-native-check-box'
import { moderateScale } from 'react-native-size-matters'
import { ThemeContext } from '../styles/theme/theme-context';

type Props = {
    option1: string,
    option2: string,
    option3: string,
    option4: string,
    returnValue: (option: string) => void
}
type State = {
    option1: boolean,
    option2: boolean,
    option3: boolean,
    option4: boolean,
}

export default class Select extends React.PureComponent<Props, State>{
    constructor(props: Props) {
        super(props)
        this.state = {
            option1: false,
            option2: false,
            option3: false,
            option4: false,
        }
    }

    render() {
        let Theme = this.context.theme; //load theme 
        return (
            <>
                <CheckBox
                    style={styles.checkbox}
                    onClick={() => {
                        this.setState({
                            option1: !this.state.option1,
                            option2: false,
                            option3: false,
                            option4: false
                        })
                        this.props.returnValue(this.props.option1)
                    }}
                    isChecked={this.state.option1}
                    rightText={this.props.option1}
                    rightTextStyle={{ color: Theme.TEXT_WHITE }}
                    checkBoxColor={Theme.TEXT_WHITE}

                />
                <CheckBox
                    style={styles.checkbox}
                    onClick={() => {
                        this.setState({
                            option2: !this.state.option2,
                            option1: false,
                            option3: false,
                            option4: false
                        })
                        this.props.returnValue(this.props.option2)
                    }}
                    isChecked={this.state.option2}
                    rightText={this.props.option2}
                    rightTextStyle={{ color: Theme.TEXT_WHITE }}
                    checkBoxColor={Theme.TEXT_WHITE}
                />
                <CheckBox
                    style={styles.checkbox}
                    onClick={() => {
                        this.setState({
                            option3: !this.state.option3,
                            option2: false,
                            option1: false,
                            option4: false
                        })
                        this.props.returnValue(this.props.option3)
                    }}
                    isChecked={this.state.option3}
                    rightText={this.props.option3}
                    rightTextStyle={{ color: Theme.TEXT_WHITE }}
                    checkBoxColor={Theme.TEXT_WHITE}
                />
                <CheckBox
                    style={styles.checkbox}
                    onClick={() => {
                        this.setState({
                            option4: !this.state.option4,
                            option2: false,
                            option3: false,
                            option1: false
                        })
                        this.props.returnValue(this.props.option4)
                    }}
                    isChecked={this.state.option4}
                    rightText={this.props.option4}
                    rightTextStyle={{ color: Theme.TEXT_WHITE }}
                    checkBoxColor={Theme.TEXT_WHITE}
                />
            </>
        )
    }
}

Select.contextType = ThemeContext

const styles = StyleSheet.create({
    checkbox: {
        paddingBottom: moderateScale(10),
    }
})