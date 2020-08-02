import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    GestureResponderEvent,
} from 'react-native';
import Rating from '../../components/rating';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import RideMetric from '../../components/ride-metric';
import { TStore } from '../../service/redux/store';
import { connect } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { FeedbackStackParamList } from '../../navigation/feedback';
import Feedback from './feedback';
import ThumbsUp from '../../components/thumb-up';

type ReduxState = {
    ride: TStore['ride'];
};

type RateRideNavigationProp = StackNavigationProp<
    FeedbackStackParamList,
    'RateRide'
>;

interface Props extends ReduxState {
    navigation: RateRideNavigationProp;
    route: RouteProp<FeedbackStackParamList, 'RateRide'>;
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
                        console.log('Pressed outside');
                        this.setState({ showFeedback: false, problem: '', description: '' });
                    }
                }}>
                <View style={styles.container}>
                    <View style={styles.map}></View>
                    <View style={styles.usageDetails}>
                        <RideMetric
                            header1="Distance"
                            header2="Duration"
                            icon1={require('../../assets/icons/total_distance_icon.png')}
                            icon2={require('../../assets/icons/charge_time_remaining.png')}
                            value1={this.props.ride.totalDistanceKm.toString()}
                            value2={this.props.ride.durationSec.toString()}
                            unit1="Km"
                            unit2=""
                        />
                        <RideMetric
                            header1="Avg. speed"
                            header2="Max. speed"
                            icon1={require('../../assets/icons/average_speed_icon.png')}
                            icon2={require('../../assets/icons/max_speed_icon.png')}
                            value1={this.props.ride.avgSpeedKmph.toString()}
                            value2={this.props.ride.maxSpeedKmph.toString()}
                            unit1="Kmph"
                            unit2="Kmph"
                        />
                        <RideMetric
                            header1="Green Miles"
                            header2="Calories Burnt"
                            icon1={require('../../assets/icons/green_miles_icon.png')}
                            icon2={require('../../assets/icons/calories_icon_blue.png')}
                            value1={this.props.ride.greenMilesKm.toString()}
                            value2={this.props.ride.caloriesBurnt.toString()}
                            unit1="Km"
                            unit2=""
                        />
                        <RideMetric
                            header1="Petrol Savings"
                            header2="Petrol Savings"
                            icon1={require('../../assets/icons/inr_icon.png')}
                            icon2={require('../../assets/icons/petrol_savings_icon.png')}
                            value1={this.props.ride.petrolSavingsInr.toString()}
                            value2={this.props.ride.petrolSavingsLtr.toString()}
                            unit1="INR"
                            unit2="L"
                        />
                    </View>
                    <View style={styles.rating}>
                        <View>
                            <Text style={{ textAlign: 'center', fontSize: moderateScale(16) }}>
                                Rate your ride
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
                                        setTimeout(() => this.setState({ showThumpUp: false }), 5000);
                                        this.setState({ showThumpUp: true });
                                        //
                                        // this.props.navigation.popToTop();
                                    }
                                }}
                                onFeedback={(problem, description) => {
                                    this.setState({
                                        problem: problem,
                                        description: description,
                                        // submitDisabled:
                                        //   this.state.rating < 4 && (!problem || !description),
                                    });
                                    console.log('Probelm', problem, description);
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

export default connect(
    (store: TStore): ReduxState => {
        return {
            ride: store['ride'],
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
