import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

type Props = {
    progress: number
}

const ProgressBar = (props: Props) => {
    let animation = useRef(new Animated.Value(0));
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        Animated.timing(animation.current, {
            toValue: props.progress,
            duration: 100
        }).start();
    }, [props.progress])

    const width = animation.current.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", "100%"],
        extrapolate: "clamp"
    })

    return (
        <View style={styles.progressBar}>
            <Animated.View style={[StyleSheet.absoluteFill, { ...styles.progress, width }]} />
        </View>
    );
}

export default ProgressBar;

const styles = StyleSheet.create({
    progressBar: {
        flexDirection: 'row',
        height: 8,
        width: '100%',
        backgroundColor: '#829df5',
        borderWidth: 0,
        borderRadius: 5,
    },
    progress: {
        backgroundColor: "#f78820",
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    }
});