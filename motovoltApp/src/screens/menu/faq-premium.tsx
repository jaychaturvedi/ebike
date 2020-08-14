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

const faqs = [
    {
        title: "What are the premium features?",
        description: "There are many premium features to slelect from"
    },
    {
        title: "How do premium features work?",
        description: "There are many premium features to slelect from"
    },
    {
        title: "How can I upgrade to premium?",
        description: "There are many premium features to slelect from"
    },
    {
        title: "What is the cost of premium features?",
        description: "There are many premium features to slelect from"
    },
    {
        title: "What are the premium features?",
        description: "There are many premium features to slelect from"
    },
    {
        title: "Premium feature is not reflecting on my account after payment",
        description: "There are many premium features to slelect from"
    }
]

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
                    title={'Premium'}
                    backgroundColor={Colors.HEADER_YELLOW}
                    onBackClick={() => this.props.navigation.goBack()}
                />
                <ScrollView style={styles.body}>
                    {
                        faqs.map((faq, index: number) => (
                            <QnaCard
                                key={index}
                                description={faq.description}
                                title={faq.title}
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