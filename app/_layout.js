import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './(tabs)/_layout';
import AlbumSongs from './details/[albumID]';
import { AudioProvider } from '../_components/audioProvider';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <AudioProvider>
      
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" component={TabNavigator} />
        <Stack.Screen name="details" component={AlbumSongs} />
      </Stack.Navigator>
    </AudioProvider>
  );
}