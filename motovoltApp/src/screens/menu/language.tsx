import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import Header from '../home/components/header/index';
import Colors from '../../styles/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MenuStackParamList } from '../../navigation/menu';
import LanguageSelector from '../../translations';

type MoreMenuNavigationProp = StackNavigationProp<
    MenuStackParamList,
    'Language'
>;

type Props = {
    navigation: MoreMenuNavigationProp;
    route: RouteProp<MenuStackParamList, 'Language'>;
}

export default class SelectLanguage extends React.PureComponent<Props, { language: string }>{

    constructor(props: Props) {
        super(props);
        this.state = {
            language: 'en'
        }
    }

    changeLanguage(language: string) {
        LanguageSelector.locale = language;
        this.setState({ language: language });
    }

    render() {
        return (
            <View style={{ height: '100%', width: '100%' }}>
                <Header title="More" backgroundColor={Colors.HEADER_YELLOW}
                    hasBackButton onBackClick={() => this.props.navigation.replace('MenuScreen', {})}
                />
                <View style={styles.container}>
                    <Button
                        onPress={() => this.changeLanguage('en')}
                        title="English"
                        color="#841584"
                        accessibilityLabel="English"
                    />
                    <Button
                        onPress={() => this.changeLanguage('bn-IN')}
                        title="Bengali"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                    <Text>
                        {
                            LanguageSelector.t("language")
                        }
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center'
    }
})