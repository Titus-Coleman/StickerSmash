import { View, Image } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedView = Animated.createAnimatedComponent(View);

const EmojiSticker = ({ imageSize, stickerSource }) => {
  const scaleImage = useSharedValue(imageSize);

  //Fn uses hook to scale the image values x2 with a double tap gesture
  const onDoubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value) {
        scaleImage.value =
          scaleImage.value === 320
            ? (scaleImage.value = 80)
            : scaleImage.value * 2;
      }
    });

  //uses hook to apply the style of animation (spring effect) to the image size change
  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  //Used to track sticker on X/Y Axis
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const context = useSharedValue({ x: 0, y: 0 });

  const onDrag = Gesture.Pan()
    .onStart(() => {
      context.value = { x: translateX.value, y: translateY.value };
    })
    .onUpdate((e) => {
      translateX.value = e.translationX + context.value.x;
      translateY.value = e.translationY + context.value.y;
    });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <GestureDetector gesture={onDrag}>
      <AnimatedView style={[containerStyle, { top: -350 }]}>
        <GestureDetector gesture={Gesture.Exclusive(onDoubleTap)}>
          <AnimatedImage
            source={stickerSource}
            resizeMode="contain"
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </GestureDetector>
      </AnimatedView>
    </GestureDetector>
  );
};

export default EmojiSticker;
