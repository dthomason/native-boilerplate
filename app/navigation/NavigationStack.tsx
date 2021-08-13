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
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';

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
// const AppStack = createStackNavigator<AppParamList>();
const AppStack = createDrawerNavigator<AppParamList>();

type AppParamList = {
  Feed: undefined;
  Settings: undefined;
};

// export type AppNavProps<T extends keyof AppParamList> = {
//   navigation: StackNavigationProp<AppParamList, T>;
//   route: RouteProp<AppParamList, T>;
// };

export type AppNavProps<T extends keyof AppParamList> = {
  navigation: DrawerNavigationProp<AppParamList, T>;
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

interface HomeOptions {
  title: 'Home';
  headerTitleStyle: {
    fontWeight: 'bold';
  };
  headerRight: () => JSX.Element;
}

const homeOptions: HomeOptions = {
  title: 'Home',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerRight: () => <ThemeController />,
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

const AppNavigator: FC<AppNavProps<'Settings'>> = props => (
  <AppStack.Navigator drawerContent={() => <Settings {...props} />}>
    <Stack.Screen name="Feed" component={Home} options={homeOptions} />
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
          <Stack.Screen
            name="Home"
            component={AppNavigator}
            options={homeOptions}
          />
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
