import React from 'react'
import { View, StyleSheet, ScrollView, Text, Image, Dimensions } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import ProfileImage from '../components/profile'
import RideMetric from '../components/ride-metric'
import upgrade from '../components/upgrade'
import Upgrade from '../components/upgrade'
import Feature from '../components/feature'



const feature = [{
    feature: "Battery Analytics",
    icon: require("../assets/icons/battery_analytics.png"),
    onPress: () => console.log("Feature pressed"),
    premium: true
},
{
    feature: "Geo fencing",
    icon: require("../assets/icons/geo_fencing_icon.png"),
    onPress: () => console.log("Feature pressed"),
    premium: true
},
{
    feature: "Nearby",
    icon: require("../assets/icons/nearby_icon.png"),
    onPress: () => console.log("Feature pressed"),
    premium: false
},
{
    feature: "FAQs",
    icon: require("../assets/icons/faq_icon.png"),
    onPress: () => console.log("Feature pressed"),
    premium: false
},
{
    feature: "Community",
    icon: require("../assets/icons/comunity_icon.png"),
    onPress: () => console.log("Feature pressed"),
    premium: false
}, {
    feature: "Support",
    icon: require("../assets/icons/support_icon.png"),
    onPress: () => console.log("Feature pressed"),
    premium: false
}, {
    feature: "Languages",
    icon: require("../assets/icons/languages_icon.png"),
    onPress: () => console.log("Feature pressed"),
    premium: false
}, {
    feature: "Promotions",
    icon: require("../assets/icons/promotions_icon.png"),
    onPress: () => console.log("Feature pressed"),
    premium: false
}, {
    feature: "Send Invite",
    icon: require("../assets/icons/send_invite_icon.png"),
    onPress: () => console.log("Feature pressed"),
    premium: false
}, {
    feature: "Insurance",
    icon: require("../assets/icons/logout_icon.png"),
    onPress: () => console.log("Feature pressed"),
    premium: false
}, {
    feature: "Logout",
    icon: require("../assets/icons/logout_icon.png"),
    onPress: () => console.log("Feature pressed"),
    premium: false
},
]

type Props = {}
type State = {}

export default class MoreMenu extends React.PureComponent<Props, State>{
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.profile}>
                    <ProfileImage />
                    <Text style={{ fontSize: moderateScale(24), fontWeight: 'bold', paddingTop: moderateScale(10), textAlign: 'center' }}>
                        Vikram <Text onPress={() => console.log("Pencil pressed")}><Image source={require("../assets/icons/pencil-edit-button.png")} /></Text>
                    </Text>
                    <Text style={{ textAlign: 'center' }}>Classic Model-A</Text>
                </View>
                <View style={styles.metric}>
                    <RideMetric
                        header1="Green miles"
                        header2="Calories"
                        unit1="Km"
                        unit2=""
                        icon1={require('../assets/icons/green_miles_green_icon.png')}
                        icon2={require('../assets/icons/calories_red_icon.png')}
                        value1={String(250)}
                        value2={String(1358)}
                    />
                </View >
                <View style={styles.upgrade}>
                    <Upgrade />
                </View>
                <ScrollView style={styles.features}
                    contentContainerStyle={{
                        flexDirection: 'row', flexWrap: 'wrap',
                        alignContent: 'center'
                    }}>
                    {
                        feature.map((feature, index: number) => {
                            return (
                                <View style={{ width: '33.3%', alignItems: 'center' }} key={index}>
                                    <Feature
                                        feature={feature.feature}
                                        icon={feature.icon}
                                        onPress={feature.onPress}
                                        premium={feature.premium}
                                    />
                                </View>
                            )
                        })
                    }
                </ScrollView>

            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#F0F0F0",
        // padding: moderateScale(15)
    },
    profile: {
        height: moderateScale(160),
        alignItems: 'center',
        marginTop: moderateScale(15)
    },
    metric: {
        height: moderateScale(65),
        backgroundColor: 'white',
        borderRadius: moderateScale(10),
        paddingLeft: moderateScale(10),
        paddingRight: moderateScale(10),
        marginLeft: moderateScale(15),
        marginRight: moderateScale(15)
    },
    upgrade: {
        marginTop: moderateScale(15),
        height: moderateScale(90),
        borderRadius: moderateScale(20),
        backgroundColor: '#FFC40F',
        marginLeft: moderateScale(15),
        marginRight: moderateScale(15)
    },
    features: {
        marginTop: moderateScale(15),
        flex: 1,
        width: '100%',
        paddingLeft: moderateScale(9),
        paddingRight: moderateScale(9)
    }
})