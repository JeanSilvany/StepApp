import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  ViewToken,
} from "react-native";

import { Step } from "./src/components/Step";
import { Divider } from "./src/components/Divider";

import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { Footer } from "./src/components/Footer";
import { useEffect, useRef, useState } from "react";

const { width } = Dimensions.get("window");

export default function App() {
  const stepsRef = useAnimatedRef<FlatList>();
  const contentRef = useAnimatedRef<FlatList>();

  const contentScrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      contentScrollX.value = event.contentOffset.x;
    },
  });

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const data = [
    "Sacola",
    "Cartão",
    "Transporte",
    "Concluído",
    "Sacola 2",
    "Cartão 2",
    "Transporte 2",
    "Concluído 2",
  ];

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    viewableItems[0] && setCurrentStepIndex(viewableItems[0]?.index || 0);
  };

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: 100,
      },

      onViewableItemsChanged,
    },
  ]);

  useEffect(() => {
    stepsRef.current.scrollToIndex({
      index: 0,
      animated: true,
      viewOffset: 16,
    });
  }, []);

  useEffect(() => {
    stepsRef.current.scrollToIndex({
      index: currentStepIndex,
      animated: true,
      viewOffset: 16,
    });
  }, [currentStepIndex]);

  return (
    <SafeAreaView style={{ gap: 16, backgroundColor: "green", flex: 1 }}>
      <View style={styles.container}>
        <Animated.FlatList
          ref={stepsRef as any}
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Step scrollX={contentScrollX} index={index} />
                {index < data.length - 1 && (
                  <Divider index={index} scrollX={contentScrollX} />
                )}
              </View>
            </View>
          )}
          contentContainerStyle={{
            // width,
            padding: 16,
            justifyContent: "center",
            alignItems: "center",
          }}
          // style={{ backgroundColor: "aqua" }}
        />
        {/* {data.map((step, index) => (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Step scrollX={scrollX} index={index} />
              {index < data.length - 1 && (
                <Divider index={index} scrollX={scrollX} />
              )}
            </View>
          </View>
        ))} */}
      </View>

      <Animated.FlatList
        ref={contentRef as any}
        onScroll={onScroll}
        data={data}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        renderItem={({ item }) => (
          <View
            style={{
              width,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: "https://picsum.photos/1920/1079" }}
              style={{
                resizeMode: "cover",
                width,
                height: 900,
              }}
            />
          </View>
        )}
        keyExtractor={(item) => String(item)}
        style={{ backgroundColor: "aqua" }}
        // scrollEnabled={false}
      />

      <Footer
        scrollX={contentScrollX}
        stepsRef={stepsRef}
        contentRef={contentRef}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#786262",
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width,
  },
});
