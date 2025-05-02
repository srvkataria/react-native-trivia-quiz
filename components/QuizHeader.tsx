import React from 'react';
import { View, ImageBackground, Text, StyleSheet } from 'react-native';
import StopWatch from '../components/StopWatch';
import SoundButton from '../components/SoundButton';

// import { useSelector } from 'react-redux';
// import globalStyles from '../../globalStyles';
// import TimerComp from '../TimerComp';

// const timerBackground = require('../../assets/common/timerBackground.png');

const timerBackground = require('@/assets/images/common/timerBackground.png');

const progressImages = [
  require('../assets/images/progress-bars/P10.png'),
  require('../assets/images/progress-bars/P20.png'),
  require('../assets/images/progress-bars/P30.png'),
  require('../assets/images/progress-bars/P40.png'),
  require('../assets/images/progress-bars/P50.png'),
  require('../assets/images/progress-bars/P60.png'),
  require('../assets/images/progress-bars/P70.png'),
  require('../assets/images/progress-bars/P80.png'),
  require('../assets/images/progress-bars/P90.png'),
  require('../assets/images/progress-bars/P100.png')
];

interface QuizHeaderProps {
  currentQIndex: number;
  totalQuestions: number;
  maxTime: number;
  userAnswered: boolean;
  onTimerEnd: () => void;
  stopExternalTimerCallback?: (stopFunc: () => void) => void;
}

export default function QuizHeader({ currentQIndex, totalQuestions, maxTime, userAnswered, onTimerEnd, stopExternalTimerCallback }: QuizHeaderProps) {
  // const category = useSelector((state: any) => state.sessionReducer.category);

  const displayIndex = currentQIndex + 1;
  let pIndex = Math.floor((displayIndex * 10) / totalQuestions);
  pIndex = Math.max(1, Math.min(pIndex, 10));

  const progressImage = progressImages[pIndex - 1];

  return (
    <View style={{ marginTop: 20 }}>
      <View style={styles.headerRow}>
        <View style={styles.progressBarWrapper}>
          <ImageBackground
            style={styles.progressBar}
            source={progressImage}
            resizeMode="contain"
          >
            <View style={styles.progressTextContainer}>
              <Text style={styles.progressText}>{displayIndex}/{totalQuestions}</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.timerWrapper}>
          <ImageBackground
            style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: 60, height: 60}}
            source={timerBackground}
            resizeMode="contain"
          >
            <StopWatch currentQIndex={currentQIndex} maxTime={maxTime} onTimerEnd={onTimerEnd} stopExternalTimerCallback={stopExternalTimerCallback}/>
          </ImageBackground>
        </View>

        <View>
          <SoundButton/>
        </View>
      </View>
      {/* <Text style={styles.categoryText}>{category}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBarWrapper: {
    width: '60%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  progressBar: {
    width: '100%',
    height: 60,
  },
  progressTextContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontFamily: 'WendyOneRegular',
    fontSize: 18,
    color: '#792305',
  },
  timerWrapper: {
    margin: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  categoryText: {
    fontFamily: 'PoppinsRegular',
    fontSize: 15,
    color: '#ffdda1',
    paddingLeft: 5,
    marginTop: -10,
    fontStyle: 'italic',
  },
});