import React from "react";
import { Dimensions, Text, View, ViewProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface StepProps extends ViewProps {
  scrollX: SharedValue<number>;
  index: number;
}

const { width } = Dimensions.get("window");

const icons = [
  "shopping-bag",
  "credit-card",
  "truck",
  "check",
  "shopping-bag",
  "credit-card",
  "truck",
  "check",
  "shopping-bag",
  "credit-card",
  "truck",
  "check",
];

export const Step: React.FC<StepProps> = ({ scrollX, index }) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const outputRange = [1, 1.2, 1];

  const scaleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scrollX.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const opacityAnimatedStyle = useAnimatedStyle(() => {
    const outputRange = [0, 1, 0];

    return {
      opacity: interpolate(
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
        zIndex: 1,
      }}
    >
      <Animated.View
        style={[
          scaleAnimatedStyle,
          {
            backgroundColor: "orange",
            width: 50,
            height: 50,
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Feather name={icons[index]} size={16} style={{ zIndex: 1 }} />

        <Animated.View
          style={[
            {
              width: 45,
              height: 45,
              borderRadius: 45,
              backgroundColor: "white",
              position: "absolute",
            },
            opacityAnimatedStyle,
          ]}
        />
      </Animated.View>

      {/* <Text
        style={{
          textAlign: "center",
          marginTop: 8,
        }}
      >
        kkk
      </Text> */}
    </View>
  );
};
