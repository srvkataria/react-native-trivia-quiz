import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, ImageBackground, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import QuizHeader from '../components/QuizHeader';
import QuizBody from '../components/QuizBody';
import { getRandomQuestions } from '../utils/QuizUtils';
import { SoundContext } from '../utils/SoundContext';
import BackgroundTimer from 'react-native-background-timer';
import { router } from 'expo-router';

const appBackground = require('@/assets/images/appBackground.png');
const defaultOption = require('@/assets/images/common/defaultOption.png');
const rightOption = require('@/assets/images/common/rightOption.png');
const wrongOption = require('@/assets/images/common/wrongOption.png');

export default function QuizSingle() {
  const navigation = useNavigation();
  const { playWinSound, playLoseSound, stopQuizSound } = useContext(SoundContext);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswered, setUserAnswered] = useState(false);
  const [userSelectionIndex, setUserSelectionIndex] = useState(-1);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [myAnswers, setMyAnswers] = useState<any[]>([]);

  const questionsRef = useRef<any[]>([]);
  const currentQIndexRef = useRef(0);
  const myAnswersRef = useRef<any[]>([]);
  const timerStoppedRef = useRef(false);
  const stopTimerExternally = useRef<() => void>(() => {});

  useEffect(() => {
    const q = getRandomQuestions();
    setQuestions(q);
    questionsRef.current = q;
    timerStoppedRef.current = false;
  }, []);

  useEffect(() => {
    currentQIndexRef.current = currentQIndex;
  }, [currentQIndex]);

  const moveToNextQuestion = (answerObj: any, isCorrect: boolean) => {
    BackgroundTimer.setTimeout(() => {
      setUserAnswered(false);
      setUserSelectionIndex(-1);
      setShowFeedback(false);
      timerStoppedRef.current = false;

      if (currentQIndexRef.current < questionsRef.current.length - 1) {
        setCurrentQIndex(prev => prev + 1);
      } else {
        router.push({
          pathname: '/quizResult',
          params: {
            answers: JSON.stringify([...myAnswers, answerObj]),
            correctAnswers: isCorrect ? (correctAnswers + 1).toString() : correctAnswers.toString(),
            totalQuestions: questionsRef.current.length.toString()
          }
        });
      }
    }, 1000);
  };

  const handleTimerEnd = () => {
    if (!timerStoppedRef.current && currentQIndexRef.current < questionsRef.current.length) {
      timerStoppedRef.current = true;
      stopTimerExternally.current?.();

      const question = questionsRef.current[currentQIndexRef.current];
      const correctIndex = question.options.indexOf(question.answer);

      const answerObj = {
        qText: question.qText,
        options: question.options,
        myAnswerIndex: -1,
        aCorrectIndex: correctIndex,
      };

      const updatedAnswers = [...myAnswersRef.current, answerObj];
      setMyAnswers(updatedAnswers);
      myAnswersRef.current = updatedAnswers;
      playLoseSound();
      moveToNextQuestion(answerObj, false);
    }
  };

  const handleOptionSelect = (index: number) => {
    if (userAnswered || currentQIndex >= questions.length) return;

    timerStoppedRef.current = true;
    stopTimerExternally.current();

    const question = questions[currentQIndex];
    const correctIndex = question.options.indexOf(question.answer);
    const isCorrect = index === correctIndex;

    setUserSelectionIndex(index);

    if (isCorrect) {
      playWinSound();
      setCorrectAnswers(prev => prev + 1);
    } else {
      playLoseSound();
    }

    const answerObj = {
      qText: question.qText,
      options: question.options,
      myAnswerIndex: index,
      aCorrectIndex: correctIndex,
    };
    setMyAnswers(prev => [...prev, answerObj]);

    BackgroundTimer.setTimeout(() => {
      setUserAnswered(true);
      setShowFeedback(true);
      moveToNextQuestion(answerObj, isCorrect);
    }, 1000);
  };

  const displayOptions = () => {
    if (questions.length === 0) return null;

    const question = questions[currentQIndex];
    const correctIndex = question.options.indexOf(question.answer);
    const windowWidth = Dimensions.get('window').width;
    const windowWidth90 = (windowWidth * 90) / 100;

    return (
      <View style={styles.optionWrapper}>
        {question.options.map((option: string, index: number) => {
          let imageSource = defaultOption;

          if (showFeedback) {
            if (index === correctIndex && userSelectionIndex !== -1) {
              imageSource = rightOption;
            } else if (index === userSelectionIndex) {
              imageSource = wrongOption;
            }
          }

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleOptionSelect(index)}
              activeOpacity={0.8}
              disabled={userAnswered}
            >
              <ImageBackground
                style={[styles.optionButton, { width: windowWidth90 }]}
                source={imageSource}
                resizeMode="contain"
              >
                <Text style={styles.optionText}>{option}</Text>
              </ImageBackground>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ImageBackground source={appBackground} resizeMode="cover" style={{ width: '100%', height: '100%' }}>
        <View style={{ flex: 1 }}>
          <QuizHeader
            currentQIndex={currentQIndex}
            totalQuestions={questions.length}
            maxTime={10}
            userAnswered={userAnswered}
            onTimerEnd={handleTimerEnd}
            stopExternalTimerCallback={(stopFunc: () => void) => stopTimerExternally.current = stopFunc}
          />
          <ScrollView style={{ flex: 1 }}>
            {questions.length > 0 && (
              <>
                <QuizBody
                  qText={questions[currentQIndex].qText}
                  qImgUrl={questions[currentQIndex].image}
                />
                {displayOptions()}
              </>
            )}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  optionWrapper: {
    alignItems: 'center',
    marginTop: 20,
  },
  optionButton: {
    height: 80,
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    fontFamily: 'WendyOneRegular',
    fontSize: 18,
    color: '#792305',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});