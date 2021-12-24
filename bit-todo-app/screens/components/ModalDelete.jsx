import React, { useState } from "react";
import { FontAwesome } from "react-native-vector-icons";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { BlurView } from "expo-blur";
import { deleteTodo } from "../../store/actions/todoAction";
import { useSelector, useDispatch } from "react-redux";


export default function ModalDelete({id, item, modalDelete, modalDeleteClose, clearSearchHandler}) {
  const dispatch = useDispatch();

  const deleteTodoHandler = () => {
    // console.log(item.id);
    dispatch(deleteTodo(item.id))
    modalDeleteClose()
    clearSearchHandler()
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalDelete}
      onRequestClose={() => {
        setModalDelete(!modalDelete);
      }}
    >
      <BlurView tint="dark" intensity={70} style={styles.centeredViewDelete}>
        <View style={styles.modalViewDelete}>
          <View style={styles.titleDelete}>
            <Text style={{ fontWeight: "bold", fontSize: 19 }}>Are you sure to delete</Text>
            <Text style={{ fontWeight: "bold", fontSize: 19 }}>data with ID: {id}?</Text>
          </View>

          <View style={styles.buttonsDelete}>
            <TouchableOpacity
              style={styles.buttonCloseDelete}
              onPress={modalDeleteClose}
            >
              <Text style={{ fontSize: 21, color: "white" }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonDelete} onPress={deleteTodoHandler}>
              <Text style={{ fontSize: 21, color: "white" }}>Yes, Delete!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttonCloseDelete: {
    backgroundColor: "#6B7280",
    height: 40,
    width: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDelete: {
    backgroundColor: "#B91C1C",
    height: 40,
    width: 150,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  titleDelete: {
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'yellow'
  },
  
  buttonsDelete: {
    // backgroundColor: 'green',
    height: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  centeredViewDelete: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
  },
  modalViewDelete: {
    height: 140,
    width: "85%",
    margin: 20,
    backgroundColor: "#FCA5A5",
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
