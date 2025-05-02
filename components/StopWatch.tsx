import React, { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

interface StopWatchProps {
  currentQIndex: number;
  maxTime: number;
  onTimerEnd: () => void;
  stopExternalTimerCallback?: (stopFunc: () => void) => void;
}

export default function StopWatch({
  currentQIndex,
  maxTime,
  onTimerEnd,
  stopExternalTimerCallback
}: StopWatchProps) {
  const [counter, setCounter] = useState(maxTime);
  const timerRef = useRef<number | null>(null);

  const stopTimer = () => {
    if (timerRef.current !== null) {
      BackgroundTimer.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    setCounter(maxTime);
    stopTimer(); // clear previous if any

    BackgroundTimer.setTimeout(() => {
      timerRef.current = BackgroundTimer.setInterval(() => {
        setCounter((prev) => {
          if (prev <= 1) {
            stopTimer();

            // Defer onTimerEnd to avoid calling setState during render
            BackgroundTimer.setTimeout(() => {
              onTimerEnd();
            }, 0);

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1000);

    // Register stop function externally if provided
    stopExternalTimerCallback?.(stopTimer);

    return stopTimer; // Cleanup on unmount or Q change
  }, [currentQIndex, maxTime]);

  return (
    <View>
      <Text style={{ fontFamily: 'WendyOne-Regular', fontSize: 30, color: '#fff' }}>
        {counter}
      </Text>
    </View>
  );
}
