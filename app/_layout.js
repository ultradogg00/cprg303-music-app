
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
const Layout = () => {
  return (
    <Tabs>
        <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
        
        ></Tabs.Screen>
        <Tabs.Screen
        name="library"
        options={{
          title: "Library",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="library-music" size={28} color="black" />
          ),
        }}
        
        ></Tabs.Screen>
        <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" size={28} color="black" />
          ),
        }}
        
        ></Tabs.Screen>
    </Tabs>
  )
}



export default Layout

const styles = StyleSheet.create({})