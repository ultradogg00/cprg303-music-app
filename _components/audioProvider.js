"use client";
import { createContext, useEffect, useState, useContext } from 'react';
import { Audio } from 'expo-av';

const AudioContext = createContext();

const AudioProvider = ({ children }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [song, setSong] = useState(null)

  async function play(songUrl) {
    console.dir(isPlaying)
    try {
      if (sound) {
        await sound.playAsync();
        setIsPlaying(true);
      } else {
        console.log("Loading Sound...");
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: songUrl },
          { shouldPlay: true }
        );
        setSound(newSound);
        setIsPlaying(true);
        setCurrentTrack(songUrl);

        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            console.log("Playback Finished");
            setIsPlaying(false);
          }
         
        });
      }
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  }

  async function pause() {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
    // else(
    //   console.log('not sound')
    // )
  }

  useEffect(() => {
    return () => {
      if (sound) {
        console.log("Unloading Sound...");
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <AudioContext.Provider value={{ play, pause, isPlaying, setIsPlaying, currentTrack, song,setSong }}>
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;

export const useAudio = () => {
  return useContext(AudioContext);
};
