'use client'
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { getSong } from "../_components/service";
import Slider from "@react-native-community/slider";
import BottomMusicPlayer from "../_components/bottomMusicPlayer";
export default function HomeScreen() {
  const [sound, setSound] = useState(null);

  // const [isPlaying, setIsPlaying] = useState(false);


  const audioUrl = "https://prod-1.storage.jamendo.com//?trackid=887202&format=ogg&from=app-devsite";
  const songObj = getSong(1532771)
  // Function to load and play sound
  async function play(songUrl) {
    // a songobj.audio will be passed
    const audioUrl = "https://prod-1.storage.jamendo.com//?trackid=887202&format=ogg&from=app-devsite";

    try {
      if (sound) {
        // Resume playback if sound is already loaded
        await sound.playAsync();
        setIsPlaying(true);
      } else {
        console.log("Loading Sound...");
        const { sound } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: true } // Auto play after loading
        );
        setSound(sound);
        setIsPlaying(true);

        // Monitor playback status
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            console.log("Playback Finished");
            setIsPlaying(false);
          }
        });
      }
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  }

  // Function to pause the sound
  async function pause() {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  }

  // Clean up the sound when the component unmounts
  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound...");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
    <ScrollView>
      {/* Header with Gradient */}
      <LinearGradient
        colors={[
          "rgba(51, 0, 255, 0.84)", 
          "rgba(151, 71, 255, 0.84)",
          "rgba(198, 154, 255, 0.84)",
          "rgba(215, 183, 255, 0.44)",
          "rgba(255, 255, 255, 0.00)" 
        ]}
        style={styles.headerContainer}
      >
        <View style={styles.headerContent}>

          <Image
            source={require("../assets/Screenshot-profilePic.png")}
            style={styles.profileImage}
          />

          <View style={styles.textContainer}>
            <Text style={styles.welcomeText}>Hello, Welcome Back!</Text>
            <Text style={styles.username}>.ASH.</Text>
          </View>

        </View>

        <View style={styles.headerIcons}>

          <TouchableOpacity>
            <Image
              source={{ uri: "https://img.icons8.com/ios-filled/50/000000/appointment-reminders.png" }}
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Image
              source={{ uri: "https://img.icons8.com/ios-filled/50/settings.png" }}
              style={styles.icon}
            />
          </TouchableOpacity>

        </View>
      </LinearGradient>

        {/* Content */}
        {/* Continue Listening Section */}
        <View style={[styles.sectionContainer, { marginTop: -140 }]}>
          <Text style={styles.sectionTitle}>Continue Listening</Text>

          <View style={styles.cardContainer}>
            {[
              { title: "Jazz Music", image: "https:\/\/usercontent.jamendo.com?type=artist&id=376782&width=300" },
              { title: "Newly Released", image: "https:\/\/usercontent.jamendo.com?type=album&id=404140&width=300&trackid=1532771" },
              { title: "Anything Goes", image: "https://usercontent.jamendo.com?type=album&id=145774&width=300&trackid=1214935" },
              { title: "Your Daily Mix", image: "https://usercontent.jamendo.com?type=album&id=24&width=300&trackid=169" },
              { title: "Harry's House", image: "https://usercontent.jamendo.com?type=album&id=477294&width=300&trackid=1932670" },
              { title: "Lo-Fi Beats", image: "https://usercontent.jamendo.com?type=album&id=144705&width=300&trackid=1204669" },
            ].map((item, index) => (

              <TouchableOpacity key={index} style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <Text style={styles.cardText}>{item.title}</Text>
              </TouchableOpacity>

            ))}
          </View>

        </View>

        {/* Recently Played Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recently Played</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.gridContainer}>
              {[
                { title: "In Tune (J. Glaze)", image: "https://usercontent.jamendo.com?type=album&id=139585&width=300&trackid=1161940" },
                { title: "You and Me", image: "https://usercontent.jamendo.com?type=album&id=138887&width=300&trackid=1157358" },
                { title: "Survive", image: "https://usercontent.jamendo.com?type=album&id=159568&width=300&trackid=1353511" },
              ].map((item, index) => (

                <View key={index} style={styles.gridItem}>
                  <Image source={{ uri: item.image }} style={styles.gridImage} />
                  <Text style={styles.gridText}>{item.title}</Text>
                </View>

              ))}
            </View>
          </ScrollView>
        </View>

        {/* Recommended For You Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recommended For You</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.gridContainerHorizontal}>
              {[
                { title: "Acoustic Guitar Playlist", subtitle: "Songs to enjoy your day with lovely acoustic sounds", image: "https://usercontent.jamendo.com?type=album&id=292101&width=300&trackid=1480482" },
                { title: "Top Hits Canada", subtitle: "Top songs trending in Canada", image: "https://usercontent.jamendo.com?type=album&id=140048&width=300&trackid=1165005" },
              ].map((item, index) => (
                <View key={index} style={styles.recommendCard}>
                  <Image source={{ uri: item.image }} style={styles.recommendImage} />

                  <View style={styles.recommendTextContainer}>
                  <Text style={styles.recommendSubtitle}>{item.subtitle}</Text>
                    <Text style={styles.recommendTitle}>{item.title}</Text>
                  </View>

                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>

      {/* Bottom Music Player */}
      {/* <View style={styles.musicPlayerContainer}>
        <Image
          source={{ uri: "https://usercontent.jamendo.com?type=album&id=404140&width=300&trackid=1532771" }}
          style={styles.playerImage}
        />
        <Text style={styles.songTitle}>Remember Me</Text>
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
      </View> */}
      <BottomMusicPlayer/>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  headerContainer: {
    paddingTop: 100,
    height: 300,
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25, 
    marginRight: 10,
    borderColor: "black",
    borderWidth: 2,
  },

  textContainer: {
    flex: 1,
  },

  welcomeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },

  username: {
    fontSize: 12,
    color: "#393939",
  },

  headerIcons: {
    flexDirection: "row",
    position: "absolute",
    top: 50,
    right: 20,
  },

  icon: {
    width: 20,
    height: 18,
    marginLeft: 18,
    marginTop: 7,
  },

  sectionContainer: {
    marginTop: 10,
    paddingHorizontal: 15,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  
  cardContainer: {
    flexDirection: "row",  
    flexWrap: "wrap",     
    justifyContent: "center", 
  },

  // card style for coninue listening
  card: {
    flexDirection: "row",
    backgroundColor: "#C69AFF",
    borderRadius: 10,
    paddingRight: 10,
    width: 170,
    margin: 5,
    alignItems: "center",
    justifyContent: "flex-start", 
  },
  
  // Image in the card
  cardImage: {
    width: 60,
    height: 60,
    marginRight: 6,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },
  
  // Text in the card
  cardText: {
    fontSize: 10,
    color: "white",
    fontWeight: "bold",     
    flexShrink: 1,          
  },

  gridContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  gridItem: {
    alignItems: "center",
    marginRight: 10,
  },

  gridImage: {
    width: 150,
    height: 150,
  },

  gridText: {
    marginTop: 5,
    fontSize: 14,
  },

  gridContainerHorizontal: {
    flexDirection: "row",
  },

  recommendCard: {
    flex: 1,
    marginRight: 10,
    marginBottom: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    height: 330,
    width: 220,
    //create a shadow effect
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5, 
  },

  recommendImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },

  recommendTextContainer: {
    marginTop: 5,
    width: "100%",
  },

  recommendTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    flexWrap: "wrap",
  },

  recommendSubtitle: {
    fontSize: 12,
    color: "grey",
    marginTop: 10,
    flexWrap: "wrap",
  },

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
  },
});

