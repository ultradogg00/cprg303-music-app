

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const bottomMusicPlayer = ({songObj}) => {
  return (
    <View style={styles.musicPlayerContainer}>
    <Image
      source={{ uri: songObj.album_image }}
      style={styles.playerImage}
    />
    <Text style={styles.songTitle}>{songObj.name}</Text>
    <TouchableOpacity onPress={isPlaying ? pause : play}>
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
  )
}

export default bottomMusicPlayer


const styles = StyleSheet.create({

  
    musicPlayerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 15,
      paddingVertical: 6,
      backgroundColor: "#C69AFF",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      //shadow effect
      shadowColor: "grey",
      shadowOffset: { height: -3 },
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
    },
  
    playIcon: {
      width: 25,
      height: 25,
    }
})