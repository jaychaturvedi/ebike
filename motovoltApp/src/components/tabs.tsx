import React from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { Container, Tabs, Tab } from "native-base";
import { moderateScale } from "react-native-size-matters";
import Colors from "../styles/colors";
import { ThemeContext } from '../styles/theme/theme-context'

const styles = StyleSheet.create({
    activeTabStyle: {
        backgroundColor: Colors.HEADER_YELLOW,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    tabStyle: { backgroundColor: "white" },
    tabBody: { flex: 1, backgroundColor: '#F0F0F0', paddingBottom: moderateScale(15) }
});

type Props = {
    data: {
        count?: number,
        header: string,
        body: any
    }[]
}

type State = {}

export default class MotovoltTabs extends React.PureComponent<Props, State> {

    render() {
        let Theme = this.context.theme //load theme context
        return (
            <View style={{ backgroundColor: "red", flex: 1 }}>
                <Tabs
                    tabBarUnderlineStyle={{ backgroundColor: "transparent" }}
                    tabBarActiveTextColor={Theme.TEXT_WHITE}
                    tabBarInactiveTextColor={Theme.TEXT_GREY}
                    tabContainerStyle={{ backgroundColor: Theme.BACKGROUND_LIGHT }}
                >
                    {
                        this.props.data.map((tab, index: number) => {
                            return (
                                <Tab
                                    heading={tab.count ? `${tab.header} (${tab.count})` : tab.header}
                                    activeTabStyle={{
                                        ...styles.activeTabStyle,
                                        backgroundColor: Theme.HEADER_YELLOW,

                                        // borderBottomLeftRadius: 0,
                                    }}
                                    tabStyle={{ ...styles.tabStyle, backgroundColor: Theme.BACKGROUND_LIGHT }}
                                    key={index} >
                                    <View style={{ ...styles.tabBody, backgroundColor: Theme.BACKGROUND }}>
                                        {tab.body}
                                    </View>
                                </Tab>
                            )

                        })
                    }
                </Tabs>
            </View>
        );
    }
};

MotovoltTabs.contextType = ThemeContext