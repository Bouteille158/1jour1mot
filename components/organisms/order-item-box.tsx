import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Pressable, Modal } from "react-native";
import { getItemCount, getOrderTotalPrice, Order } from "../../services/order";
import Spacer from "../atoms/spacer";

interface BoxItemProps {
  order: Order;
}

export default function OrderItemBox({ order: order }: BoxItemProps) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Modal transparent={true} animationType="slide" visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{
                color: "green",
                textTransform: "uppercase"
              }}
            >
              {order.status}
            </Text>
            <Text style={{ color: "#808080", fontSize: 12, marginBottom: 10 }}>N° {order.id}</Text>
            {order.items.map((item, index) => (
              <View key={index} style={{ flexDirection: "row" }}>
                <Image source={{ uri: item.img }} style={{ width: 80, height: 80 }} />
                <View style={{ marginTop: 12, marginLeft: 12 }}>
                  <Text>{item.name}</Text>
                  <View style={{ flexDirection: "row" }}>
                    {item.promo ? (
                      <>
                        <Text>€{item.price * (1 - item.promo / 100) * item.quantity}</Text>
                        <Text> </Text>
                        <Text style={{ color: "#808080", textDecorationLine: 'line-through' }}>€{item.price}</Text>
                      </>
                    ) : (
                      <Text>€{item.price}</Text>
                    )}
                  </View>
                </View>
              </View>
            ))}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 10,
                marginTop: 12,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Total</Text>
              <Text style={{ fontWeight: "bold" }}>€{getOrderTotalPrice(order)}</Text>
            </View>
            <Pressable
              style={{
                alignSelf: "center",
                borderColor: "black",
                borderRadius: 100,
                borderWidth: 1,
                marginTop: 16,
                paddingHorizontal: 14,
                paddingVertical: 4,
              }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.viewMoreButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <View style={{
          height: 80,
          width: 80,
        }}>
          <Image source={{ uri: order.items[0].img }} style={styles.img} />
          {order.items.length > 1 && (
            <View style={{
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 18,
              backgroundColor: '#00000050',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}>
              <Text style={{ color: "white", fontSize: 26, fontWeight: "bold" }}>
                +{order.items.length - 1}
              </Text>
            </View>
          )}
        </View>
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text style={styles.text} numberOfLines={1}>N° {order.id}</Text>
          <Pressable
            style={styles.viewMoreButton}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.viewMoreButtonText}>View or manage</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#00000080",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
  },
  viewMoreButton: {
    color: "#fff",
    backgroundColor: "#acacac80",
    borderRadius: 6,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 8,
  },
  container: {
    flexDirection: "row",
  },
  textBox: {
  },
  upbox: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  shoesname: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#000",
    fontSize: 16,
    fontStyle: "italic",
    // fontWeight: "bold",
  },
  viewMoreButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    // borderWidth: 2,
    // borderColor: "#000",
  },
  btnPress: {
    // borderWidth: 2,
    // borderColor: "#000",
    width: 20,
    alignItems: "center",
  },
  downbox: {
    alignItems: "center",
    justifyContent: "center",
  },
  downbox2: {
    alignItems: "center",
    backgroundColor: "#00ccff5",
    flex: 1,
    flexDirection: "row",
  },
  img: {
    height: 80,
    width: 80,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#ebebeb",
    borderRadius: 18,
  },
});
