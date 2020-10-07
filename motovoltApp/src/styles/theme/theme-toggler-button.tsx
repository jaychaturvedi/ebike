
import { ThemeContext } from './theme-context';
import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
function ThemeTogglerButton(props: any) {
    // The Theme Toggler Button receives not only the theme  // but also a toggleTheme function from the context  
    return (
        <ThemeContext.Consumer>
            {({ theme, toggleTheme }) => {

                console.log(theme, "in buttom");
                return (
                    <View style={{ padding: 50, backgroundColor: theme.BACKGROUND }}>
                        <Button
                            onPress={toggleTheme}
                            title={"Light"}
                            accessibilityLabel="purple button"
                        />
                    </View>
                );
            }}
        </ThemeContext.Consumer>
    );
}

export default ThemeTogglerButton;

