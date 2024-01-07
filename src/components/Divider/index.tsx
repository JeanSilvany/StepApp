import React from "react";
import { Dimensions, View, ViewProps } from "react-native";
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface DividerProps extends ViewProps {
  scrollX: SharedValue<number>;
  index: number;
}

const { width } = Dimensions.get("window");

export const Divider: React.FC<DividerProps> = ({ index, scrollX }) => {
  const inputRange = [index * width, (index + 1) * width];
  const outputRange = [0, 50];

  const widthAnimateStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(
        scrollX.value,
        inputRange,
        outputRange,
        Extrapolate.CLAMP
      ),
    };
  });

  return (
    <View
      style={{
        width: 50,
        height: 4,
        backgroundColor: "gray",
        left: 0,
      }}
    >
      <Animated.View
        style={[
          {
            backgroundColor: "orange",
            width: 50,
            height: 4,
            top: 0,
            left: 0,
          },
          widthAnimateStyle,
        ]}
      />
    </View>
  );
};
