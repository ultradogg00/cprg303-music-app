import { Image, Pressable, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, useGlobalSearchParams, useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import BottomMusicPlayer from '../../_components/bottomMusicPlayer';
import { getApiAlbum } from '../../_components/service';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground } from 'react-native';
import { useAudio } from '../../_components/audioProvider';
import { Sound } from 'expo-av/build/Audio';

const AlbumSongs = ({params}) => {
  const navigator = useNavigation();
  const { albumID } = useGlobalSearchParams();
  console.dir(albumID)
  const [songs,setSongs] =useState([]);
  const [albumInfo,setAlbumInfo] = useState(null);
  const { play, pause,  isPlaying, setIsPlaying, currentTrack ,albumImg, setAlbumImg } = useAudio();



  async function getAlbum() {
    try {
      const results = await getApiAlbum(albumID);
      if (results && results.length > 0) {
        setSongs(results[0].tracks || []);
        
        setAlbumInfo(results[0]);
      } else {
        console.error('No album data found');
      }
    } catch (error) {
      console.error('Error fetching album data:', error);
    }
  }

 const HandlePlayPause =(obj) =>{

        setAlbumImg(albumInfo.image)
          play(obj)
          // setIsPlaying(true)
        
    }
    

  useEffect( () =>{
    getAlbum();
    console.dir(albumInfo)
    console.dir(songs)
    console.dir(params)
  },[albumID]

  )
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Header */}
      <ImageBackground
        source={{ uri: albumInfo?.image }}
        style={styles.headerImage}
        resizeMode="cover"
      >
        
        {/* Header Gradient */}
        <LinearGradient colors={['rgba(0,0,0,0.8)', 'transparent']} style={styles.headerGradient}>
          {albumInfo !== null ? (
            <View style={styles.headerContent}>
              <View style={styles.albumImageContainer}>
                <Image source={{ uri: albumInfo.image }} style={styles.albumImage} />
              </View>
            </View>
          ) : (
            <Text>Loading....</Text>
          )}
        </LinearGradient>
        <LinearGradient colors={['transparent', '#31006F']} style={styles.fadeGradient} />
      </ImageBackground>

      {/* Album Header Name */}
      {albumInfo !== null && (
        <View style={styles.albumHeaderContainer}>
          <Text style={styles.headerText}>{albumInfo.name}</Text>
        </View>
      )}

      {/* Back button */}
      <TouchableOpacity onPress={() => navigator.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>

      {/* Gradiant for song list*/}
      <LinearGradient colors={['#31006F', 'transparent']} style={styles.contentGradient}>
        {/* Songs */}
        <ScrollView style={styles.songsContainer}>
          {songs.map((song) => (
            <TouchableOpacity key={song.id} style={styles.songItem} onPress={() => HandlePlayPause(song)}>
              <View style={styles.songDetails}>
                <Text style={styles.songName}>{song.name}</Text>
                <Text style={styles.songArtist}>{song.artist}</Text>
              </View>
              <Ionicons name="play-circle" size={30} color="#fff" />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Bottom Music Player */}
        <BottomMusicPlayer />
      </LinearGradient>
    </View>
  );
};

export default AlbumSongs

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerImage: {
    width: '100%',
    height: 280,
  },

  headerGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },

  fadeGradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 100,
  },

  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    padding: 10
  },

  headerContent: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },

  albumImageContainer: {
    width: 150,
    height: 150,
    marginBottom: 10,
    shadowColor: '#31006F',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 2,
    shadowRadius: 50,
    elevation: 10,
  },

  albumImage: {
    width: '100%',
    height: '100%',
    marginTop: 25,
  },

  albumHeaderContainer: {
    position: 'absolute',
    marginTop: 230,
    width: '100%',
    alignItems: 'center',
  },

  headerText: {
    fontSize: 28, 
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    textShadowColor: '#31006F', 
    textShadowOffset: { width: -5, height: 5 },
    textShadowRadius: 10,
  },

  contentGradient: {
    flex: 1,
  },

  songsContainer: {
    padding: 20,
  },

  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#110021',
    padding: 12,
    borderRadius: 8,
    marginBottom: 5,
  },

  songDetails: {
    flexDirection: 'column',
  },

  songName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  songArtist: {
    color: 'white',
    fontSize: 14,
  },

});