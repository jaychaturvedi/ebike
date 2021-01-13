import React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
    progress: {
      ecoMode: number;
      powerMode: number;
      pedalAssistMode: number;
    };
}

const ProgressBar = (props: Props) => {
    const {ecoMode, powerMode, pedalAssistMode} = props.progress
    // const {ecoMode, powerMode, pedalAssistMode} = {ecoMode:0, powerMode:20, pedalAssistMode:0}
    const sumOfModes = ecoMode+powerMode+pedalAssistMode
    const powerModeStyle=()=>{
      if (ecoMode+pedalAssistMode===0) {
        return {
          ...styles.powerMode, 
          borderRadius:5,
          width:`${powerMode/sumOfModes*100}%`
          }
      }
      if (ecoMode===0) {
        return {
          ...styles.powerModeWithLeftBorderRadius, 
          width:`${powerMode/sumOfModes*100}%`
          }
      }
      if (pedalAssistMode===0) {
        return {
          ...styles.powerModeWithRightBorderRadius, 
          width:`${powerMode/sumOfModes*100}%`
          }
      }
      else {
        return {
          ...styles.powerMode,
          width:`${powerMode/sumOfModes*100}%`
        }
      }
    }
    return (
        <View style={styles.progressBar}>
          <View style={
              (powerMode+pedalAssistMode)!==0
                ? {
                  ...styles.ecoMode,
                  width: `${ecoMode / sumOfModes * 100}%`
                }
                : {
                  ...styles.ecoModeWithRadius,
                  width: `${ecoMode / sumOfModes * 100}%`
                }
            }     
          />
          <View style={powerModeStyle()}
          />

          <View style={
            (ecoMode+powerMode)!==0
            ? {
            ...styles.pedalAssistMode, 
            width:`${pedalAssistMode/sumOfModes*100}%`
            }
            : {
              ...styles.pedalAssistModeWithBorderRadius, 
              width:`${pedalAssistMode/sumOfModes*100}%` 
            }}
          />
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
        overflow:"hidden"
    },
    ecoMode: {
      backgroundColor:"#5372FF",
      borderBottomLeftRadius:5,
      borderTopLeftRadius: 5
    },
    ecoModeWithRadius: {
      backgroundColor:"#5372FF",
      borderRadius:5
    },
    powerMode: {
      backgroundColor:"#FF6753"
    },
    powerModeWithLeftBorderRadius: {
      backgroundColor:"#FF6753",
      borderBottomLeftRadius:5,
      borderTopLeftRadius: 5
    },
    powerModeWithRightBorderRadius: {
      backgroundColor:"#FF6753",
      borderBottomRightRadius:5,
      borderTopRightRadius: 5
    },
    pedalAssistMode: {
      backgroundColor:"#39BC85",
      borderBottomRightRadius:5,
      borderTopRightRadius: 5
    },
    pedalAssistModeWithBorderRadius: {
      backgroundColor:"#39BC85",
      borderRadius:5
    }
});