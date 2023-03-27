import { StyleSheet, Image } from "react-native";
import React from "react";

export default function ImageViewer({ placeHolderImageSource, selectedImage }) {
  const imageSource =
    selectedImage != null ? { uri: selectedImage } : placeHolderImageSource;
  return <Image style={styles.image} source={imageSource} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
