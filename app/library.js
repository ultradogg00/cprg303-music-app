import { Button, Image, ScrollView, StyleSheet, Text, Touchable, TouchableHighlight, View } from 'react-native'
import React, { useState } from 'react'
import BottomMusicPlayer from '../_components/bottomMusicPlayer'
import { TouchableWithoutFeedback } from 'react-native'

const data = [
  {
    type: "playlist",
    name: "Jazz Music",
    imageUrl: "https://cdn.vox-cdn.com/thumbor/6kLvmWfhU4h64EhC0S6tsn714fI=/0x0:4032x3024/1200x900/filters:focal(1694x1190:2338x1834)/cdn.vox-cdn.com/uploads/chorus_image/image/59740845/IMG_1503.42.jpg",
    favorite: false
  },
  {
    type: "playlist",
    name: "Your Daily Mix",
    imageUrl: "https://t3.ftcdn.net/jpg/05/01/52/36/360_F_501523654_iTeRiR15SpnekpBQCWf11sip7THqF5oU.jpg",
    favorite: false,
  },
  {
    type: "album",
    artist: "XXXTentacion",
    name: "LOOK AT ME: THE ALBUM",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/5/57/XXXTentacion_Look_at_Me_album_cover.jpg",
    favorite: true,
  },
  {
    type: "playlist",
    name: "Lo-Fi Beats",
    imageUrl: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5d4a1685-9933-4c49-829c-8e298fef2f89/dfr878n-6096a1e4-f93a-4dd2-97fc-3f10dd8b3512.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzVkNGExNjg1LTk5MzMtNGM0OS04MjljLThlMjk4ZmVmMmY4OVwvZGZyODc4bi02MDk2YTFlNC1mOTNhLTRkZDItOTdmYy0zZjEwZGQ4YjM1MTIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.NgEESb6KRKHEY18kDlch8hfbvY50eQsfaq1OMiTGNIE",
    favorite: true,
  },
  {
    type: "album",
    artist: "Justin Bieber",
    name: "Justice",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/0/08/Justin_Bieber_-_Justice.png",
    favorite: true
  },
  {
    type: "album",
    artist: "Burna Boy",
    name: "I Told Them...",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/d/da/Burna_Boy_-_I_Told_Them....png",
    favorite: false,
  },
  {
    type: "playlist",
    name: "Top New Songs",
    imageUrl: "https://unblast.com/wp-content/uploads/2023/04/Dynamic-Background-Designs-1.jpg",
    favorite: false,
  },
  {
    type: "album",
    artist: "Drake",
    name: "Take Care",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/a/ae/Drake_-_Take_Care_cover.jpg",
    favorite: false,
  },
  {
    type: "playlist",
    name: "Your Top Songs of 2024",
    imageUrl: "https://images.contentstack.io/v3/assets/blt4eb669caa7dc65b2/bltb0021bd6676cf2a5/65789b8333af83169424c628/2024-725.jpg",
    favorite: false,
  },
  {
    type: "album",
    artist: "Dominic Fike",
    name: "Sunburn",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/a/ac/Dominic_Fike_-_Sunburn.png",
    favorite: false
  },
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
      <ScrollView horizontal={true} style={{display: "flex"}} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={styles.tabContainer}>
          <TouchableWithoutFeedback onPress={selectAllTab}>
            <Text style={selectedTab == "all" ? styles.selectedTab : styles.unselectedTab}>
              All
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={selectAlbumsTab}>
            <Text style={selectedTab == "albums" ? styles.selectedTab : styles.unselectedTab}>
              Albums
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={selectPlaylistsTab}>
            <Text style={selectedTab == "playlists" ? styles.selectedTab : styles.unselectedTab}>
              Playlists
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={selectFavoritesTab}>
            <Text style={selectedTab == "favorites" ? styles.selectedTab : styles.unselectedTab}>
              Favorites
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
      <ScrollView style={{paddingTop: 50, paddingRight: 30, paddingLeft: 10, display: "flex"}}>
        {
          filteredData.map((musicCollection) => {
            if (musicCollection.type == "playlist") {
              return (
                <View style={styles.musicCollectionContainer}>
                  <Image source={musicCollection.imageUrl} style={styles.musicCollectionImage}/>
                  <View style={styles.musicCollectionTextContainer}>
                    <Text>{musicCollection.name}</Text>
                    <Text>Playlist</Text>
                  </View>
                </View>
              )
            }
            else if (musicCollection.type == "album") {
              return (
                <View style={styles.musicCollectionContainer}>
                  <Image source={musicCollection.imageUrl} style={styles.musicCollectionImage}/>
                  <View style={styles.musicCollectionTextContainer}>
                    <Text>{musicCollection.name}</Text>
                    <Text>{"Album - " + musicCollection.artist}</Text>
                  </View>
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
  unselectedTab: {fontSize: 20, fontWeight: "semibold", paddingBottom: 5, paddingHorizontal: 15},
  selectedTab: {fontSize: 20, fontWeight: "semibold", paddingBottom: 5, paddingHorizontal: 15, color: "rebeccapurple", borderBottomWidth: 3, borderBottomColor: "rebeccapurple"},
  musicCollectionContainer: {display: "flex", flexDirection: "row", marginBottom: 20},
  musicCollectionImage: {height: 75, width: 75, backgroundColor: "red"},
  musicCollectionTextContainer: {flex: 1, display: "flex", justifyContent: "center", backgroundColor: "#C69AFF", width: "auto", padding: 10, borderTopRightRadius: 10, borderBottomRightRadius: 10}
})