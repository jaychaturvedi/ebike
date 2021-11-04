import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Button} from 'native-base';
import Logo from '../../assets/svg/motovolt_logo_medium';
import Okay from '../../assets/svg/okay';
import NotHappy from '../../assets/svg/not-happy';
import VeryHappy from '../../assets/svg/very-happy';

export default function BuyingExperience() {
  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
      }}>
      <View style={{alignItems: 'center'}}>
        <Logo style={{marginTop: 100}} />
        <Text
          style={{
            fontWeight: '700',
            fontSize: 31,
            lineHeight: 36,
            textAlign: 'center',
            maxWidth: 343,
            marginTop: 36,
          }}>
          How was your buying experience from Motovolt?
        </Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                width: 57,
                height: 57,
                borderRadius: 28.5,
                backgroundColor: 'rgba(0,0,0,0.05)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <VeryHappy style={{width: 43, height: 43}} />
            </View>
            <Text>Very Happy</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                width: 57,
                height: 57,
                borderRadius: 28.5,
                backgroundColor: 'rgba(0,0,0,0.05)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Okay style={{width: 43, height: 43}} />
            </View>
            <Text>Happy</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                width: 57,
                height: 57,
                borderRadius: 28.5,
                backgroundColor: 'rgba(0,0,0,0.05)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <NotHappy style={{width: 43, height: 43}} />
            </View>
            <Text>Not Happy</Text>
          </View>
        </View>
        <Text
          style={{
            fontWeight: '400',
            fontSize: 14,
            color: '#2B2B2B',
            marginTop: 50,
          }}>
          We appreciate your valuable feedback
        </Text>
        <Button
          // onPress={this.confirmBooking}
          disabled
          style={{
            marginTop: 80,
            backgroundColor: true ? '#142F6A' : '#AFAFAF',
            width: 219,
            height: 52,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              borderRadius: 5,
              color: 'white',
            }}>
            CONTINUE
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
