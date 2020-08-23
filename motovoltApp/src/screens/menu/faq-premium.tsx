import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../../styles/colors';
import Header from '../home/components/header';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MenuStackParamList } from '../../navigation/menu';
import QnaCard from '../common/QnACard';
import { moderateScale } from 'react-native-size-matters';
import { ScrollView } from 'react-native-gesture-handler';

type FAQPremiumNavigationProp = StackNavigationProp<
    MenuStackParamList,
    'FaqPremium'
>;

interface Props {
    navigation: FAQPremiumNavigationProp;
    route: RouteProp<MenuStackParamList, 'FaqPremium'>;
}

interface State { }

export default class FAQPremium extends React.PureComponent<Props, State>{
    render() {
        return (
            <View style={styles.container}>
                <Header
                    hasBackButton
                    title={this.props.route.params.header}
                    backgroundColor={Colors.HEADER_YELLOW}
                    onBackClick={() => this.props.navigation.goBack()}
                />
                <ScrollView style={styles.body}>
                    {
                        this.props.route.params.faq.map((faq, index: number) => (
                            <QnaCard
                                key={index}
                                description={faq.Answer}
                                title={faq.Question}
                            />
                        ))
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: Colors.BG_GREY,
    },
    body: {
        flex: 1
    }
})