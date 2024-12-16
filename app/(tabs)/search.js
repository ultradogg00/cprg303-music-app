import { Image, ScrollView, StyleSheet, Text, Pressable, TouchableOpacity, View, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { searchSongByName, getApiAlbum } from '../../_components/service';
import { useAudio } from '../../_components/audioProvider';
import BottomMusicPlayer from '../../_components/bottomMusicPlayer';
import { data } from './library'; 
import { router } from 'expo-router';

const Search = () => {
  const [search, setSearch] = useState("");
  const [songList, setSongList] = useState([]);
  const [selectedTab, setSelectedTab] = useState('Recent');
  const [filteredData, setFilteredData] = useState([]);
  const [albumCovers, setAlbumCovers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const { play, pause, isPlaying, setIsPlaying, currentTrack, albumImg, setAlbumImg } = useAudio();

  const updateSearch = async (search) => {
    setSearch(search);
    if (search.trim() === '') {
      setShowResults(false);
      setFilteredData([]);
      return;
    }
    let allSongs = await searchSongByName(search);
    setSongList(allSongs);
    setFilteredData(allSongs);
    setShowResults(true);
  };

  const HandlePlayPause = (obj) => {
    setAlbumImg(obj.image);
    play(obj.tracks[0]);
  };

  const selectTab = (type) => {
    setSelectedTab(type);
    if (type === 'Recent') {
      setFilteredData(data.slice(0, 3)); 
    } else if (type === 'Top 50') {
      setFilteredData(data.slice(3, 6)); 
    } else if (type === 'Chill') {
      setFilteredData(data.slice(5, 9)); 
    } else if (type === 'R&B') {
      setFilteredData(data.slice(2, 5)); 
    }
  };

  useEffect(() => {
    selectTab(selectedTab);
  }, []);

  const clearSearch = () => {
    setSearch('');
    setFilteredData([]);
    setShowResults(false);
    selectTab(selectedTab); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>

          <Text style={styles.pageTitleText}>Search</Text>

          <View style={styles.searchBarContainer}>
            <EvilIcons name="search" size={24} color="black" style={styles.searchIcon} />
            <TextInput
              placeholder="Enter a song title..."
              placeholderTextColor="gray"
              value={search}
              onChangeText={updateSearch}
              style={styles.searchInput}
              onFocus={() => setShowResults(false)} // Hide results when search bar is focused
            />
            <TouchableOpacity onPress={clearSearch}>
              <EvilIcons name="close" size={24} color="black" style={styles.clearIcon} />
            </TouchableOpacity>
          </View>

          {showResults ? (
            <View>
              <ScrollView>
                {filteredData.length === 0 ? (
                  <Text style={styles.errorText}>Please enter a song/ No song with that name was found</Text>
                ) : (
                  filteredData.map((song) => (
                    <TouchableOpacity key={song.id} style={styles.songItem} onPress={() => HandlePlayPause(song)}>
                      <Image source={{ uri: song.image }} style={styles.songImage} />
                      <View style={styles.songInfo}>
                        <Text style={styles.songName}>{song.tracks[0].name}</Text>
                        <Text style={styles.songArtist}>{song.artist_name}</Text>
                      </View>
                    </TouchableOpacity>
                  ))
                )}
              </ScrollView>
            </View>
          ) : (
            <>

              {/* Tabs */}
              <View style={styles.tabsContainer}>
                {['Recent', 'Top 50', 'Chill', 'R&B'].map((tab, index) => (
                  <Pressable key={index} onPress={() => selectTab(tab)}>
                    <Text style={selectedTab === tab ? styles.selectedTab : styles.unselectedTab}>
                      {tab}
                    </Text>
                  </Pressable>
                ))}
              </View>

              {/* Tab Content */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScrollView}>
                {filteredData.map((item) => (
                  <TouchableOpacity key={item.id} style={styles.gridItem} onPress={() => router.push(`details/${item.id}`)}>
                    <Image
                      source={{ uri: item.imageUrl }}
                      style={styles.gridImage}
                    />
                    <Text style={styles.subtitle}>{item.artist}</Text>
                    <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Browse all Section */}
              <Text style={styles.sectionTitle}>Browse all</Text>
              <View style={styles.categoryContainer}>
                {[
                  { title: "2024 Wrapped", color: "#ABBB6D" },
                  { title: "Podcasts", color: "#223160" },
                  { title: "Country", color: "#75A768" },
                  { title: "Rock", color: "#8768A7" },
                  { title: "Pop", color: "#9854B2" },
                  { title: "Indie", color: "#678026" },
                  { title: "Popular Podcast", color: "#3371E4" },
                  { title: "Comedy", color: "#CF4321" },
                ].map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.categoryItem, { backgroundColor: item.color }]}
                  >
                    <Text style={styles.categoryText}>{item.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}
        </ScrollView>
      </View>
      <BottomMusicPlayer />
    </View>
  );
};
export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  content: {
    flex: 1,
  },

  pageTitleText: {
    fontSize: 30,
    fontWeight: "bold",
    padding: 20,
    marginTop: 50,
    marginBottom: -15,
  },

  scrollViewContent: {
    paddingBottom: 10,
  },

  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginVertical: 15,
    marginHorizontal: 20,
    marginTop: 5,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    paddingLeft: 10,
  },

  searchIcon: {
    marginRight: 10,
  },

  clearIcon: {
    marginLeft: 10,
  },

  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },

  songImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },

  songInfo: {
    marginLeft: 10,
    flex: 1,
  },

  songName: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  songArtist: {
    fontSize: 14,
    color: '#888',
  },

  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 15,
  },

  selectedTab: {
    fontSize: 18,
    fontWeight: 'semibold',
    paddingBottom: 5,
    paddingHorizontal: 12,
    color: 'rebeccapurple',
    borderBottomWidth: 3,
    borderBottomColor: 'rebeccapurple',
  },

  unselectedTab: {
    fontSize: 18,
    fontWeight: 'semibold',
    paddingBottom: 5,
    paddingHorizontal: 12,
  },

  horizontalScrollView: {
    marginVertical: 10,
    marginLeft: 10,
    marginRight: 10,
  },

  gridItem: {
    width: 160, 
    marginRight: 10, 
    marginLeft: 8,
  },

  gridImage: {
    width: 160, 
    height: 150,
    borderRadius: 10,
  },

  title: {
    fontSize: 14,
    fontWeight: "bold",
    flexWrap: "wrap",
    width: '100%',
  },

  subtitle: {
    fontSize: 12,
    color: "gray",
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10,
    marginBottom: 10,
  },

  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },

  categoryItem: {
    width: "48%",
    height: 80,
    borderRadius: 5,
    alignItems: "right",
    marginBottom: 10,
    padding: 18,
  },

  categoryText: {
    color: "white",
    fontWeight: "semi-bold",
    fontSize: 14,
  },

  errorText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
});
