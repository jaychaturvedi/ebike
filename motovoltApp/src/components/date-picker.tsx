import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'
import { moderateScale } from 'react-native-size-matters'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Moment from 'moment';
import DatePickerBottomIcon from '../assets/svg/date-picker-bottom-arrow';

type State = {
    isVisible: boolean,
}

type Props = {
    date?: Date,
    onDateChange: (date: Date) => void;
    maxDate?: Date,
}

export default class RideDatePicker extends React.PureComponent<Props, State>{
    constructor(props: Props) {
        super(props)
        this.state = { isVisible: false }
    }

    showDatePicker = () => {
        this.setState({ isVisible: true });
    };

    hideDatePicker = () => {
        this.setState({ isVisible: false });
    };

    handleConfirm = (date: Date) => {
        this.setState({isVisible: false}, () => {
            this.props.onDateChange(date);
        })
    };

    render() {
        return (
            <View style={style.container}>
                <View style={style.leftContainer}>
                    <Text>{Moment(this.props.date).format('DD MMM YYYY')}</Text></View>
                <TouchableOpacity
                    style={style.rightContainer}
                    onPress={() => this.setState({ isVisible: !this.state.isVisible })}
                >
                    <DateTimePickerModal
                        isVisible={this.state.isVisible}
                        mode="date"
                        date={this.props.date}
                        onConfirm={this.handleConfirm}
                        onCancel={this.hideDatePicker}
                        maximumDate={this.props.maxDate || new Date()}
                    />
                    <DatePickerBottomIcon />
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
        fontSize: moderateScale(16),
        color:"#838383"
    }
})