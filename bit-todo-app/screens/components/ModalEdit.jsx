import React, {useState} from "react";
import { FontAwesome } from "react-native-vector-icons";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { BlurView } from "expo-blur";
import { Input } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import { useSelector, useDispatch } from "react-redux";
import { editTodo } from "../../store/actions/todoAction";

export default function ModalEdit({item, modalEdit, modalEditClose, clearSearchHandler}) {
  const dispatch = useDispatch();

  const [userInputEdit, setUserInputEdit] = useState({
    id: item.id,
    title: item.title,
    description: item.description,
    completed: item.completed,
  });

  const onChangeInputEdit = (val, key) => {
    const newObj = { ...userInputEdit };
    newObj[key] = val;
    setUserInputEdit(newObj);
  };

  const handleEditTodo = () => {
    // console.log('ini di done', userInputEdit);
    dispatch(editTodo(userInputEdit))
    modalEditClose()
    clearSearchHandler()
  }

  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalEdit}
        
      >
        <BlurView tint="dark" intensity={70} style={styles.centeredViewEdit}>
          <View style={styles.modalViewEdit}>
            <View style={styles.titleEditData}>
              <Text style={{ fontWeight: "bold" }}>Edit Data Todo with ID: {item.id}</Text>
            </View>
            <View style={styles.formDataEdit}>
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
                <View style={styles.wrapperInputUserTitleEdit}>
                  <Input
                    inputContainerStyle={{ borderBottomWidth: 0, marginTop: 3 }}
                    inputStyle={{ fontSize: 15 }}
                    onChangeText={(val) => onChangeInputEdit(val, "title")}
                    value={userInputEdit.title}
                    placeholderTextColor="#9CA3AF"
                  />
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
                <View style={styles.wrapperInputUserDescriptionEdit}>
                  <Input
                    multiline={true}
                    numberOfLines={4}
                    inputContainerStyle={{
                      borderBottomWidth: 0,
                      marginTop: 10,
                    }}
                    inputStyle={{ fontSize: 15 }}
                    onChangeText={(val) => onChangeInputEdit(val, "description")}
                    value={userInputEdit.description}
                    placeholderTextColor="#9CA3AF"
                    textAlignVertical="top"
                  />
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
                  Status
                </Text>
                <View style={styles.wrapperPicker}>
                  <Picker
                    itemStyle={{ color: "#60A5FA" }}
                    selectedValue={userInputEdit.completed}
                    onValueChange={(val) => onChangeInputEdit(val, "completed")}
                  >
                    <Picker.Item label="DONE" color="#059669" value={true} />
                    <Picker.Item label="UNDONE" color="#DC2626" value={false} />
                  </Picker>
                </View>
              </View>
            </View>
            <View style={styles.buttonsEdit}>
              <TouchableOpacity
                style={styles.buttonCloseEdit}
                onPress={modalEditClose}
              >
                <Text style={{ fontSize: 21, color: "white" }}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonEdit} onPress={handleEditTodo}>
                <Text style={{ fontSize: 21, color: "white" }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </Modal>
  )
}

const styles = StyleSheet.create({
  wrapperInputUserDescriptionEdit: {
    width: "100%",
    borderRadius: 10,
    borderColor: "#9CA3AF",
    borderWidth: 1.5,
  },
  wrapperInputUserTitleEdit: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    borderColor: "#9CA3AF",
    borderWidth: 1.5,
  },
  wrapperPicker: {
    borderRadius: 10,
    borderColor: "#9CA3AF",
    borderWidth: 1.5,
  },
  buttonCloseEdit: {
    backgroundColor: "#6B7280",
    height: 40,
    width: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonEdit: {
    backgroundColor: "#2563EB",
    height: 40,
    width: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  titleEditData: {
    // backgroundColor: 'yellow',
    height: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  formDataEdit: {
    // backgroundColor: "blue",
    height: "85%",
  },
  buttonsEdit: {
    // backgroundColor: 'green',
    height: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  centeredViewEdit: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
  },
  modalViewEdit: {
    height: 470,
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