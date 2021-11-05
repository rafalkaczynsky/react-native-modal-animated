import React, {memo, useMemo, useEffect} from 'react';
import {Animated, Easing, Pressable, StyleSheet} from 'react-native';

const AnimatedModal = memo(
  ({
    visible,
    style,
    children,
    noAnimation,
    onBackdropPress,
    animationType,
    modalCardPosition,
    useNativeDriver,
    duration,
    ...rest
  }) => {
    const visibility = useMemo(() => new Animated.Value(visible ? 1 : 0), [
      visible,
    ]);

    useEffect(() => {
      Animated.timing(visibility, {
        toValue: visible ? 1 : 0,
        easing: Easing.cubic,
        duration: duration || 300,
        useNativeDriver,
      }).start();
    }, [visibility, visible]);

    const defaultAnimationStyle = useMemo(
      () => ({
        opacity: visibility.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
        transform: [
          {
            scale: visibility.interpolate({
              inputRange: [0, 1],
              outputRange: [1.1, 1],
            }),
          },
        ],
      }),
      [visibility],
    );

    const varticalFlipAnimation = useMemo(
      () => ({
        opacity: visibility.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
        transform: [
          {
            rotateX: visibility.interpolate({
              inputRange: [0, 1],
              outputRange: ['270deg', '360deg'],
            }),
          },
        ],
      }),
      [visibility],
    );

    const flipAndScaleAnimation = useMemo(
      () => ({
        opacity: visibility.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
        transform: [
          {
            rotateX: visibility.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg'],
            }),
          },
          {
            scale: visibility.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        ],
      }),
      [visibility],
    );

    const horizontalFlipAnimation = useMemo(
      () => ({
        opacity: visibility.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
        transform: [
          {
            rotateY: visibility.interpolate({
              inputRange: [0, 1],
              outputRange: ['270deg', '360deg'],
            }),
          },
        ],
      }),
      [visibility],
    );

    const containerStyle = useMemo(() => {
      switch (animationType) {
        case 'vertical':
          return varticalFlipAnimation;
        case 'horizontal':
          return horizontalFlipAnimation;
        case 'flipAndScale':
          return flipAndScaleAnimation;
        default:
          return defaultAnimationStyle;
      }
    }, [
      animationType,
      varticalFlipAnimation,
      horizontalFlipAnimation,
      flipAndScaleAnimation,
      defaultAnimationStyle,
    ]);

    const positionStyle = useMemo(() => {
      switch (modalCardPosition) {
        case 'center':
          return styles.centerStyle;
        case 'bottom':
          return styles.bottomStyle;
        case 'top':
          return styles.topStyle;
        default:
          return styles.centerStyle;
      }
    }, [modalCardPosition]);

    const combinedStyle = useMemo(
      () => [!noAnimation ? containerStyle : null, style],
      [noAnimation, containerStyle, style],
    );

    return (
      <Pressable
        activeOpacity={1}
        onPress={onBackdropPress}
        style={visible ? styles.layerStyle : null}>
        <Animated.View
          style={[visible ? combinedStyle : containerStyle, positionStyle]}
          {...rest}>
          {visible ? children : null}
        </Animated.View>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  centerStyle: {
    position: 'absolute',
    zIndex: 100,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomStyle: {
    position: 'absolute',
    zIndex: 100,
    left: 0,
    right: 0,
    bottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topStyle: {
    position: 'absolute',
    zIndex: 100,
    left: 0,
    right: 0,
    top: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  layerStyle: {
    position: 'absolute',
    zIndex: 99,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: `rgba(0,0,0,0.5)`,
  },
});

export default AnimatedModal;
