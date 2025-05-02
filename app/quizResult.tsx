import React, { useEffect }  from 'react';
import { View, Text, ImageBackground, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity, BackHandler } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

const appBackground = require('@/assets/images/appBackground.png');
const defaultOption = require('@/assets/images/common/defaultOption.png');
const rightOption = require('@/assets/images/common/rightOption.png');
const wrongOption = require('@/assets/images/common/wrongOption.png');
const scoreHeader = require('@/assets/images/common/scoreHeader.png');
const scoreHeaderLine = require('@/assets/images/common/scoreHeaderLine.png');
const counter = require('@/assets/images/common/counter.png');
const modalActionButton = require('@/assets/images/common/modalActionButton.png');

export default function QuizResultScreen() {
  const { answers, correctAnswers, totalQuestions } = useLocalSearchParams();
  const parsedAnswers = JSON.parse(answers as string);
  const scorePercent = ((Number(correctAnswers) / Number(totalQuestions)) * 100).toFixed(2);
  const windowWidth = Dimensions.get('window').width;
  const windowWidth85 = (windowWidth * 85) / 100;

  useEffect(() => {
    const backAction = () => true; // Prevent default behavior
  
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
  
    return () => backHandler.remove(); // cleanup
  }, []);
  
  const renderAnswers = () => {
    return parsedAnswers.map((q, index) => {
      const options = q.options.map((opt, i) => {
        const isSelected = i === q.myAnswerIndex;
        const isCorrect = q.myAnswerIndex !== -1 && i === q.aCorrectIndex;
        let bg = defaultOption;
        if (q.myAnswerIndex !== -1) {
          if (isSelected && isCorrect) bg = rightOption;
          else if (isSelected) bg = wrongOption;
        }

        return (
          <ImageBackground key={i} source={bg} style={styles.optionBg} resizeMode="contain">
            <Text style={styles.optionText}>{opt}</Text>
          </ImageBackground>
        );
      });

      return (
        <View key={index} style={styles.answerBlock}>
          <View style={styles.questionMeta}>
            <ImageBackground source={counter} style={styles.counterBox} resizeMode="contain">
              <Text style={styles.counterText}>{index + 1}</Text>
            </ImageBackground>
            <View style={styles.qTextWrapper}>
              <Text style={styles.qText}>{q.qText}</Text>
              <Text style={styles.correctAnswer}>Correct Answer: {q.options[q.aCorrectIndex]}</Text>
            </View>
          </View>
          <View style={styles.optionsContainer}>{options}</View>
        </View>
      );
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ImageBackground source={appBackground} resizeMode="cover" style={{ width: '100%', height: '100%' }}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.scoreContainer}>
            <ImageBackground source={scoreHeader} style={[styles.headerBox, { width: windowWidth85 }]} resizeMode="contain">
              <View style={styles.scoreInnerBox}>
                <View style={styles.scoreItem}>
                  <Text style={styles.scoreValue}>{scorePercent}%</Text>
                  <Text style={styles.scoreLabel}>Your Score</Text>
                </View>
                <View style={styles.scoreItem}>
                  <Text style={styles.scoreValue}>{correctAnswers}/{totalQuestions}</Text>
                  <Text style={styles.scoreLabel}>Correct Answers</Text>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.titleBox}>
            <Text style={styles.scoreTitle}>Scoreboard</Text>
            <Image source={scoreHeaderLine} style={styles.lineImage} resizeMode="contain" />
          </View>
          {renderAnswers()}

          <View style={styles.lobbyButtonContainer}>
            <TouchableOpacity onPress={() => router.replace('/')}> 
              <ImageBackground source={modalActionButton} style={styles.lobbyBtn} resizeMode="contain">
                <Text style={styles.lobbyBtnText}>Go to Lobby</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 40
  },
  scoreContainer: {
    marginTop: 20,
  },
  headerBox: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreInnerBox: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreItem: {
    alignItems: 'center',
    margin: 15
  },
  scoreValue: {
    fontFamily: 'WendyOneRegular',
    fontSize: 25,
    color: '#792305',
  },
  scoreLabel: {
    fontFamily: 'PoppinsRegular',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#792305'
  },
  titleBox: {
    marginTop: 20,
    alignItems: 'center',
  },
  scoreTitle: {
    fontFamily: 'WendyOneRegular',
    fontSize: 35,
    color: '#fff',
  },
  lineImage: {
    width: 100,
    height: 30,
  },
  answerBlock: {
    marginVertical: 10,
    width: '90%',
  },
  questionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  counterBox: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    fontFamily: 'WendyOneRegular',
    fontSize: 25,
    color: '#fff',
  },
  qTextWrapper: {
    marginLeft: 10,
    flex: 1,
  },
  qText: {
    fontFamily: 'PoppinsRegular',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#fff',
  },
  correctAnswer: {
    fontFamily: 'PoppinsRegular',
    fontSize: 14,
    color: '#6add6c',
  },
  optionsContainer: {
    alignItems: 'center',
  },
  optionBg: {
    width: '100%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  optionText: {
    fontFamily: 'WendyOneRegular',
    fontSize: 18,
    color: '#792305',
  },
  lobbyButtonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  lobbyBtn: {
    width: 230,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lobbyBtnText: {
    fontFamily: 'WendyOneRegular',
    fontSize: 24,
    color: '#fff',
  },
});