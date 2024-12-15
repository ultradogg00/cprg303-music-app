"use client"
import { Image, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SearchBar } from '@rneui/themed'
import BottomMusicPlayer from '../../_components/bottomMusicPlayer'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { searchSongByName } from '../../_components/service'
import { useAudio } from '../../_components/audioProvider'

const Search = () => {
  const [search,setSearch] = useState("");
  const [songList,setSongList] = useState([])
  const { play, pause,  isPlaying, setIsPlaying, currentTrack ,albumImg, setAlbumImg } = useAudio();

  const updateSearch = (search) => {
    setSearch(search);
  };


  async function handleSearch() {
    let allSongs = await searchSongByName(search)
    console.dir(allSongs);
    setSearch("")
    setSongList(allSongs)
  } 






 const HandlePlayPause =(obj) =>{

        setAlbumImg(obj.image)
        // console.dir(obj.image)
        play(obj.tracks[0])
        // console.dir(obj.tracks[0])
        // setIsPlaying(true)
        
    }
    
  return (
    <View>
     
      <ScrollView>
      <Text>Search</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <SearchBar  placeholder="Enter a song title..."
          onChangeText={updateSearch}
          lightTheme={true}
          containerStyle={{ flex: 1 }}
          

          value={search}/>
          <TouchableOpacity onPress={handleSearch} style={{ marginLeft: 2 }}>
            <EvilIcons name="search" size={30} color="black" />
          </TouchableOpacity>
        
      </View>
        
        <View>
          <ScrollView>
            {songList.length === 0 ? <Text>Please enter a song/No song with that name was found</Text> : 
            songList.map((song) => (
            <TouchableOpacity key={song.id} style={{flex:1}} onPress={() => HandlePlayPause(song)}>
               <Image source={{uri :song.image}} />
              <View style={{}}>
                <Text style={styles.songName}>{song.tracks[0].name}</Text>
                <Text style={styles.songArtist}>{song.artist_name}</Text>
              </View>
              
            </TouchableOpacity>))
            }

          </ScrollView>
        </View>

        <BottomMusicPlayer/>
      </ScrollView>
      
    </View>
  )
}

export default Search

const styles = StyleSheet.create({})