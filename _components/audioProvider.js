import React, { createContext, useContext, useEffect, useState } from 'react';
import { Audio } from 'expo-av';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [songObj, setSongObj] = useState(null);
  const [albumImg, setAlbumImg] = useState("https://cdn.creazilla.com/cliparts/3486515/album-cover-with-notes-01-clipart-md.png");

  // const play = async (obj) => {
  //   console.log(currentTrack)
  //   console.log(obj.audio)

  //   if ( songObj !== null && currentTrack) {
      
  //     await sound.playAsync();
  //     setIsPlaying(true);
  //   }
  //   else{
  //     if(sound !== null){   await sound.unloadAsync();}
  //     setSongObj(obj)
  //     setCurrentTrack(obj.audio)
      
  //     const { sound: newSound } = await Audio.Sound.createAsync({ uri: obj.audio });
  //     setSound(newSound);
  //     // setCurrentTrack(url);
  //     await newSound.playAsync();
  //     setIsPlaying(true);
  //   }
   
  // };

  const play = async (obj) => {
    console.log('Current Track:', currentTrack);
    console.log('New Track:', obj.audio);
    console.log(obj)
  
    if (currentTrack === obj.audio) {
      // If the current track is the same as the new track, just play it
      if (sound) {
        await sound.playAsync();
        setIsPlaying(true);
      }
     
    }
    else if (!obj.audio) {
      await sound.playAsync();
      return;
    }
     else {
      // If the current track is different from the new track, unload the current track and load the new track
      if (sound) {
        await sound.unloadAsync();
      }
      setSongObj(obj);
      setCurrentTrack(obj.audio);
  
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: obj.audio });
      setSound(newSound);
  
      await newSound.playAsync();
      setIsPlaying(true);
  
      // Monitor playback status
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          console.log('Playback Finished');
          setIsPlaying(false);
        }
      });
    }
  };
  

  const pause = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };
  useEffect(() => {
    return () => {
      if (sound) {
        console.log("Unloading Sound...");
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <AudioContext.Provider value={{ play, pause, isPlaying, setIsPlaying, songObj, setSongObj, albumImg, setAlbumImg}}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);