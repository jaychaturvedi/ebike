import React from 'react';
import { View, StyleSheet, Text, Linking, Platform, Image } from 'react-native';
import Tile from '../../components/tile';
import { moderateScale } from 'react-native-size-matters';
import Header from '../home/components/header';
import Colors from '../../styles/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MenuStackParamList } from '../../navigation/menu';
import { TStore } from '../../service/redux/store';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ReadFAQ } from 'src/service/redux/actions/saga';

type FaqNavigationProp = StackNavigationProp<
    MenuStackParamList,
    'Faq'
>;

interface ReduxState {
    faq: TStore['faq'],
    readFAQ: (params: ReadFAQ) => void
}

interface Props extends ReduxState {
    navigation: FaqNavigationProp,
    route: RouteProp<MenuStackParamList, 'Faq'>
};


type State = {

};

class FAQ extends React.PureComponent<Props, State> {

    componentDidMount() {
        this.props.readFAQ({
            type: 'ReadFAQ',
            payload: {}
        })
    }

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
                        {
                            Object.keys(this.props.faq).map((faq: any, index: number) => {
                                return <Tile
                                    feature={this.props.faq[faq].name}
                                    icon={{ uri: this.props.faq[faq].icon }}
                                    onPress={() => {
                                        this.props.navigation.navigate('FaqPremium', {
                                            faq: this.props.faq[faq].faq,
                                            header: this.props.faq[faq].name
                                        })
                                    }}
                                    iconStyle={{ height: 40, width: 40 }}
                                    height={moderateScale(110)}
                                />
                            })
                        }
                    </View>
                </View>
            </View>
        );
    }
}

export default connect(
    (store: TStore) => {
        return {
            faq: store['faq'],
        };
    },
    (dispatch: Dispatch) => {
        return {
            readFAQ: (params: ReadFAQ) => dispatch(params)
        };
    },
)(FAQ);

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
