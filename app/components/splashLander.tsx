import React, { FC, useEffect, useMemo, useState } from 'react';
import {
  Animated,
  Easing,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';

const image = 'https://source.unsplash.com/random/450×650/?beach';

const AnimatedImageContainer =
  Animated.createAnimatedComponent(ImageBackground);

export const ImageContainer: FC = ({ children }) => {
  const [readyState, setReadyState] = useState(false);
  const animatedOpacity = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    if (readyState) {
      Animated.timing(animatedOpacity, {
        toValue: 1,
        useNativeDriver: true,
        easing: Easing.linear,
        duration: 2000,
      }).start();
    } else {
      return;
    }
  }, [animatedOpacity, readyState]);

  return (
    <View style={styles.container}>
      <AnimatedImageContainer
        style={[styles.image, { opacity: animatedOpacity }]}
        source={{ uri: image }}
        onLoad={() => setReadyState(true)}>
        {readyState ? children : <View />}
      </AnimatedImageContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'black',
  },
  image: {
    width: '100%',
    height: '100%',
    opacity: 1,
  },
});
