import React, { Component } from 'react';
import { Animated, Easing, TouchableOpacity } from 'react-native';
export interface AnimatedModalProps {
  noAnimation?: boolean;
  visible: boolean;
  animationType?: string;
  style?: any;
  duration?: number;
  onBackdropPress: () => void;
}
export interface AnimatedModalState {
  visible: boolean;
}
export default class AnimatedModal extends Component<
  AnimatedModalProps,
  AnimatedModalState
> {
  visibility: Animated.Value;
  state;
  props;
  setState;

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible
    };
  }

  componentWillMount() {
    this.visibility = new Animated.Value(this.props.visible ? 1 : 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      this.setState({ visible: true });
    }
    Animated.timing(this.visibility, {
      toValue: nextProps.visible ? 1 : 0,
      easing: Easing.cubic,
      duration: this.props.duration ? this.props.duration : 300
    }).start(() => {
      this.setState({ visible: nextProps.visible });
    });
  }

  render() {
    const { visible, style, children, ...rest } = this.props;

    let containerStyle;

    const defaultAnimationStyle = {
      opacity: this.visibility.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      }),
      transform: [
        {
          scale: this.visibility.interpolate({
            inputRange: [0, 1],
            outputRange: [1.1, 1]
          })
        }
      ]
    };

    const varticalFlipAnimation = {
      opacity: this.visibility.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      }),
      transform: [
        {
          rotateX: this.visibility.interpolate({
            inputRange: [0, 1],
            outputRange: ['270deg', '360deg']
          })
        }
      ]
    };

    const flipAndScaleAnimation = {
      opacity: this.visibility.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      }),
      transform: [
        {
          rotateX: this.visibility.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
          })
        },
        {
          scale: this.visibility.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
          })
        }
      ]
    };

    const horizontalFlipAnimation = {
      opacity: this.visibility.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      }),
      transform: [
        {
          rotateY: this.visibility.interpolate({
            inputRange: [0, 1],
            outputRange: ['270deg', '360deg']
          })
        }
      ]
    };

    switch (this.props.animationType) {
      case 'vertical':
        containerStyle = varticalFlipAnimation;
        break;

      case 'horizontal':
        containerStyle = horizontalFlipAnimation;
        break;

      case 'flipAndScale':
        containerStyle = flipAndScaleAnimation;
        break;

      default:
        containerStyle = defaultAnimationStyle;
        break;
    }

    const combinedStyle = [
      !this.props.noAnimation ? containerStyle : null,
      style
    ];

    const layerStyle = {
      position: 'absolute',
      zIndex: 99,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: `rgba(0,0,0,0.5)`
    };

    return (
      <TouchableOpacity
        onPress={this.props.onBackdropPress}
        style={this.state.visible ? layerStyle : null}
      >
        <Animated.View
          style={this.state.visible ? combinedStyle : containerStyle}
          {...rest}
        >
          {this.state.visible ? children : null}
        </Animated.View>
      </TouchableOpacity>
    );
  }
}
