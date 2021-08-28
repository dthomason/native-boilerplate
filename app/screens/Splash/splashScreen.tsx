import { attemptLogin } from 'app/store/ducks';
import React, { FC, useEffect, useMemo, useState } from 'react';
import {
  Animated,
  Easing,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import DonkeyIcon from '../../assets/icons/kid-donkey.svg';

const image = 'https://source.unsplash.com/random/450×650/?beach';
const defaultColor = '#e53935';
const log = 'useEffect Triggered for splashScreen';

const AnimatedBackground = Animated.createAnimatedComponent(ImageBackground);

export const SplashScreen: FC = () => {
  const [username, setUsername] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [readyState, setReadyState] = useState(false);
  const imageOpacity = useMemo(() => new Animated.Value(0), []);
  const scale = useMemo(() => new Animated.Value(0), []);
  const slideUp = useMemo(() => new Animated.Value(0), []);
  const inputScale = useMemo(() => new Animated.Value(0), []);
  const bottomButtonOpacity = useMemo(() => new Animated.Value(1), []);
  const [trigger, setTrigger] = useState(false);

  async function handleSubmit() {
    await attemptLogin(username.value, password.value);
  }

  console.log({ username });

  const handleSignIn = () => {
    setTrigger(true);
    console.log('CLICKED LOGIN');
  };

  useEffect(() => {
    if (readyState && trigger) {
      Animated.timing(bottomButtonOpacity, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }
  }, [trigger, readyState, bottomButtonOpacity]);

  useEffect(() => {
    if (readyState && trigger) {
      Animated.timing(inputScale, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }
  }, [trigger, readyState, inputScale]);

  useEffect(() => {
    if (readyState && trigger) {
      Animated.timing(slideUp, {
        toValue: -30,
        duration: 350,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }
  }, [slideUp, trigger, readyState]);

  useEffect(() => {
    if (readyState) {
      Animated.spring(scale, {
        toValue: 1,
        delay: 1000,
        friction: 3,
        useNativeDriver: true,
      }).start();
    } else {
      console.log(log);
    }
  }, [readyState, scale]);

  useEffect(() => {
    if (readyState) {
      Animated.timing(imageOpacity, {
        toValue: 1,
        useNativeDriver: true,
        easing: Easing.linear,
        duration: 200,
      }).start();
    } else {
      console.log(log);
    }
  }, [imageOpacity, readyState]);

  return (
    <AnimatedBackground
      style={[styles.image, { opacity: imageOpacity }]}
      onLoad={() => setReadyState(true)}
      source={{ uri: image }}>
      <View style={styles.container}>
        <View style={{ flex: 2, width: '100%' }}>
          {/* <SimpleButton label={'Get Started'} onPress={handlePress} /> */}
        </View>
        <View
          style={{
            flex: 2,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Animated.View
            style={[
              styles.logoContainer,
              { transform: [{ scale: scale }, { translateY: slideUp }] },
            ]}>
            <DonkeyIcon
              width={65}
              height={65}
              fill={defaultColor}
              style={[styles.donkey, styles.effects]}
            />
            <Text style={[styles.text, styles.effects]}>traveler</Text>
          </Animated.View>
          <Animated.View
            style={[
              {
                flexDirection: 'column',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              },
              { transform: [{ scale: inputScale }] },
            ]}>
            {/* <TextInput
              style={styles.input}
              onChangeText={text => setEmail(text)}
              value={email}
              keyboardType="email-address"
            /> */}
            <TextInput
              style={{
                backgroundColor: '#ffffffac',
                marginBottom: 4,
                height: 60,
                width: '80%',
              }}
              label="Username"
              returnKeyType="next"
              value={username.value}
              onChangeText={text => setUsername({ value: text, error: '' })}
              outlineColor={'#17C861'}
              error={!!username.error}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="name-phone-pad"
            />
            <TextInput
              style={{
                backgroundColor: '#ffffffac',
                marginBottom: 4,
                height: 60,
                width: '80%',
              }}
              theme={{
                colors: {
                  text: 'rgb(28, 28, 30)',
                },
              }}
              // mode="flat"
              label="Password"
              returnKeyType="done"
              outlineColor={'#22722d'}
              value={password.value}
              onChangeText={text => setPassword({ value: text, error: '' })}
              error={!!password.error}
              secureTextEntry
            />
            <TouchableOpacity
              onPress={handleSubmit}
              style={[styles.button, { marginTop: 10 }]}>
              <View>
                <Text style={styles.buttonText}>SUBMIT</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
          <Text>Flex Box Two Mid</Text>
        </View>
        <Animated.View
          style={[
            {
              flex: 2,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            },
            { opacity: bottomButtonOpacity },
          ]}>
          <Text>Flex Box Three Bottom</Text>
          <TouchableOpacity onPress={handleSignIn} style={styles.button}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>SIGN IN</Text>
            </View>
          </TouchableOpacity>
          <View style={[styles.button, styles.fbButton]}>
            <Text style={styles.buttonText}>SIGN IN WITH FACEBOOK</Text>
          </View>
        </Animated.View>
      </View>
    </AnimatedBackground>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    height: 60,
    width: '85%',
    flexWrap: 'nowrap',
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  fbButton: {
    backgroundColor: '#2E71DC',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    opacity: 1,
  },
  donkey: {
    marginBottom: 7,
    marginRight: 2,
  },
  logoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  effects: {
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 1.5,
    elevation: 1,
  },
  text: {
    fontWeight: '800',
    fontSize: 60,
    color: defaultColor,
  },
});
