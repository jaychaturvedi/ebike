import React from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import { Content, Icon } from "native-base";
import ProgressBar from './progress-bar'
// import { scale, verticalScale, moderateScale } from './size'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'
import Moment from 'moment'
import { TouchableOpacity } from "react-native-gesture-handler";
import LanguageSelector from '../translations';
import { ThemeContext } from '../styles/theme/theme-context';

type Props = {
    fromTime: Date,
    toTime: Date
    fromAddress: string,
    toAddress: string,
    progress: number,
    distance: string,
    speed: string,
    rating: string
    onItemSelect: () => void

};
type State = {
    isMorning: boolean
};

const beforeTime = Moment('06:00:00', 'HH:MM A');
const afterTime = Moment('18:00:00', 'HH:MM A');

export default class RideCard extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            isMorning: Moment(this.props.fromTime, 'HH:MM A').isBetween(beforeTime, afterTime)
        }
    }

    render() {
        let Theme = this.context.theme //load theme context
        return (
            //Make the below view as touchable opacity if the whole card is touchable
            <TouchableOpacity style={{ ...styles.container, backgroundColor: Theme.BACKGROUND_LIGHT }}
                onPress={() => this.props.onItemSelect()}
            >
                <View style={styles.leftContainer}>
                    <View style={{ flexDirection: 'row', height: moderateScale(30) }}>
                        <View style={{ height: '100%' }}><Image source={
                            this.state.isMorning ? require('../assets/icons/sun_icon.png') :
                                require('../assets/icons/moon_icon.png')
                        } style={{ height: 16, aspectRatio: 1 }} /></View>
                        <Text style={{ ...styles.headerText, color: Theme.TEXT_WHITE }}> {Moment(this.props.fromTime).format('HH:MM A')} - {Moment(this.props.toTime).format('HH:MM A')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ paddingTop: moderateScale(2) }}>
                            <Image source={require("../assets/icons/arrow.png")} />
                        </View>
                        <View>
                            <Text style={{ ...styles.destinationText, color: Theme.TEXT_WHITE }} numberOfLines={1}>
                                {/* <Icon type="FontAwesome" name="circle" style={{ color: 'green', fontSize: 10 }}></Icon> */}
                    &nbsp;&nbsp;{this.props.fromAddress}
                            </Text>
                            <Text style={{ ...styles.destinationText, color: Theme.TEXT_WHITE }} numberOfLines={1}>
                                {/* <Icon type="FontAwesome" name="circle" style={{ color: 'orange', fontSize: 10 }}></Icon> */}
                    &nbsp;&nbsp;{this.props.toAddress}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <Text style={{ ...styles.modeText, color: Theme.TEXT_WHITE }}>{LanguageSelector.t("myRides.mode")} </Text>
                        <ProgressBar progress={this.props.progress} />
                        <View style={styles.footerGroup}>
                            <Text style={{ fontSize: scale(12), color: Theme.TEXT_WHITE }}>
                                <Image source={require('../assets/icons/total_distance_icon_small.png')} />
                                &nbsp;{this.props.distance} KM
                            </Text>
                            <Text style={{ fontSize: scale(12), color: Theme.TEXT_WHITE }}>
                                <Image source={require('../assets/icons/total_distance_icon_small.png')} />
                                &nbsp;{this.props.speed} Kmph
                            </Text>
                            <Text style={{ fontSize: scale(12), color: Theme.TEXT_WHITE }}>
                                <Image source={require('../assets/icons/star_icon.png')} />
                                 &nbsp;{this.props.rating}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.rightContainer}>
                    <View style={styles.rightArrow}>
                        <Icon type="FontAwesome" name="chevron-right" style={styles.detailsIcon}></Icon>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

RideCard.contextType = ThemeContext

const styles = StyleSheet.create({
    container: {
        marginTop: verticalScale(10),
        marginBottom: verticalScale(10),
        padding: moderateScale(20),
        backgroundColor: 'white',
        height: moderateScale(180),
        borderRadius: 10,
        flexDirection: 'row',
    },
    headerText: {
        fontSize: moderateScale(10),
        paddingBottom: moderateScale(5),
        justifyContent: 'center'
    },
    icon: {
        fontSize: moderateScale(15),
        color: '#829df5'
    },
    destinationText: {
        fontSize: 13
    },
    modeText: {
        fontSize: moderateScale(13),
        paddingBottom: moderateScale(5),
        fontWeight: 'bold'
    },
    footer: {
        marginTop: verticalScale(25),
    },
    footerGroup: {
        marginTop: verticalScale(10),
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    leftContainer: {
        width: '90%',
        height: verticalScale(140),
    },
    rightContainer: {
        width: '10%',
        height: verticalScale(140),
        alignItems: 'center',
    },
    rightArrow: {
        top: '20%',
    },
    detailsIcon: {
        fontSize: moderateScale(20),
        color: 'black'
    }
});
