import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BottomMusicPlayer from '../_components/bottomMusicPlayer'
import { useNavigation } from 'expo-router'

const Library = () => {

  const navigation = useNavigation();
  return (
    <View>
      
      <Text>Library page</Text>
      <BottomMusicPlayer/>
    </View>
  )
}

export default Library

const styles = StyleSheet.create({})