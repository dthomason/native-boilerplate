import React, { FC } from 'react';
import {
  NavigationContainer,
  RouteProp,
  Theme,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import FeatherIcons from 'react-native-vector-icons/Feather';

import { navigationRef } from './NavigationService';

import { ThemeController } from '../components';
import { StatusBar } from 'react-native';
import {
  Splash,
  SignIn,
  SignUp,
  ForgotPassword,
  Home,
  Settings,
} from 'app/screens';
import { useReduxSelector } from '../store';
import { selectLogin } from 'app/store/ducks';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator<AuthParamList>();
const AppStack = createDrawerNavigator<AppParamList>();

type AppParamList = {
  Feed: undefined;
  Home: undefined;
  Settings: undefined;
};

export type AppScreens = 'Feed' | 'Home' | 'Settings';

export type AppNavProps<T extends keyof AppParamList> = {
  navigation:
    | DrawerNavigationProp<AppParamList, T>
    | BottomTabNavigationProp<AppParamList, T>
    | StackNavigationProp<AppParamList, T>;
  route: RouteProp<AppParamList, T>;
};

type AuthParamList = {
  ForgotPassword: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Splash: undefined;
};

export type AuthNavProps<T extends keyof AuthParamList> = {
  navigation: StackNavigationProp<AuthParamList, T>;
  route: RouteProp<AuthParamList, T>;
};

interface IProps {
  theme: Theme;
}

const AuthNavigator: FC<
  AuthNavProps<'SignIn' | 'ForgotPassword' | 'Splash' | 'SignUp'>
> = () => {
  const isLoggedIn = useReduxSelector(selectLogin);

  return (
    <AuthStack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
          headerRight: () => <ThemeController />,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
          headerRight: () => <ThemeController />,
        }}
      />
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
          headerRight: () => <ThemeController />,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
          headerRight: () => <ThemeController />,
        }}
      />
    </AuthStack.Navigator>
  );
};

const Tab = createBottomTabNavigator<AppParamList>();

const TabNavigator: FC<AppNavProps<'Feed'>> = props => (
  <Tab.Navigator screenOptions={{ headerShown: false }} {...props}>
    <Tab.Screen
      name="Feed"
      component={Home}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <FeatherIcons name="home" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

const DrawerNavigator: FC<AppNavProps<AppScreens>> = props => (
  <AppStack.Navigator drawerContent={() => <Settings {...props} />}>
    <AppStack.Screen name="Home" component={TabNavigator} />
  </AppStack.Navigator>
);

const App: React.FC<IProps> = (props: IProps) => {
  const { theme } = props;
  const isLoggedIn = useReduxSelector(selectLogin);

  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="Home" component={DrawerNavigator} />
        ) : (
          <Stack.Screen
            name="Login"
            component={AuthNavigator}
            options={{
              animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
              headerRight: () => <ThemeController />,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
