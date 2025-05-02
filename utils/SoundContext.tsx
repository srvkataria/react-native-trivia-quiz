import React, { createContext, useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';
import { defaultSoundOn } from '../quizConfig';

interface SoundContextType {
  isPlaying: boolean;
  toggleSound: () => void;
  playWinSound: () => void;
  playLoseSound: () => void;
}

export const SoundContext = createContext<SoundContextType>({
  isPlaying: false,
  toggleSound: () => {},
  playWinSound: () => {},
  playLoseSound: () => {},
});

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/quiz.mp3'),
        { isLooping: true, volume: 1.0 }
      );
      soundRef.current = sound;
      if (defaultSoundOn) {
        await sound.playAsync();
        setIsPlaying(true);
      }
    };

    loadSound();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const toggleSound = async () => {
    if (!soundRef.current) {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/quiz.mp3'),
        { isLooping: true, volume: 1.0 }
      );
      soundRef.current = sound;
      await sound.playAsync();
      setIsPlaying(true);
    } else {
      const status = await soundRef.current.getStatusAsync();
      if (status.isLoaded) {
        if (status.isPlaying) {
          await soundRef.current.pauseAsync();
          setIsPlaying(false);
        } else {
          await soundRef.current.playAsync();
          setIsPlaying(true);
        }
      }
    }
  };

  const playWinSound = async () => {
    if (!isPlaying) return;
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/win.wav')
    );
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status && 'isPlaying' in status && !status.isPlaying) {
        sound.unloadAsync();
      }
    });
  };

  const playLoseSound = async () => {
    if (!isPlaying) return;
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/lose.wav')
    );
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status && 'isPlaying' in status && !status.isPlaying) {
        sound.unloadAsync();
      }
    });
  };

  return (
    <SoundContext.Provider value={{ isPlaying, toggleSound, playWinSound, playLoseSound }}>
      {children}
    </SoundContext.Provider>
  );
};
