import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { moderateScale, scale } from 'react-native-size-matters'
import Button from '../../components/cta-button'
import CheckBox from '../../components/checkbox'
import { Textarea } from 'native-base'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { FeedbackStackParamList } from '../../navigation/feedback';

type FeedbackNavigationProp = StackNavigationProp<
    FeedbackStackParamList,
    'RideFeedback'
>;

type Props = {
    // navigation: FeedbackNavigationProp,
    // route: RouteProp<FeedbackStackParamList, 'RideFeedback'>
};

type State = {
    checkboxValue: string,
    description: string
}

export default class RideFeedback extends React.PureComponent<Props, State>{
    constructor(props: Props) {
        super(props)
        this.state = {
            checkboxValue: '',
            description: ''
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text
                        style={{ fontSize: moderateScale(18), color: 'black', fontWeight: 'bold' }}
                        onPress={() => console.log("Skip pressed")}
                    >Skip</Text>
                </View>
                <View style={styles.reviews} >
                    <View style={styles.model}>
                        <Text
                            style={{ fontWeight: 'bold', fontSize: moderateScale(16), paddingBottom: moderateScale(10) }}
                        >What went wrong?</Text>
                        <CheckBox
                            option1="Battery Issue"
                            option2="Low Pick Up"
                            option3="Break failure"
                            option4="Other"
                            returnValue={(value: string) => this.setState({ checkboxValue: value })}
                        />
                        <View style={{ paddingTop: moderateScale(20) }}>
                            <Textarea underline rowSpan={4} bordered placeholder="Please describe your concern ..."
                                style={{ borderRadius: moderateScale(10), backgroundColor: '#F8F8FC', borderColor: '#F8F8FC' }}
                                onChangeText={(text: string) => this.setState({ description: text })}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.button}>
                    <Button
                        text="Submit"
                        textColor="white"
                        backgroundColor="#142F6A"
                        onPress={() => console.log("Submitted Feedback")}
                    />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        padding: moderateScale(20),
        backgroundColor: '#bdb7b7'
    },
    header: {
        width: '100%',
        height: '20%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: moderateScale(20)
    },
    reviews: {
        height: '70%',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    model: {
        backgroundColor: 'white',
        padding: moderateScale(20),
        height: moderateScale(335),
        width: moderateScale(300),
        borderRadius: moderateScale(10)
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})