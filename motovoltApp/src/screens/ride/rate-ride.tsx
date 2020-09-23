import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    GestureResponderEvent,
} from 'react-native';
import Rating from '../../components/rating';
import { moderateScale } from 'react-native-size-matters';
import RideMetric from '../../components/ride-metric';
import { TStore } from '../../service/redux/store';
import { connect } from 'react-redux';
import Feedback from './feedback';
import ThumbsUp from '../../components/thumb-up';
import { SubmitRide } from 'src/service/redux/actions/saga';
import { Dispatch } from 'redux';
import Map from '../../components/map';
import LanguageSelector from '../../translations';
import { ThemeContext } from '../../styles/theme/theme-context'


type ReduxState = {
    ride: TStore['ride'];
    user: TStore['user'];
};

interface Props extends ReduxState {
    onComplete: () => void,
    submitRide: (params: SubmitRide) => void
}

type State = {
    rating: number;
    problem: string;
    description: string;
    showFeedback: boolean;
    showThumpUp: boolean;
};

class RateRide extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            rating: 0,
            description: '',
            problem: '',
            showFeedback: false,
            showThumpUp: false,
        };
    }

    render() {
        let Theme = this.context.theme; //load theme in class
        if (this.state.showThumpUp) {
            return (
                <ThumbsUp
                    msg={'Thank you!'}
                    subMsg={'We really appreciate your feedback.'}
                />
            );
        }
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    if (this.state.showFeedback) {
                        this.setState({ showFeedback: false, problem: '', description: '' });
                    }
                }}>
                <View style={{
                    ...styles.container, backgroundColor: Theme.BACKGROUND,//change dark theme
                }}>
                    <View style={styles.map}>
                        <Map location={[
                            // {
                            // latitude: this.props.ride.path.length ? this.props.ride.path[0].lat : 37.78825,
                            // longitude: this.props.ride.path.length ? this.props.ride.path[0].long : -122.4324,
                            // }
                            {
                                latitude: 37.3317876,
                                longitude: -122.0054812,
                            },
                            {
                                latitude: 37.771707,
                                longitude: -122.4053769,
                            },
                        ]} />
                    </View>
                    <View style={styles.usageDetails}>
                        <RideMetric
                            header1={LanguageSelector.t("rateYourRide.distance")}
                            header2={LanguageSelector.t("rateYourRide.duration")}
                            icon1={require('../../assets/icons/total_distance_icon.png')}
                            icon2={require('../../assets/icons/charge_time_remaining.png')}
                            value1={Math.round(Number(this.props.ride.totalDistanceKm)).toString()}
                            value2={this.props.ride.durationSec.toString()}
                            unit1="Km"
                            unit2=""
                        />
                        <RideMetric
                            header1={LanguageSelector.t("rateYourRide.avgSpeed")}
                            header2={LanguageSelector.t("rateYourRide.maxSpeed")}
                            icon1={require('../../assets/icons/average_speed_icon.png')}
                            icon2={require('../../assets/icons/max_speed_icon.png')}
                            value1={Math.round(Number(this.props.ride.avgSpeedKmph)).toString()}
                            value2={Math.round(Number(this.props.ride.maxSpeedKmph)).toString()}
                            unit1="Kmph"
                            unit2="Kmph"
                        />
                        <RideMetric
                            header1={LanguageSelector.t("rateYourRide.greenMiles")}
                            header2={LanguageSelector.t("rateYourRide.caloriesBurnt")}
                            icon1={require('../../assets/icons/green_miles_icon.png')}
                            icon2={require('../../assets/icons/calories_icon_blue.png')}
                            value1={Math.round(Number(this.props.ride.greenMilesKm)).toString()}
                            value2={Math.round(Number(this.props.ride.caloriesBurnt)).toString()}
                            unit1="Km"
                            unit2=""
                        />
                        <RideMetric
                            header1={LanguageSelector.t("rateYourRide.petrolSavings")}
                            header2={LanguageSelector.t("rateYourRide.petrolSavings")}
                            icon1={require('../../assets/icons/inr_icon.png')}
                            icon2={require('../../assets/icons/petrol_savings_icon.png')}
                            value1={Math.round(Number(this.props.ride.petrolSavingsInr)).toString()}
                            value2={Math.round(Number(this.props.ride.petrolSavingsLtr)).toString()}
                            unit1="INR"
                            unit2="L"
                        />
                    </View>
                    <View style={styles.rating}>
                        <View>
                            <Text style={{ textAlign: 'center', fontSize: moderateScale(16), color: Theme.TEXT_WHITE }}>
                                {LanguageSelector.t("rateYourRide.rateYourRide")}
                            </Text>
                        </View>
                        <View style={{ padding: moderateScale(20) }}>
                            <Rating
                                defaultRating={0}
                                maxRating={5}
                                ratingCompleted={(rating: number) => {
                                    this.setState({
                                        rating,
                                        showFeedback: false,
                                    });
                                }}
                            />
                        </View>
                    </View>
                    <TouchableWithoutFeedback
                        onPress={(event: GestureResponderEvent) => {
                            console.log('Pressed inside');
                            event.stopPropagation();
                        }}>
                        <View style={styles.button}>
                            <Feedback
                                onSubmit={() => {
                                    if (
                                        this.state.rating < 4 &&
                                        !(this.state.problem || this.state.description)
                                    ) {
                                        console.log('Submit clicked');
                                        this.setState({ showFeedback: true });
                                    } else {
                                        this.props.submitRide({
                                            type: 'SubmitRide',
                                            payload: {
                                                bikeId: this.props.user.defaultBikeId,
                                                rideId: this.props.ride.id,
                                                comment: this.state.description,
                                                rating: this.state.rating,
                                                reason: [this.state.problem]
                                            }
                                        })
                                        setTimeout(() => {
                                            this.props.onComplete()
                                        }, 1000);
                                        this.setState({ showThumpUp: true });
                                    }
                                }}
                                onFeedback={(problem, description) => {
                                    this.setState({
                                        problem: problem,
                                        description: description,
                                    });
                                }}
                                showFeedback={this.state.showFeedback}
                                submitDisabled={!this.state.rating}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
RateRide.contextType = ThemeContext

export default connect(
    (store: TStore) => {
        return {
            ride: store['ride'],
            user: store['user']
        };
    }, (dispatch: Dispatch) => {
        return {
            submitRide: (params: SubmitRide) => dispatch(params),
        };
    },

)(RateRide);

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#F0F0F0',
    },
    map: {
        height: moderateScale(200),
        width: '100%',
        backgroundColor: 'white',
    },
    usageDetails: {
        height: moderateScale(350),
        padding: moderateScale(20),
    },
    rating: {
        flex: 2,
        height: moderateScale(100),
        justifyContent: 'flex-end',
    },
    button: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScale(32),
    },
});
