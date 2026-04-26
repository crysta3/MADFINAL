import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from '../screens/home/HomeScreen';
import AddMealScreen from '../screens/meal/AddMealScreen';
import MealHistoryScreen from '../screens/meal/MealHistoryScreen';
import DailySummaryScreen from '../screens/home/DailySummaryScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import ChatbotScreen from '../screens/chatbot/ChatbotScreen';
import { MainTabParamList } from './types';
import { colors } from '../constants/colors';

const Tab = createBottomTabNavigator<MainTabParamList>();

const icons: Record<keyof MainTabParamList, keyof typeof Ionicons.glyphMap> = {
  Home: 'home',
  AddMeal: 'add-circle',
  MealHistory: 'time',
  DailySummary: 'stats-chart',
  Profile: 'person',
  Chatbot: 'chatbubble-ellipses',
};

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 74,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarIcon: ({ color, size }) => (
          <Ionicons color={color} name={icons[route.name]} size={size} />
        ),
      })}>
      <Tab.Screen component={HomeScreen} name="Home" options={{ title: 'Dashboard' }} />
      <Tab.Screen component={AddMealScreen} name="AddMeal" options={{ title: 'Add Meal' }} />
      <Tab.Screen
      component={ChatbotScreen}
      name="Chatbot"
      options={{ title: 'NutriBot' }}
      />
      <Tab.Screen
        component={MealHistoryScreen}
        name="MealHistory"
        options={{ title: 'History' }}
      />
      <Tab.Screen
        component={DailySummaryScreen}
        name="DailySummary"
        options={{ title: 'Summary' }}
      />
      <Tab.Screen component={ProfileScreen} name="Profile" />
    </Tab.Navigator>
  );
}
