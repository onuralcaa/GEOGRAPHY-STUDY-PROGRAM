import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CategorySelectScreen from '../screens/CategorySelectScreen';
import QuizScreen from '../screens/QuizScreen';
import ResultScreen from '../screens/ResultScreen';

export type RootStackParamList = {
  Home: undefined;
  CategorySelect: undefined;
  Quiz: { categoryId: string };
  Result: { score: number; total: number; categoryId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          orientation: 'landscape',
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CategorySelect" component={CategorySelectScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
