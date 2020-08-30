import React from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { Container, Tabs, Tab } from "native-base";
import { moderateScale } from "react-native-size-matters";
import Colors from "../styles/colors";

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
        return (
            <View style={{ backgroundColor: "red", flex: 1 }}>
                <Tabs
                    tabBarUnderlineStyle={{ backgroundColor: "transparent" }}
                    tabBarActiveTextColor={"black"}
                    tabBarInactiveTextColor={"black"}
                    tabContainerStyle={{ backgroundColor: "white" }}
                >
                    {
                        this.props.data.map((tab, index: number) => {
                            return (
                                <Tab
                                    heading={tab.count ? `${tab.header} (${tab.count})` : tab.header}
                                    activeTabStyle={{
                                        ...styles.activeTabStyle,
                                        // borderBottomLeftRadius: 0,
                                    }}
                                    tabStyle={styles.tabStyle}
                                    key={index} >
                                    <View style={styles.tabBody}>
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