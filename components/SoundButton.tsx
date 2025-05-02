import React, { useContext } from 'react';
import { View, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

import SoundOnIcon from './SvgIcons/SoundOnIcon';
import SoundOffIcon from './SvgIcons/SoundOffIcon';
import { SoundContext } from '../utils/SoundContext';

const soundIconBackground = require('@/assets/images/common/soundIconBackground.png');

export default function SoundButton() {
  const { isPlaying, toggleSound } = useContext(SoundContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={toggleSound}
        style={styles.touchable}
      >
        <ImageBackground
          style={styles.background}
          source={soundIconBackground}
          resizeMode="contain"
        >
          {isPlaying ? (
            <SoundOnIcon width={25} height={25} />
          ) : (
            <SoundOffIcon width={25} height={25} />
          )}
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
  },
});
