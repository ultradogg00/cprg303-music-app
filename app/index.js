import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { addToPlayList, getPlayLists, getSong } from './_components/service';

export default function App() {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioUrl = 'https://prod-1.storage.jamendo.com//?trackid=887202&format=ogg&from=app-devsite';

  // Function to load and play sound
  async function play() {
    try {
      if (sound) {
        // Resume playback if sound is already loaded
        await sound.playAsync();
        setIsPlaying(true);
      } else {
        console.log('Loading Sound...');
        const { sound } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: true } // Auto play after loading
        );
        setSound(sound);
        setIsPlaying(true);

        // Monitor playback status
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            console.log('Playback Finished');
            setIsPlaying(false);
          }
        });
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }

  // Function to pause the sound
  async function pause() {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  }

  // Clean up the sound when the component unmounts
  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound...');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Audio Player</Text>
      <View style={styles.buttons}>
        {!isPlaying ? (
          <Button title="Play" onPress={play}  />
        ) : (
          <Button title="Pause" onPress={pause} />
        )}
        <Button title='test' onPress={getPlayLists}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});
