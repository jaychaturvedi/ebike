import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'
import { moderateScale } from 'react-native-size-matters'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Moment from 'moment';

type State = {
    isVisible: boolean,
    currentDate: Date
}

type Props = {}

export default class RideDatePicker extends React.PureComponent<Props, State>{
    constructor(props: Props) {
        super(props)
        this.state = { isVisible: false, currentDate: new Date() }
    }

    showDatePicker = () => {
        this.setState({ isVisible: true });
    };

    hideDatePicker = () => {
        this.setState({ isVisible: false });
    };

    handleConfirm = (date: Date) => {
        console.warn("A date has been picked: ", date);
        this.setState({ currentDate: date })
        this.hideDatePicker();
    };

    render() {
        return (
            <View style={style.container}>
                <View style={style.leftContainer}>
                    <Text>{Moment(this.state.currentDate).format('D MMM YYYY')}</Text></View>
                <TouchableOpacity
                    style={style.rightContainer}
                    onPress={() => this.setState({ isVisible: !this.state.isVisible })}
                >
                    <DateTimePickerModal
                        isVisible={this.state.isVisible}
                        mode="date"
                        onConfirm={this.handleConfirm}
                        onCancel={this.hideDatePicker}
                    />
                    <Icon type="FontAwesome" name="chevron-down" style={style.bottomIcon}></Icon>
                </TouchableOpacity>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 20,
        height: '100%',
        flexDirection: 'row'
    },
    leftContainer: {
        width: '70%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    rightContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%'
    },
    bottomIcon: {
        fontSize: moderateScale(20)
    }
})