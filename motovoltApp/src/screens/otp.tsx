import React from 'react'
import { StyleSheet, View } from 'react-native'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { Text } from 'native-base'
import { scale, moderateScale } from 'react-native-size-matters'


type Props = {}
type State = {}

export default class OTPInput extends React.PureComponent<Props, State>{
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>
                        OTP Authentication
                    </Text>
                </View>
                <View style={styles.description}>
                    <Text style={styles.helpText}>Please enter the 4-digit OTP (One Time Password) </Text>
                    <Text style={styles.helpText}>sent to your registered mobile no</Text>
                </View>
                <View style={styles.otp}>
                    <OTPInputView
                        style={{ width: '100%' }}
                        pinCount={4}
                        // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                        // onCodeChanged = {code => { this.setState({code})}}
                        autoFocusOnLoad
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        onCodeFilled={(code => {
                            console.log(`Code is ${code}, you are good to go!`)
                        })}
                    /></View>
                <View style={styles.footer}>
                    <Text style={{ textAlign: 'center' }}>
                        <Text style={styles.footerText}>Haven't received the 4-digit OTP? </Text>
                        <Text style={styles.resendOTP}
                            onPress={() => console.log("Resend OTP")}
                        >Resend OTP</Text>
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: moderateScale(20),
        flex: 1,
        justifyContent: 'center'
    },
    header: {
        height: '20%',
        paddingTop: moderateScale(40)
    },
    headerText: {
        color: 'black',
        fontSize: scale(20),
        textAlign: 'center',
        fontWeight: 'bold'
    },
    description: {
        height: '10%'
    },
    helpText: {
        fontSize: scale(12),
        fontWeight: 'normal',
        textAlign: 'center'
    },
    otp: {
        height: "20%",
        padding: moderateScale(40)
    },
    footer: {
        height: "50%"
    },
    footerText: {
        fontSize: scale(12),
        textAlign: 'center'
    },
    resendOTP: {
        fontSize: scale(12),
        color: '#0889F7'
    },
    borderStyleHighLighted: {
        borderColor: "black",
    },
    underlineStyleBase: {
        width: scale(40),
        // height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
        color: 'black',
        borderColor: 'black'
    },
    underlineStyleHighLighted: {
        borderColor: "black",
        color: 'black'
    },
});