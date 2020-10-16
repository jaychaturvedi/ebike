import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import TransparentModal from '../../../components/transparent-modal';
import Colors from '../../../styles/colors';
import {scale, verticalScale} from '../../../styles/size-matters';
import {Button} from 'native-base';

type Props = {
  contentText: string;
  successButtonText: string;
  failureButtonText: string;
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    elevation: 20,
    paddingHorizontal: verticalScale(30),
    paddingTop: verticalScale(40),
    backgroundColor: Colors.WHITE,
  },
  contentText: {color: Colors.BLACK, fontSize: 16, lineHeight: 24},
  bottomContainer: {
    paddingVertical: verticalScale(16),
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginLeft: scale(40),
  },
  buttonText: {color: 'rgba(29, 53, 92, 1)', fontSize: 14},
});

export default (props: Props) => {
  return (
    <TransparentModal>
      <View style={styles.container}>
        <Text style={styles.contentText}>{props.contentText}</Text>
        <View style={styles.bottomContainer}>
          <Button hasText style={styles.button}>
            <Text style={styles.buttonText}>{props.failureButtonText}</Text>
          </Button>
          <Button hasText style={styles.button}>
            <Text style={styles.buttonText}>{props.successButtonText}</Text>
          </Button>
        </View>
      </View>
    </TransparentModal>
  );
};
