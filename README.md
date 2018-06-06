# react-native-modal-animated


An animated and highly customizable react-native modal.  
  

## Features

* Smooth enter/exit animations
* Plain simple and flexible APIs

## Demo

<p align="center">
<img src="https://github.com/rafalkaczynsky/react-native-modal-animated/blob/master/src/assets/ezgif.com-video-to-gif.gif" height="300" />
<img src="https://github.com/rafalkaczynsky/react-native-modal-animated/blob/master/src/assets/horizontal.gif" height="300" />
<img src="https://github.com/rafalkaczynsky/react-native-modal-animated/blob/master/src/assets/vertical.gif" height="300" />
</p>

## Setup

This library is available on npm, install it with: `npm install --save react-native-modal-animated` or `yarn add react-native-modal-animated`.

## Usage


1. Import react-native-modal-animated:

```javascript
import {AnimatedModal} from "react-native-modal-animated";
```

2. Create a modal and nest its content inside of it:

```javascript
render () {
    return (
      <View>
        <AnimatedModal>
          <View>
            <Text>I am AnimatedModal</Text>
          </View>
        </AnimatedModal>
      </View>
    )
  }
```

3. Then simply show it by setting the `visible` prop to true:

```javascript
render () {
    return (
      <View>
        <AnimatedModal visible={true}>
          <View style={{width: 200, height: 150}}>
            <Text>I am AnimatedModal</Text>
          </View>
        </AnimatedModal>
      </View>
    )
  }
```

The `visible` prop is the only prop you'll really need to make the animated modal work: you should control this prop value by saving it in your state and setting it to `true` or `false` when needed.
However is recomened to see a complete example below. 
## A complete example

The following example consists in a component (`App`) with a button and a modal.
The modal is controlled by the `modalVisible` state variable and it is initially hidden, since its value is `false`.  
Once the button is pressed, sets `modalVisible` to true, making the modal visible.  Sets `modalVisible` to false, hiding the modal.
To do that you can add buttom  inside the modal or make usage of prop onBackdropPress , as shown below .

```javascript
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { AnimatedModal } from 'react-native-animated-modal';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false
    };
  }
  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity
          onPress={() => this.setState({ modalVisible: true })}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Show Modal</Text>
        </TouchableOpacity>


        <AnimatedModal
          visible={this.state.modalVisible}
          onBackdropPress={() => {
            this.setState({ modalVisible: false });
          }}
          animationType="horizontal"
          duration={600}
         >
          <View style={styles.modalCard}>
            <Text>
              I am AnimatedModal
            </Text>
            <Text 
              style={{
                fontWeight: 'bold', 
                marginTop: 10}}
             >
              horizontal
            </Text>
          </View>
        </AnimatedModal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  button: {
    width: '70%',
    backgroundColor: '#4286f4',
    padding: 10,
    borderColor: 'grey',
    borderWidth: 1
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    letterSpacing: 2
  },
  modalCard: {
    width: '70%',
    height: 150, 
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

```


## Available props

| Name                           | Type             | Default        | Description                                                                                  |
| ------------------------------ | ---------------- | -------------- | -------------------------------------------------------------------------------------------- |
| visible                        | boolen           | false          | Modal is shown/hidden                                                                        |
| duration                       | number           | 300            | Timing for the modal show animation (in ms)                                                  |
| animationType                  | string           | 'fadeIn'       | Type of animation - 'flipAndScale', 'verical', 'horizontal'                                  |                                    |
| modalCardPosition              | string           | 'center'       | Position of ModalCard - 'center' , 'bottom', 'top'                                           |
| onBackdropPress                | func             | () => null     | Called when backdrop is pressed                                                              |

## Frequently Asked Questions


### How can I hide the modal by pressing outside of its content?

The prop `onBackdropPress` allows you to handle this situation:

```javascript
<AnimatedModal
  visible={this.state.modalVisible}
  onBackdropPress={() => this.setState({ modalVisible: false })}
>
  <View style={{ width: 100, height: 100 }}>
    <Text>I am the AnimatedModal content!</Text>
  </View>
</AnimatedModal>
```

Pull requests, feedbacks and suggestions are welcome!
