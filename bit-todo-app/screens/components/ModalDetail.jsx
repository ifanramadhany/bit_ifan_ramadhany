import React, {useState} from "react";
import { FontAwesome } from "react-native-vector-icons";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { BlurView } from "expo-blur";

export default function ModalDetail({item, modalDetail, modalDetailClose, modalEditOpen}) {

  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalDetail}
      >
        <BlurView tint="dark" intensity={70} style={styles.centeredViewDetail}>
          <View style={styles.modalViewDetail}>
            <View style={styles.formDetail}>
              <View style={{ marginVertical: 5 }}>
                <Text
                  style={{
                    fontSize: 21,
                    fontStyle: "italic",
                    marginLeft: 10,
                    marginBottom: 3,
                  }}
                >
                  Title
                </Text>
                <View style={styles.wrapperDetailTitle}>
                  <Text style={{fontSize: 18, margin: 5, color: "#4B5563"}}>{item.title}</Text>
                </View>
              </View>
              <View style={{ marginVertical: 5 }}>
                <Text
                  style={{
                    fontSize: 21,
                    fontStyle: "italic",
                    marginLeft: 10,
                    marginBottom: 3,
                  }}
                >
                  Description
                </Text>
                <View style={styles.wrapperDetailDescription}>
                  <Text style={{fontSize: 18, margin: 5, color: "#4B5563"}}>{item.description}</Text>
                </View>
              </View>
            </View>
            <View style={styles.buttonsDetail}>
              <TouchableOpacity
                style={styles.buttonCloseDetailModal}
                onPress={modalDetailClose}
              >
                <Text style={{ fontSize: 21, color: "white" }}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonDetailEdit} onPress={modalEditOpen}>
              <FontAwesome
                  name="edit"
                  size={27}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </Modal>
  )
}

const styles = StyleSheet.create({
  wrapperDetailDescription: {
    width: "100%",
  },
  wrapperDetailTitle: {
    width: "100%",
  },
  buttonCloseDetailModal: {
    backgroundColor: "#6B7280",
    height: 40,
    width: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDetailEdit: {
    backgroundColor: "#2563EB",
    height: 40,
    width: 55,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  formDetail: {
    // backgroundColor: "blue",
    height: "90%",
  },
  buttonsDetail: {
    // backgroundColor: 'green',
    height: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  centeredViewDetail: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
  },
  modalViewDetail: {
    height: 360,
    width: "85%",
    margin: 20,
    backgroundColor: "#EFF6FF",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
});