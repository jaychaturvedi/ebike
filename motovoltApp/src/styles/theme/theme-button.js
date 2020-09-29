

import { ThemeContext } from './theme-context';
import React from "react";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';

class ThemedButton extends React.Component {
    render() {
        let props = this.props;
        let theme = this.context;
        return (
            <View style={{ padding: 40, backgroundColor: theme.theme.BACKGROUND }}>

                <Button onPress={theme.toggleTheme}
                    title="dark"
                    style={{ backgroundColor: "green" }}
                />
            </View>
        );
    }
}
ThemedButton.contextType = ThemeContext;
export default ThemedButton;

