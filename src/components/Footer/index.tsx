import React from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SharedValue } from "react-native-reanimated";

// import { Container } from './styles';

const { width } = Dimensions.get("window");

interface FooterProps {
  scrollX: SharedValue<number>;
  contentRef: React.RefObject<FlatList<any>>;
}

export const Footer: React.FC<FooterProps> = ({ scrollX, contentRef }) => {
  return (
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 16,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          contentRef.current?.scrollToOffset({
            offset: scrollX.value - width,
            animated: true,
          });
        }}
        style={{
          backgroundColor: "orange",
          padding: 16,
          borderRadius: 8,
          width: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
          }}
        >
          Back
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          contentRef.current?.scrollToOffset({
            offset: scrollX.value + width,
            animated: true,
          });
        }}
        style={{
          backgroundColor: "orange",
          padding: 16,
          borderRadius: 8,
          width: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
          }}
        >
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};
