import { Pressable, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import BottomMusicPlayer from '../../_components/bottomMusicPlayer';

const AlbumSongs = () => {
  const {albumID} = useLocalSearchParams();
  const router = useRouter();
  return (
    <View>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons style={styles.backArrow} name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
      <Text>{albumID}</Text>
      <BottomMusicPlayer/>
    </View>
  )
}

export default AlbumSongs

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backArrow :{
    marginTop: 10,
    marginLeft:10
  }

})