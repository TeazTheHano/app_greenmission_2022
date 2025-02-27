import * as React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Animated,
  Platform,
  TouchableOpacity,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { markers } from "../data/mapData";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 244;
const CARD_WIDTH = width * 0.9;
const SPACING_FOR_CARD_INSET = width * 0.1 - 20;

const mapStandardStyle = [
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
];

const Maps = ({ navigation }) => {
  const initialMapState = {
    markers,
    region: {
      latitude: 21.0195109,
      longitude: 105.7973823,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };

  const [state, setState] = React.useState(initialMapState);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  React.useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= markers.length) {
        index = state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex != index) {
          mapIndex = index;
          const { coordinate } = markers[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  });

  const interpolations = markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp",
    });
    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  };

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        initialRegion={state.region}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStandardStyle}
      >
        {state.markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <MapView.Marker
              key={index}
              coordinate={marker.coordinate}
              onPress={(e) => onMarkerPress(e)}
            >
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require("../storage/imgs/mark/map_pin.png")}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </MapView.Marker>
          );
        })}
      </MapView>

      <View
        style={{
          position: "absolute",
          width: "100%",
          height: 80,
          backgroundColor: "#13A49E",
          justifyContent: "center",
          alignSelf: "center",
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      >
        <TouchableOpacity onPress={() => navigation.push("Collection")}>
          <AntDesign
            name="minus"
            size={60}
            color="white"
            style={{ alignSelf: "center" }}
          />
          <Text
            style={{ marginBottom: 30, alignSelf: "center", color: "white" }}
          >
            Hiển thị danh sách
          </Text>
        </TouchableOpacity>
      </View>

      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingVertical: 35,
          marginRight: 10,
        }}
        pagingEnabled
        snapToInterval={CARD_WIDTH + 45}
        snapToAlignmen="center"
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {state.markers.map((marker, index) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Collect", {
                title: marker.title,
                time: marker.time,
                distance: marker.distance,
                img: marker.img,
              })
            }
            key={index}
          >
            <View
              style={{
                width: 400,
                height: 150,
                backgroundColor: "#F1F5E8",
                borderRadius: 20,
                marginBottom: 90,
                marginLeft: 20,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  marginLeft: 20,
                  flexDirection: "row",
                  marginTop: 20,
                }}
              >
                <View>
                  <Image
                    source={marker.img}
                    style={{ width: 120, height: 120 }}
                  />
                </View>
                <View style={{ marginTop: 31, marginLeft: 20 }}>
                  <Text>
                    {marker.distance} | {marker.time}
                  </Text>
                  <Text>{marker.title}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 10,
  },
  bubble: {
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 40,
    height: 40,
  },
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#FFFFFF",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  image: {
    width: 120,
    height: 50,
  },
});

export default Maps;
