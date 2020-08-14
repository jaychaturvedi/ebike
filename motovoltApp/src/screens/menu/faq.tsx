import React from 'react';
import { View, StyleSheet, Text, Linking, Platform } from 'react-native';
import Tile from '../../components/tile';
import { moderateScale } from 'react-native-size-matters';
import Header from '../home/components/header';
import Colors from '../../styles/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MenuStackParamList } from '../../navigation/menu';

type FaqNavigationProp = StackNavigationProp<
    MenuStackParamList,
    'Faq'
>;

type Props = {
    navigation: FaqNavigationProp,
    route: RouteProp<MenuStackParamList, 'Faq'>
};

type State = {};


export default class FAQ extends React.PureComponent<Props, State> {


    render() {
        return (
            <View style={styles.container}>
                <Header
                    hasBackButton
                    title={'FAQ'}
                    backgroundColor={Colors.HEADER_YELLOW}
                    onBackClick={() => this.props.navigation.goBack()}
                />
                <View
                    style={{
                        flex: 1,
                        paddingHorizontal: moderateScale(20),
                        paddingVertical: moderateScale(20),
                    }}>

                    <View style={styles.support}>
                        <Tile
                            feature="Service"
                            icon={require('../../assets/icons/icons1.5x/book-service.png')}
                            onPress={() => console.log}
                            height={moderateScale(110)}
                        />
                        <Tile
                            feature="Green Mile"
                            icon={require('../../assets/icons/icons1.5x/green-miles.png')}
                            onPress={() => console.log('Feature pressed')}
                            height={moderateScale(110)}
                        />
                        <Tile
                            feature="Battery"
                            icon={require('../../assets/icons/icons1.5x/battery.png')}
                            onPress={() => console.log("Feature pressed")}
                            height={moderateScale(110)}
                        />
                        <Tile
                            feature="Motor"
                            icon={require('../../assets/icons/icons1.5x/motor.png')}
                            onPress={() => console.log("Feature pressed")}
                            height={moderateScale(110)}
                        />
                        <Tile
                            feature="Premium"
                            icon={require('../../assets/icons/icons1.5x/arrow-up.png')}
                            onPress={() => this.props.navigation.navigate('FaqPremium', {})}
                            height={moderateScale(110)}
                        />
                        <Tile
                            feature="Payment"
                            icon={require('../../assets/icons/icons1.5x/inr.png')}
                            onPress={() => console.log('Feature pressed')}
                            height={moderateScale(110)}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#F0F0F0',
        justifyContent: 'space-between',
    },
    header: {
        height: moderateScale(20),
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    support: {
        paddingVertical: moderateScale(10),
        flex: 1,
        backgroundColor: '#F0F0F0',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});
