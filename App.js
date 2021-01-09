import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import SignInScreen from './src/screens/SignInScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { setNavigator } from './src/helpers/navigationRef';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import GroupScreen from './src/screens/GroupScreen';

const globalNavigationOptions = {
  headerBackTitle: 'Nazad',
  headerTintColor: 'white',
  headerBackTitleVisible: false
}

const switchNavigator = createSwitchNavigator({
  resolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    SignIn: {
      screen: SignInScreen
    },
    ResetPassword: {
      screen: ResetPasswordScreen,
      navigationOptions: () => {
        return globalNavigationOptions
      }
    }
  }),
  groupFlow: createStackNavigator({ 
    GroupScreen: {
      screen: GroupScreen
    }
  })
  // mainFlow: createBottomTabNavigator({
  //   // trackListFlow: createStackNavigator({
  //   //   GroupScreen: GroupScreen,
  //   // }),
  // })
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <App ref={(navigator) => { setNavigator(navigator) }}/>
    </AuthProvider>
  );
}
