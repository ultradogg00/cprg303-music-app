import { Image, Pressable, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import BottomMusicPlayer from '../../_components/bottomMusicPlayer';
import { getApiAlbum } from '../../_components/service';
import { useAudio } from '../../_components/audioProvider';
import { Sound } from 'expo-av/build/Audio';

const AlbumSongs = () => {
  const {albumID} = useLocalSearchParams();
  const [songs,setSongs] =useState([]);
  const [albumInfo,setAlbumInfo] = useState(null);
  const { play, pause,  isPlaying, setIsPlaying, currentTrack } = useAudio();



  async function getAlbum() {
    const results = await getApiAlbum(albumID);
    // console.log(results)
    setSongs(results[0].tracks);
    setAlbumInfo(results[0]);
  }

 const HandlePlayPause =(url) =>{
        console.log(isPlaying)
          play(url)
          setIsPlaying(true)
        
    }

  useEffect( () =>{
    getAlbum();
    console.dir(albumInfo)
    console.dir(songs)
  },[albumID]

  )
  const router = useRouter();
  return (
    <View>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons style={styles.backArrow} name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
      {albumInfo !== null ?
     (<View>
        <Image source={{ uri: albumInfo.image }} style={styles.cardImage} />
        <Text style={styles}>{albumInfo.name}</Text>
      </View>) : (
      <Text> Loading....</Text>)
      }
    

      <View>
        <ScrollView>
          {songs.map((song ) => (
            <TouchableOpacity key={song.id} style={{}} onPress={() => HandlePlayPause(song.audio)} >
               <Text>{song.name}</Text>
              </TouchableOpacity>)
              )
              }
              

        </ScrollView>
      </View>
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
  },
  cardImage: {
    width: 60,
    height: 60,
    marginRight: 6,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },

})