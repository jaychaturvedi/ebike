import React from 'react'
import { KeyboardAvoidingView, View, StyleSheet, Text, Platform } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'
import { Input, Content, Item } from 'native-base'
import Button from '../../components/cta-button'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native'
import { OnboardingStackParamList } from '../../navigation/onboarding'

type ValidateMobileNavigationProp = StackNavigationProp<
    OnboardingStackParamList,
    'ValidateMobile'
>;

type Props = {
    navigation: ValidateMobileNavigationProp,
    route: RouteProp<OnboardingStackParamList, 'ValidateMobile'>
};

type State = {
    mobile: string
}

export default class ValidateMobile extends React.PureComponent<Props, State>{
    constructor(props: Props) {
        super(props)
        this.state = {
            mobile: ''
        }
    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.container}
                behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
                <View style={styles.header}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: scale(20) }}>
                        Validate Your Mobile Number</Text>
                </View>
                <View style={styles.input}>
                    <Item regular style={{ borderRadius: 10 }}>
                        <Input
                            placeholder="Enter your registered mobile No."
                            onChangeText={(text: string) => this.setState({ mobile: text })}
                        />
                    </Item>
                </View>
                <View style={styles.helpText}>
                    <Text style={{ fontSize: moderateScale(14, 0.1), textAlign: 'center' }}>
                        <Text>By Signing up with Motovolt, you accept our </Text>
                        <Text style={{ color: '#0934F2' }}
                            onPress={() => {
                                console.log('T & C Pressed');
                            }}
                        >T & C</Text>
                    </Text>
                </View>
                <View style={styles.verifyBtn}>
                    <Button
                        text="Verify"
                        textColor="white"
                        backgroundColor="#142F6A"
                        onPress={() => this.props.navigation.navigate('OTP', {
                            onSuccessScreen: 'ValidateFrame'
                        })}
                    />
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        padding: scale(30)
    },
    header: {
        height: '30%',
        justifyContent: 'center'
    },
    input: {
        height: '20%',
        justifyContent: 'flex-start',
        alignContent: 'center'
    },
    helpText: {
        height: '40%',
        justifyContent: 'flex-start'
    },
    verifyBtn: {
        justifyContent: 'flex-end',
        height: scale(50),
        alignItems: "center"
    }
})