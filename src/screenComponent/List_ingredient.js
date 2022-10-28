import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import PopupInfor from "./PopupInfor";
import { Entypo, Feather } from "@expo/vector-icons";
import Slider from "./Slider";

const List_ingredient = () => {
  const [visible, setVisible] = useState(false);
  const list = [
    {
      id: 1,
      name: "Nhựa",
      img: require("../storage/imgs/list_ingredient/plastic.png"),
    },
    {
      id: 2,
      name: "Thủy tinh",
      img: require("../storage/imgs/list_ingredient/glass.png"),
    },
    {
      id: 3,
      name: "Giấy",
      img: require("../storage/imgs/list_ingredient/paper.png"),
    },
    {
      id: 4,
      name: "Kim loại",
      img: require("../storage/imgs/list_ingredient/metal.png"),
    },
  ];
  return list.map((data, index) => {
    return (
      <View key={data.id}>
        <PopupInfor visible={visible}>
          <View style={styles.modalcontainer}>
            <View style={{ marginTop: 110 }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  lineHeight: 27,
                  color: "#3D7944",
                  fontWeight: "700",
                  marginTop: '20%'
                }}
              >
                Nhựa
              </Text>
            </View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <View
                  style={{
                    width: 32,
                    height: 32,
                    backgroundColor: "#5EA466",
                    borderRadius: 100,
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 15,
                    marginRight: 6,
                  }}
                >
                  <Entypo name="check" size={20} color="white" />
                </View>
                <View>
                  <Text style={{ lineHeight: 14.63, letterSpacing: 1 }}>
                    Các loại nhựa có thể tái chế
                  </Text>
                  <Text style={{ lineHeight: 14.63, letterSpacing: 1 }}>
                    Các loại nhựa có thể tái chế
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",

                  marginTop: '5%',
                }}
              >
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 100,
                    marginLeft: 15,
                    marginRight: 6,
                  }}
                >
                  <Feather
                    name="x-octagon"
                    size={32}
                    color="white"
                    style={{
                      backgroundColor: "red",
                      borderRadius: 100,
                      alignItems: "center",
                    }}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      lineHeight: 14.63,
                      letterSpacing: 1,
                      width: 183,
                      height: 50,
                    }}
                  >
                    Các loại nhựa không tái chế được, Các loại nhựa không tái
                    chế được
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <View style={{ alignItems: "center", marginTop: 20 }}>
                  <Feather name="x-circle" size={30} color="grey" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              alignItems: "center",
              shadowOpacity: 1,
              borderRadius: 20,
              position: "absolute",
              bottom: 350,
            }}
          >
            <Slider />
          </View>
        </PopupInfor>

        <TouchableOpacity key={data.id} onPress={() => setVisible(true)}>
          <View
            style={{
              width: 72,
              height: 106,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 16,
            }}
          >
            <Image source={data.img} />
            <Text style={{ textAlign: "center" }}>{data.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  });
};
const styles = StyleSheet.create({
  modalcontainer: {
    width: "70%",
    backgroundColor: "white",
    height: 362,
    borderRadius: 20,
    marginTop: "50%",
  },
});
export default List_ingredient;
