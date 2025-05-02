import React from 'react';
import { View, Text, ImageBackground, StyleSheet, ImageSourcePropType } from 'react-native';

interface GameModeButtonProps {
  label1: string;
  label2: string;
  modeIcon: ImageSourcePropType;
  backgroundImage: ImageSourcePropType;
  iconBgImage: ImageSourcePropType;
}

export default function GameModeButton({
  label1,
  label2,
  modeIcon,
  backgroundImage,
  iconBgImage,
}: GameModeButtonProps) {
  return (
    <ImageBackground
      style={{ width: '100%', height: 80 }}
      source={backgroundImage}
      resizeMode="contain"
    >
      <View style={styles.row}>
        <ImageBackground
          style={styles.btnIconBg}
          source={iconBgImage}
          resizeMode="contain"
        >
          <ImageBackground
            style={{ width: 45, height: 45 }}
            source={modeIcon}
            resizeMode="contain"
          />
        </ImageBackground>
        <View style={styles.textContainer}>
          <Text style={styles.btnText_1}>{label1}</Text>
          <Text style={styles.btnText_2}>{label2}</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    display: 'flex',
  },
  btnIconBg: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  btnText_1: {
    fontFamily: 'WendyOneRegular',
    fontSize: 18,
    color: '#792305',
    paddingLeft: 5,
    textAlign: 'left',
  },
  btnText_2: {
    fontFamily: 'PoppinsRegular',
    fontSize: 15,
    color: '#792305',
    paddingLeft: 5,
    textAlign: 'left',
    fontWeight: 'bold',
  },
});
