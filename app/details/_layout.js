import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { AudioProvider } from '../../_components/audioProvider';
import AlbumSongs from './[albumID]';


const Stack = createNativeStackNavigator();

export default function AlbumAppStack() {
  return (
    <AudioProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="[albumID]" component={AlbumSongs} />
      </Stack.Navigator>
    </AudioProvider>
  );
}