import { GradientLogo } from 'app/components/gradientLogo';
import { AuthNavProps } from 'app/navigation/NavigationStack';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Animated,
  ImageBackground,
  StyleSheet,
  View,
  Easing,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
} from 'react-native';

const AnimatedBackground = Animated.createAnimatedComponent(ImageBackground);

export const SplashNew: FC<AuthNavProps<'Splash'>> = ({ navigation }) => {
  const [isPressed, setIsPressed] = useState(false);
  const imageOpacity = useMemo(() => new Animated.Value(0), []);
  const ass = useMemo(() => new Animated.Value(-400), []);
  const traveler = useMemo(() => new Animated.Value(400), []);
  const dropIn = useMemo(() => new Animated.Value(-600), []);
  const fadeSlogan = useMemo(() => new Animated.Value(0), []);

  const navigate = useCallback(
    () => navigation.navigate('SignIn'),
    [navigation],
  );

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  useEffect(() => {
    Animated.sequence([
      Animated.timing(imageOpacity, {
        toValue: 1,
        useNativeDriver: true,
        easing: Easing.ease,
        duration: 1200,
      }),
      Animated.spring(dropIn, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.spring(ass, {
        toValue: 0,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(traveler, {
        toValue: 0,
        friction: 14,
        useNativeDriver: true,
      }),
      Animated.timing(fadeSlogan, {
        toValue: 1,
        useNativeDriver: true,
        easing: Easing.ease,
        duration: 1000,
      }),
    ]).start();
  }, [ass, dropIn, fadeSlogan, imageOpacity, traveler]);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => navigate()}>
        <AnimatedBackground
          resizeMode="cover"
          source={require('app/assets/images/rocky-sea.jpeg')}
          style={[styles.backGroundImage, { opacity: imageOpacity }]}>
          <View style={styles.logoContainer}>
            <Animated.View
              style={[
                styles.logoWrap,
                { transform: [{ translateY: dropIn }] },
              ]}>
              <GradientLogo />
            </Animated.View>
            <View style={[styles.wordWrap]}>
              <Animated.Text
                style={[styles.text, { transform: [{ translateX: ass }] }]}>
                ass
              </Animated.Text>
              <Animated.Text
                style={[
                  styles.text,
                  { transform: [{ translateX: traveler }] },
                ]}>
                Traveler
              </Animated.Text>
            </View>
            <Animated.Text style={[styles.slogan, { opacity: fadeSlogan }]}>
              make your next destination count
            </Animated.Text>
            <View />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={1}
              style={[
                styles.button,
                {
                  backgroundColor: isPressed ? '#3F8C8C' : '#3E5659',
                },
              ]}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}>
              <Text style={styles.buttonText}>sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={[
                styles.button,
                {
                  backgroundColor: isPressed ? '#182526' : '#3E5659',
                },
              ]}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}>
              <Text style={styles.buttonText}>sign up</Text>
            </TouchableOpacity>
          </View>
        </AnimatedBackground>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#182526',
  },
  backGroundImage: {
    width: '100%',
    height: '100%',
    opacity: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: 50,
    maxHeight: 100,
    // flex: 2,
  },
  button: {
    // backgroundColor: '#182526',
    height: 45,
    width: '85%',
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    shadowColor: '#182526',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D9D9D9',
    letterSpacing: 1,
  },
  wordWrap: {
    flexDirection: 'row',
  },
  slogan: {
    textAlign: 'center',
    fontSize: 17,
  },
  logoContainer: {
    alignItems: 'center',
    // justifyContent: 'center',
    // marginBottom: 80,
  },
  logoWrap: {
    minWidth: 250,
    minHeight: 400,
    marginLeft: 40,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logo: {
    shadowColor: '#182526',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 1,
  },
  text: {
    fontWeight: '700',
    fontSize: 45,
    color: '#182526',
  },
  assText: {
    paddingRight: 8,
  },
});
