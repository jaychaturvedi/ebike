import { ThemeContext } from './theme-context';
import themes from './themes';
import ThemedButton from './theme-button';
import ThemeTogglerButton from './theme-toggler-button';
import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';

class App extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <View>
                <ThemeTogglerButton />
                <ThemedButton />
            </View>
        );
    }
}
App.contextType = ThemeContext

export default App