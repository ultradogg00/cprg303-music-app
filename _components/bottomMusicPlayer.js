import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import React from 'react'
import { useContext } from 'react';
import { useAudio } from './audioProvider';

const BottomMusicPlayer = () => {
    const { play, pause,  isPlaying, setIsPlaying, songObj, setSongObj,albumImg } = useAudio();

    const HandlePlayPause =(obj) =>{
        console.log(isPlaying)
        if(!isPlaying){
          play(obj)
          setIsPlaying(true)
        }
        else{
            pause();
            setIsPlaying(false)
        }
    }
    
    if (!songObj) 
    {
      return null;
    }

  return (
      <View style={styles.musicPlayerContainer}>
          <Image
          //   source={{ uri: songObj.album_image }}
              source={{ uri: albumImg }}
              style={styles.playerImage}
          />
          <Text style={styles.songTitle} numberOfLines={1}>
              {songObj.name}
          </Text>
          <TouchableOpacity onPress={HandlePlayPause} style={styles.playButton}>
              <Image
                  source={{
                      uri: isPlaying
                          ? "https://img.icons8.com/ios-filled/50/pause--v1.png"
                          : "https://img.icons8.com/ios-filled/50/play--v1.png",
                  }}
                  style={styles.playIcon}
              />
          </TouchableOpacity>
      </View>
  );
};

export default BottomMusicPlayer;

const styles = StyleSheet.create({
  musicPlayerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 15,
      paddingVertical: 6,
      backgroundColor: "#31006F",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      // Shadow effect
      shadowColor: "grey",
      shadowOffset: { height: -5 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 5,
  },
  playerImage: {
      width: 50,
      height: 50,
      borderRadius: 5,
  },
  songTitle: {
      fontSize: 16,
      flex: 1,
      marginLeft: 10,
      color: "white",
  },
  playButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#C69AFF',
      justifyContent: 'center',
      alignItems: 'center',
  },
  playIcon: {
      width: 25,
      height: 25,
  },
});