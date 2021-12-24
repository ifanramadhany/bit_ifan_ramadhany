import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TodosDoneScreen, TodosUndoneScreen } from ".";


export default function HomeScreen() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Todos List</Text>
      </View>
      <Tab.Navigator screenOptions={{
        tabBarLabelStyle: {  fontSize: 16, fontWeight: 'bold', textTransform: 'none' },
        tabBarIndicatorStyle: { backgroundColor: '#3B82F6'},
      }}>
      <Tab.Screen name="Todos You Have" component={TodosUndoneScreen} />
      <Tab.Screen name="Todos Done" component={TodosDoneScreen} />
    </Tab.Navigator>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  titleWrapper: {
    backgroundColor: "#93C5FD",
    height: 55,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    // backgroundColor: "red",
  },
});
