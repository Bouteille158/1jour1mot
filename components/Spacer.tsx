import React from "react";
import { View } from "react-native";

interface SpacerProps {
  width?: number;
  height?: number;
}

const Spacer = ({ width, height }: SpacerProps) => {
  return (
    <View
      style={{
        width,
        height,
      }}
    ></View>
  );
};

export default Spacer;
