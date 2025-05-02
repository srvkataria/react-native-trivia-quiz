import { Text, View, TouchableWithoutFeedback, Image, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import GameModeButton from '../components/GameModeButton';
import SoundButton from '../components/SoundButton';

import React, { useContext } from 'react';
import { SoundContext } from '../utils/SoundContext';

const appBackground = require('@/assets/images/appBackground.png')
const logoBackground = require('@/assets/images/home/logoBackground.png')
const logoPropImg = require('@/assets/images/home/logoProp.png')
const actionButtonImg = require('@/assets/images/home/actionButton.png');
const actionButtonPropImg = require('@/assets/images/home/actionButtonProp.png');

const singlePlayerIcon = require('@/assets/images/icons/singlePlayerIcon.png');
const challengeIcon = require('@/assets/images/icons/challengeIcon.png');
const firendsIcon = require('@/assets/images/icons/firendsIcon.png');
const worldIcon = require('@/assets/images/icons/worldIcon.png');

export default function index() {
  const { playWinSound, playLoseSound } = useContext(SoundContext);
  const handlePlaySolo = () => {
    router.push('/quizSingle');
  };

  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <TouchableWithoutFeedback>
        <ImageBackground source={appBackground} resizeMode="cover" style={{width: '100%', height: '100%'}}>
          <View style={{flex: 1, marginTop: 50, display: 'flex', alignItems: 'center', width: '100%'}}>
            <ImageBackground
              style={{width: '100%', height: 220}}
              source={logoBackground}
              resizeMode="contain"
            >
              <View style={styles.bannerBox}>
                <View style={styles.bannerText}>
                  <Text style={styles.bannerText_1}>Trivia Guru</Text>
                  <Text style={styles.bannerText_2}>Multiplayer Quiz Game</Text>
                </View>
                <View style={{flex: 2, paddingRight: 20}}>
                  <Image
                    style={{width: '100%'}}
                    source={logoPropImg}
                    resizeMode="contain"
                  />
                </View>
              </View>  
            </ImageBackground>
           
            <TouchableOpacity onPress={handlePlaySolo} style={{paddingTop: 40, width: '85%'}}>
              <GameModeButton
                label1="Play Solo"
                label2="Train your brain"
                modeIcon={singlePlayerIcon}
                backgroundImage={actionButtonImg}
                iconBgImage={actionButtonPropImg}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePlaySolo} style={{paddingTop: 10, width: '85%'}}>
              <GameModeButton
                label1="1x1 Challenge"
                label2="Duel a random opponent online"
                modeIcon={challengeIcon}
                backgroundImage={actionButtonImg}
                iconBgImage={actionButtonPropImg}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePlaySolo} style={{paddingTop: 10, width: '85%'}}>
              <GameModeButton
                label1="Friends Match"
                label2="Invite and play together"
                modeIcon={firendsIcon}
                backgroundImage={actionButtonImg}
                iconBgImage={actionButtonPropImg}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePlaySolo} style={{paddingTop: 10, width: '85%'}}>
              <GameModeButton
                label1="Group Battle"
                label2="Join random players online"
                modeIcon={worldIcon}
                backgroundImage={actionButtonImg}
                iconBgImage={actionButtonPropImg}
              />
            </TouchableOpacity>
          </View> 
          <View style={{position: 'absolute', bottom: 30, right: 30}}>
            <SoundButton/>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  bannerBox: {
    display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1
  },
  bannerText: {
    flex: 3, marginLeft: 10, paddingLeft: 0, paddingRight: 0, alignItems: 'center'
  },
  bannerText_1: {
    fontFamily: 'WendyOneRegular', fontSize: 30, color: '#054B4A'
  },
  bannerText_2: {
    fontFamily: 'PoppinsRegular', fontSize: 26, fontWeight: 'bold', marginTop: 5, color: '#054B4A', paddingLeft: 30, paddingRight: 30
  },
});
