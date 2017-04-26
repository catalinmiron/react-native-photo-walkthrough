import React, { Component } from 'react';
import {
  StatusBar,
  Image,
  Text,
  View,
  StyleSheet,
  Animated,
  ScrollView,
  Dimensions
} from 'react-native';
import { Constants, BlurView } from 'expo';

const { width, height } = Dimensions.get('window');
const SPACING = 30;

// const BG_IMAGE = 'https://s-media-cache-ak0.pinimg.com/564x/20/01/83/200183f453efd290c1afcdca626db0c0.jpg'
const BG_IMAGE =
  'https://s-media-cache-ak0.pinimg.com/564x/fc/22/12/fc2212ba7e66ff389e3d965fd0d9e371.jpg';

const ITEMS = [
  {
    image: 'https://s-media-cache-ak0.pinimg.com/564x/66/fb/74/66fb74fd86ba7c3154636c7de025bdae.jpg',
    description: 'Still court no small think death so an wrote. Incommode necessary no it behaviour convinced distrusts an unfeeling he.'
  },
  {
    image: 'https://s-media-cache-ak0.pinimg.com/564x/9b/e2/64/9be2647d579e993bd6c430960071431d.jpg',
    description: 'Do so written as raising parlors spirits mr elderly. Made late in of high left hold. Carried females of up highest calling. Limits marked led silent dining her she far.'
  },
  {
    image: 'https://s-media-cache-ak0.pinimg.com/564x/15/38/f7/1538f786c7c906fa3e766a0f1469027b.jpg',
    description: 'Sir but elegance marriage dwelling likewise position old pleasure men. Dissimilar themselves simplicity no of contrasted as. Delay great day hours men.'
  },
  {
    image: 'https://s-media-cache-ak0.pinimg.com/564x/ad/76/f8/ad76f89718b9216fb4f68607ed3cce7f.jpg',
    description: 'But her ready least set lived spite solid. September how men saw tolerably two behaviour arranging. She offices for highest and replied one venture pasture.'
  }
];

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollX: new Animated.Value(0),
      indicator: new Animated.Value(1)
    };
  }
  render() {
    console.log(this.state.indicator);
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} barStyle="light-content" />
        <Image
          source={{ uri: BG_IMAGE, width: width, height: height }}
          style={{ resizeMode: 'cover' }}>
          <Animated.View
            style={{
              shadowOffset: { width: 0, height: -35 },
              shadowOpacity: 1,
              shadowRadius: 30,
              shadowColor: '#E95CAE',
              position: 'absolute',
              bottom: -50,
              width: width / ITEMS.length,
              height: 50,
              backgroundColor: '#E95CAE',
              left: this.state.indicator
            }}
          />
          <Animated.View
            style={{
              shadowOffset: { width: 0, height: 35 },
              shadowOpacity: 1,
              shadowRadius: 30,
              shadowColor: '#E95CAE',
              position: 'absolute',
              top: -50,
              width: width / ITEMS.length,
              height: 50,
              backgroundColor: '#E95CAE',
              left: this.state.indicator
            }}
          />
          <View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: 'rgba(255,255,255,0.2)' }
            ]}
          />
          <BlurView
            tint="dark"
            intensity={30}
            style={StyleSheet.absoluteFill}
          />

          <Animated.ScrollView
            horizontal={true}
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: 'center', flexGrow: 1 }}
            decelerationRate={0}
            pagingEnabled
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { x: this.state.scrollX } } }
            ])}>
            {ITEMS.map((item, i) => {
              return this.renderRow(item, i);
            })}
          </Animated.ScrollView>
        </Image>
      </View>
    );
  }

  componentDidMount() {
    this.state.scrollX.addListener(this.updateView.bind(this));
  }

  updateView(offset) {
    let currentIndex = offset.value / width;
    if (offset.value < 0) {
      currentIndex = 0;
    } else if (offset.value > (ITEMS.length - 1) * width) {
      currentIndex = ITEMS.length - 1;
    }
    this.state.indicator.setValue(currentIndex * width / ITEMS.length);
  }

  renderRow(item, i) {
    let inputRange = [
      (i - 1) * width,
      i * width,
      (i + 1) * width,
      (i + 2) * width
    ];
    let outputRange = [0, height * 0.29, 0, 0];
    let rotateRange = ['0deg', '-6deg', '0deg', '0deg'];
    let opacityRange = [0, 1, 0, 0];
    let scaleRange = [1.2, 1, 1.2, 1.2];

    return (
      <View
        key={i}
        style={{
          width: width - SPACING * 2,
          height: height * 0.75,
          marginHorizontal: SPACING,
          position: 'relative',
          backgroundColor: 'transparent',
          overflow: 'hidden'
        }}>
        <Image
          source={{ uri: item.image }}
          style={{ width: '100%', height: '45%', resizeMode: 'cover' }}
        />
        <Animated.View
          style={{
            backgroundColor: '#EEE842',
            position: 'absolute',
            left: -width / 4,
            right: 0,
            bottom: 0,
            width: width * 2,
            height: height,
            top: this.state.scrollX.interpolate({
              inputRange,
              outputRange
            }),
            transform: [
              {
                rotate: this.state.scrollX.interpolate({
                  inputRange,
                  outputRange: rotateRange
                })
              }
            ]
          }}
        />
        <View
          style={{
            paddingHorizontal: SPACING,
            alignItems: 'center',
            backgroundColor: 'transparent',
            justifyContent: 'center',
            flex: 1
          }}>
          <Animated.Text
            style={{
              textAlign: 'center',
              fontFamily: 'Georgia',
              lineHeight: 27,
              fontSize: 18,
              opacity: this.state.scrollX.interpolate({
                inputRange,
                outputRange: opacityRange
              }),
              transform: [
                {
                  scale: this.state.scrollX.interpolate({
                    inputRange,
                    outputRange: scaleRange
                  })
                }
              ]
            }}>
            {item.description}
          </Animated.Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1'
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e'
  }
});
