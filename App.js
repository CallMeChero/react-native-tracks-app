import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, Header } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AccountScreen from './src/screens/AccountScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { Provider as AuthProvider } from './src/context/AuthContext';

const globalNavigationOptions = {
  // title: `Sign in`,
  headerBackTitle: 'Nazad',
  headerBackground: () => (
    <LinearGradient
      colors={['#a13388', '#10356c']}
      style={{ flex: 1 }}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
    />
  ),
  headerTitleStyle: {
    color: '#fff'
  }
}

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: () => {
        return globalNavigationOptions
      }
    },
    SignIn: {
      screen: SignInScreen,
      navigationOptions: () => {
        return globalNavigationOptions
      }
    },
  }),
  mainFlow: createBottomTabNavigator({
    trackListFlow: createStackNavigator({
      TrackList: TrackListScreen,
      TrackDetail: TrackDetailScreen
    }),
    TrackCreate: TrackCreateScreen,
    Account: AccountScreen
  })
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
