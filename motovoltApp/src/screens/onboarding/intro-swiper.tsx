import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { verticalScale, scale, moderateScale } from 'react-native-size-matters';
import Swiper from 'react-native-swiper';
import { Icon } from 'native-base';
import Button from '../../components/cta-button';
import NextButton from './components/next-page-button';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native'
import { RegistrationStackParamList } from '../../navigation/registartion'

type IntroSwiperNavigationProp = StackNavigationProp<
  RegistrationStackParamList,
  'IntroSwiper'
>;

type Props = {
  navigation: IntroSwiperNavigationProp,
  route: RouteProp<RegistrationStackParamList, 'IntroSwiper'>
};

type State = {};

export const getHeader = (
  skipButton: boolean,
  backButton: boolean,
  skipFunc?: () => void,
  backFunc?: () => void,
) => {
  return (
    <View style={styles.skip}>
      {backButton ? (
        <TouchableOpacity style={{ flex: 1 }} onPress={backFunc}>
          <Icon
            type="FontAwesome"
            name="chevron-left"
            style={{
              fontSize: scale(14),
            }}
          />
        </TouchableOpacity>
      ) : null}
      {skipButton ? (
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            flexDirection: 'row',
          }}
          onPress={skipFunc}>
          <Text
            style={{
              fontSize: scale(14),
            }}>
            Skip
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export const getImage = (src: string) => {
  return <View style={styles.image}></View>;
};

export const getText = (text: string) => {
  return (
    <View style={styles.helpText}>
      <Text
        style={{ fontSize: scale(24), fontWeight: 'bold', textAlign: 'center' }}>
        {text}
      </Text>
    </View>
  );
};

export const getFooter = (next: () => void) => {
  return (
    <View style={styles.next}>
      <NextButton mode="Active" onPress={next} />
    </View>
  );
};

export default class IntroSwiper extends React.PureComponent<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <Swiper
          loop={false}
          dot={<View style={styles.carouselDot} />}
          activeDot={<View style={styles.carouselActiveDot} />}
          index={0}
          ref="mySwiper"
          paginationStyle={{
            bottom: '40%',
          }}>
          <View style={styles.slide}>
            {getHeader(
              true,
              false,
              () => (this.refs.mySwiper as any).scrollBy(3),
              () => console.log('back pressed'),
            )}
            {getImage('')}
            {getText('Drive Less, e-Cycle More!')}
            {getFooter(() => {
              (this.refs.mySwiper as any).scrollBy(1);
            })}
          </View>
          <View style={styles.slide}>
            {getHeader(
              true,
              true,
              () => (this.refs.mySwiper as any).scrollBy(2),
              () => {
                (this.refs.mySwiper as any).scrollBy(-1);
              },
            )}
            {getImage('')}
            {getText('Remotely control and locate your cycle')}
            {getFooter(() => {
              (this.refs.mySwiper as any).scrollBy(1);
            })}
          </View>
          <View style={styles.slide}>
            {getHeader(
              true,
              true,
              () => (this.refs.mySwiper as any).scrollBy(1),
              () => {
                (this.refs.mySwiper as any).scrollBy(-1);
              },
            )}
            {getImage('')}
            {getText('Analyse cycle statistics on your phone')}
            {getFooter(() => {
              (this.refs.mySwiper as any).scrollBy(1);
            })}
          </View>
          <View style={styles.slide}>
            {getHeader(false, true, undefined, () => {
              (this.refs.mySwiper as any).scrollBy(-1);
            })}
            {getImage('')}
            {getText('Gain Green Miles and earn exciting gifts!')}
            {/* {getFooter(() => { (this.refs.mySwiper as any).scrollBy(1) })} */}
            <View style={styles.register}>
              <View style={{ height: '50%', justifyContent: 'flex-start' }}>
                <Text style={{ textAlign: 'center', fontSize: scale(12) }}>
                  <Text>Already have an account,</Text>
                  <Text
                    style={{ color: 'black', fontWeight: 'bold' }}
                    onPress={() => this.props.navigation.navigate('LoginPage', {})}>
                    {' '}
                    Login
                  </Text>
                </Text>
              </View>
              <View
                style={{
                  height: '50%',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                {/* <Button name="REGISTER" onPress={() => console.log("Register Pressed")} /> */}
                <Button
                  text="REGISTER"
                  textColor="white"
                  backgroundColor="#142F6A"
                  onPress={() => this.props.navigation.navigate('ValidateMobile', {})}
                />
              </View>
            </View>
          </View>
        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    paddingTop: moderateScale(20),
    flex: 1,
  },
  skip: {
    paddingTop: scale(10),
    paddingRight: scale(14),
    paddingLeft: scale(14),
    height: '20%',
    width: '100%',
    flexDirection: 'row',
  },
  image: {
    height: '40%',
  },
  helpText: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  next: {
    alignItems: 'flex-end',
    height: '20%',
    justifyContent: 'center',
    paddingRight: scale(14),
  },
  register: {
    height: '20%',
    padding: scale(30),
  },
  carouselDot: {
    backgroundColor: '#CCCCCC',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 4,
    marginRight: 4,
    marginTop: 3,
    marginBottom: 3,
  },
  carouselActiveDot: {
    backgroundColor: '#5372FF',
    width: 20,
    height: 8,
    borderRadius: 4,
    marginLeft: 2,
    marginRight: 1,
    marginTop: 3,
    marginBottom: 3,
  },
  slide: {
    flex: 1,
    height: '100%',
    backgroundColor: 'white',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
