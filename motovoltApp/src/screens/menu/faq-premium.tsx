import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../../styles/colors';
import Header from '../home/components/header';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MenuStackParamList } from '../../navigation/menu';
import QnaCard from '../common/QnACard';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemeContext } from '../../styles/theme/theme-context';

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
        let Theme = this.context.theme //load
        return (
            <View style={{ ...styles.container, backgroundColor: Theme.BACKGROUND }}>
                <Header
                    hasBackButton
                    title={this.props.route.params.header}
                    backgroundColor={Theme.HEADER_YELLOW}
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

FAQPremium.contextType = ThemeContext

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: Colors.BG_GREY,
    },
    body: {
        flex: 1
    }
})