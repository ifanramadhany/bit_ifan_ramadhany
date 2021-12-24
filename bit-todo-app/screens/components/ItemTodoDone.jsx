import React, { useState } from "react";
import { FontAwesome } from "react-native-vector-icons";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { ModalDetail, ModalEdit, ModalDelete } from ".";

export default function ItemTodoDone({item, clearSearchHandler}) {
  const [modalDetail, setModalDetail] = useState(false);
  const modalDetailClose = () => setModalDetail(false);

  const [modalEdit, setModalEdit] = useState(false);
  const modalEditOpen = () => {
    setModalDetail(false);
    setModalEdit(true);
  };
  const modalEditClose = () => setModalEdit(false);

  const [modalDelete, setModalDelete] = useState(false);
  const modalDeleteClose = () => setModalDelete(false)

  return (
    <>
      <TouchableOpacity
        style={styles.wrapperItem}
        onPress={() => setModalDetail(true)}
      >
        <View style={styles.dot}>
          <View style={styles.wrapperId}>
            <Text style={{color: 'white'}}>{item.id}</Text>
          </View>
          
        </View>
        <View style={styles.itemTitle}>
          <Text numberOfLines={1} style={{ fontSize: 20 }}>
            {item.title}
          </Text>
        </View>
        <View style={styles.wrapperDeleteButton}>
          <TouchableOpacity onPress={() => setModalDelete(true)}>
            <FontAwesome name="trash" size={28} color="#DC2626" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {/* modal detail */}
      <ModalDetail
        item={item}
        modalDetail={modalDetail}
        modalDetailClose={modalDetailClose}
        modalEditOpen={modalEditOpen}
      />

      {/* modal edit */}
      <ModalEdit clearSearchHandler={clearSearchHandler} item={item} modalEdit={modalEdit} modalEditClose={modalEditClose} />

      {/* modal delete */}
      <ModalDelete clearSearchHandler={clearSearchHandler} id={item.id} item={item} modalDelete={modalDelete} modalDeleteClose={modalDeleteClose}/>
    </>
  )
}

const styles = StyleSheet.create({
  wrapperId: {
    height: 30,
    width: 30,
    backgroundColor: "#6B7280",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    // backgroundColor: 'green',
    width: "11%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    marginLeft: 3
  },
  itemTitle: {
    // backgroundColor: 'blue',
    width: "75%",
    height: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  wrapperDeleteButton: {
    // backgroundColor: 'yellow',
    width: "14%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapperItem: {
    backgroundColor: "#fff",
    width: "90%",
    height: 50,
    marginVertical: 5,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});
