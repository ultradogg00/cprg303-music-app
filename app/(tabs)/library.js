import { Button, Image, Pressable, ScrollView, StyleSheet, Text, Touchable, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import BottomMusicPlayer from '../../_components/bottomMusicPlayer'
import { TouchableWithoutFeedback } from 'react-native'
import { router } from 'expo-router'
const data = [
  {  type: "album",name: "Sky Dragons", imageUrl: "https://usercontent.jamendo.com?type=album&id=573197&width=300" ,id:"573197",favorite: true, },
  {  type: "album",name: "EL ARTE DE AMAR- BOSSA NOVA", imageUrl: "https://usercontent.jamendo.com?type=album&id=589582&width=300" ,id:"589582",favorite: false,},
  {  type: "album",name: "i-motions - EP", imageUrl: "https://usercontent.jamendo.com?type=album&id=472284&width=300", id:"472284",favorite: true, },
  {  type: "album",name: "Metal Butterfiles ", imageUrl: "https://usercontent.jamendo.com?type=album&id=188568&width=300",id:"188568",favorite: false, },
  {  type: "album",name: "MainStay", imageUrl: "https://usercontent.jamendo.com?type=album&id=195682&width=300", id:"195682",favorite: true, },
  { type: "album",name: "ShiHo", imageUrl: "https://usercontent.jamendo.com?type=album&id=156519&width=300",id:"156519",favorite: false,},
  { type: "album",name: "New To You", imageUrl: "https://usercontent.jamendo.com?type=album&id=184380&width=300",id:"184380",favorite: false,},
]


const Library = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [filteredData, setFilteredData] = useState(data);

  function selectAllTab() {
    setSelectedTab("all");
    setFilteredData(data);
  }

  function selectAlbumsTab() {
    setSelectedTab("albums");
    setFilteredData(data.filter((musicCollection) => {return musicCollection.type == "album"}));
  }

  function selectPlaylistsTab() {
    setSelectedTab("playlists");
    setFilteredData(data.filter((musicCollection) => {return musicCollection.type == "playlist"}));
  }

  function selectFavoritesTab() {
    setSelectedTab("favorites");
    setFilteredData(data.filter((musicCollection) => {return musicCollection.favorite}))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitleText}>Library</Text>
      <View style={styles.tabContainer}>
        <Pressable onPress={selectAllTab}>
          <Text style={selectedTab == "all" ? styles.selectedTab : styles.unselectedTab}>
            All
          </Text>
        </Pressable>
        {/* <Pressable onPress={selectAlbumsTab}>
          <Text style={selectedTab == "albums" ? styles.selectedTab : styles.unselectedTab}>
            Albums
          </Text>
        </Pressable> */}
        {/* <Pressable onPress={selectPlaylistsTab}>
          <Text style={selectedTab == "playlists" ? styles.selectedTab : styles.unselectedTab}>
            Playlists
          </Text>
        </Pressable> */}
        <Pressable onPress={selectFavoritesTab}>
          <Text style={selectedTab == "favorites" ? styles.selectedTab : styles.unselectedTab}>
            Favorites
          </Text>
        </Pressable>
      </View>
      <ScrollView style={{paddingTop: 20, paddingRight: 20, paddingLeft: 20, display: "flex", marginBottom:5}}>
        {
          filteredData.map((musicCollection) => {
            if (musicCollection.type == "playlist") {
              return (
                <View  key={musicCollection.id}>
                   <TouchableOpacity  style={styles.musicCollectionContainer}   onPress={() => router.push(`details/${musicCollection.id}`)}>
                    <Image source={{uri:musicCollection.imageUrl}} style={styles.musicCollectionImage}/>
                    <View style={styles.musicCollectionTextContainer}>
                    <Text>{musicCollection.name}</Text>
                    <Text>Playlist</Text>
                    
                  </View>
                  </TouchableOpacity>
                </View>
              )
            }
            else if (musicCollection.type == "album") {
              return (
                <View  key={musicCollection.id}>
                   <TouchableOpacity  style={styles.musicCollectionContainer}   onPress={() => console.dir(router.push(`details/${musicCollection.id}`))}>
                    <Image source={{uri:musicCollection.imageUrl}} style={styles.musicCollectionImage}/>
                    <View style={styles.musicCollectionTextContainer}>
                    <Text>{musicCollection.name}</Text>
                    <Text>Album</Text>
                  </View>
                  </TouchableOpacity>
                </View>
              )
            }
          })
        }
      </ScrollView>
      <BottomMusicPlayer/>
    </View>
  )
}

export default Library

const styles = StyleSheet.create({
  container: {display: "flex", flex: 1, marginTop: 50},
  tabContainer: {display: "flex", flexDirection: "row", paddingLeft: 20},
  pageTitleText: {fontSize: 30, fontWeight: "bold", padding: 20},
  unselectedTab: {fontSize: 18, fontWeight: "semibold", paddingBottom: 5, paddingHorizontal: 12,},
  selectedTab: {fontSize: 18, fontWeight: "semibold", paddingBottom: 5, paddingHorizontal: 12, color: "rebeccapurple", borderBottomWidth: 3, borderBottomColor: "rebeccapurple"},
  musicCollectionContainer: {display: "flex", flexDirection: "row", marginBottom: 15},
  musicCollectionImage: {height: 75, width: 75, backgroundColor: "red"},
  musicCollectionTextContainer: {flex: 1, display: "flex", justifyContent: "center", backgroundColor: "#C69AFF", width: "auto", padding: 10, borderTopRightRadius: 10, borderBottomRightRadius: 10}
})