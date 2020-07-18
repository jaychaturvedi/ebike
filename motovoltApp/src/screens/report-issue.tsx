import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import ProfileInfoCard from './home/components/profile-info-card'
import Button from '../components/cta-button'
import { Textarea } from 'native-base'

type Props = {
}
type State = {
    description: string
}

export default class ReportIssue extends React.PureComponent<Props, State>{
    constructor(props: Props) {
        super(props)
        this.state = {
            description: ''
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <ProfileInfoCard
                        style={styles.profileInfo}
                        data={[{ key: 'Cycle A', value: '' }]}
                    />
                </View>
                <View style={styles.info}>
                    <View style={styles.tile}>
                        <Text style={{ fontSize: moderateScale(13) }}>Model</Text>
                        <Text style={{ fontSize: moderateScale(16), fontWeight: 'bold', lineHeight: moderateScale(40) }}>{"Clasic A"}</Text>
                    </View>
                    <View style={styles.tile}>
                        <Text style={{ fontSize: moderateScale(13) }}>Vehicle ID</Text>
                        <Text style={{ fontSize: moderateScale(16), fontWeight: 'bold', lineHeight: moderateScale(40) }}>{"Blr124800"}</Text>
                    </View>
                </View>
                <View style={styles.textInput}>
                    <Text style={{ fontSize: moderateScale(14), fontWeight: 'bold' }}>Comments</Text>

                    <Textarea underline rowSpan={7} bordered placeholder="Please describe your concern ... "
                        style={styles.textArea}
                        onChangeText={(text: string) => this.setState({ description: text })}
                    />

                </View>
                <View style={styles.button}>
                    <Button
                        text="Submit"
                        onPress={() => console.log("Submitted")}
                        textColor="white"
                        backgroundColor="#142F6A"
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: moderateScale(15),
        backgroundColor: '#F0F0F0'
    },
    header: {
        height: '10%',
        justifyContent: 'center'
    },
    profileInfo: {
        marginVertical: verticalScale(8),
    },
    tile: {
        height: moderateScale(75),
        width: moderateScale(163),
        borderRadius: moderateScale(15),
        backgroundColor: 'white',
        padding: moderateScale(15)
    },
    info: {
        height: '15%',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    textInput: {
        height: '20%',
    },
    textArea: {
        borderRadius: moderateScale(15),
        backgroundColor: 'white',
        borderColor: 'white',
        marginTop: moderateScale(20)
    },
    button: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
})  