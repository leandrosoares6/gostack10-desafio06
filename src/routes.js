import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';
import Repo from './pages/Repo';

const Stack = createStackNavigator();

function Routes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          maxWidth: 220,
        },
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#7159c1',
        },
        headerTintColor: '#FFF',
      }}
    >
      <Stack.Screen
        name="Main"
        component={Main}
        options={Main.navigationOptions}
      />
      <Stack.Screen
        name="User"
        component={User}
        options={User.navigationOptions}
      />
      <Stack.Screen
        name="Repo"
        component={Repo}
        options={Repo.navigationOptions}
      />
    </Stack.Navigator>
  );
}
export default Routes;
