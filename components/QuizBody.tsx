import React, { useEffect, useState, useRef, useMemo } from 'react';
import { View, Image, Text, Dimensions, StyleSheet, ImageSourcePropType } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

interface QuizBodyProps {
  qText: string;
  qImgUrl: ImageSourcePropType;
}

export default function QuizBody({ qText, qImgUrl }: QuizBodyProps) {
  const [qTextHtml, setQTextHtml] = useState('');
  const timerRef = useRef<number | null>(null);

  const windowWidth = Dimensions.get('window').width;
  const imageWidth = useMemo(() => (windowWidth * 85) / 100, [windowWidth]);
  const imageHeight = useMemo(() => (windowWidth * 50) / 100, [windowWidth]);

  useEffect(() => {
    animateQuestion(qText);
    return () => {
      if (timerRef.current) BackgroundTimer.clearInterval(timerRef.current);
    };
  }, [qText]);

  const animateQuestion = (text: string) => {
    const words = text.split(' ');
    let counter = 0;

    timerRef.current = BackgroundTimer.setInterval(() => {
      if (counter <= words.length) {
        let chunk = '';
        for (let i = 0; i <= counter; i += 2) {
          if (i < words.length) {
            chunk += `${words[i] || ''} ${words[i + 1] || ''} `;
          }
        }
        setQTextHtml(chunk.trim());
        counter += 2;
      } else {
        if (timerRef.current) BackgroundTimer.clearInterval(timerRef.current);
      }
    }, 200);
  };

  return (
    <View style={styles.fullCenter}>
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <View style={styles.imageBox}>
            <Image
              style={[styles.image, { width: imageWidth, height: imageHeight }]}
              source={qImgUrl}
              resizeMode="contain"
            />
          </View>
        </View>
        <Text style={styles.questionText}>{qTextHtml}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    marginTop: '5%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBox: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    maxHeight: 200,
  },
  questionText: {
    fontFamily: 'PoppinsRegular',
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginTop: 15,
    paddingHorizontal: 20,
    fontWeight: 'bold',
  },
});