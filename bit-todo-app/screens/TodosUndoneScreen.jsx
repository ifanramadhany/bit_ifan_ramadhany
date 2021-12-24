import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { Input } from "react-native-elements";
import { FontAwesome } from "react-native-vector-icons";
import { ItemTodoUndone } from "./components";
import { BlurView } from "expo-blur";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, createNewTodo, searchByTitle, clearAllSearch } from "../store/actions/todoAction";
import { UIActivityIndicator } from "react-native-indicators";

export default function TodosUndoneScreen() {
  const dispatch = useDispatch();

  const [modalAdd, setModalAdd] = useState(false);

  const { todos, isLoading, isError } = useSelector((state) => state.todoState);

  const [userInputCreate, setUserInputCreate] = useState({
    id: "",
    title: "",
    description: "",
    completed: false,
  });

  const [searchData, setSearchData] = useState({
    search_by_title: "",
  });

  const onChangeSearchData = (val, key) => {
    const newObj = { ...searchData };
    newObj[key] = val;
    setSearchData(newObj);
  };

  const onChangeInputCreate = (val, key) => {
    const newObj = { ...userInputCreate };
    newObj[key] = val;
    newObj["id"] = todos[0].id + 1;
    setUserInputCreate(newObj);
  };

  const handleCreateTodo = () => {
    // console.log('ini di undone', userInputCreate);
    dispatch(createNewTodo(userInputCreate))
    setModalAdd(false)
    clearSearchHandler()
  }

  const searchDataByTitleHandler = () => {
    // console.log(searchData.search_by_title);
    dispatch(searchByTitle(searchData.search_by_title))
  }

  const clearSearchHandler = () => {
    dispatch(clearAllSearch())
    setSearchData({
      search_by_title: "",
    })
  }

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <View style={styles.container}>
      {isError ? (
        <View style={styles.whenError}>
          <Text style={{ fontSize: 20, color: "#DC2626" }}>
            Ooops! Something went wrong.
          </Text>
        </View>
      ) : null}
      {isLoading ? (
        <UIActivityIndicator color="#2c3e50" size={80} />
      ) : (
        <>
          <View style={styles.wrapperSearch}>
            <View style={styles.wrapperInputSearch}>
              <Input
                inputContainerStyle={{ borderBottomWidth: 0 }}
                inputStyle={{ fontSize: 15 }}
                placeholder="Search.."
                placeholderTextColor="#9CA3AF"
                value={searchData.search_by_title}
                onChangeText={(val) => onChangeSearchData(val, "search_by_title")}
                leftIcon={
                  <TouchableOpacity onPress={searchDataByTitleHandler}>
                    <FontAwesome
                      name="search"
                      size={25}
                      color="#374151"
                      style={{ marginRight: 12 }}
                    />
                  </TouchableOpacity>
                }
                rightIcon={
                  <TouchableOpacity onPress={clearSearchHandler}>
                    <FontAwesome name="times" size={23} color="#374151" />
                  </TouchableOpacity>
                }
              />
            </View>
            <View style={styles.wrapperAddTodoButton}>
              <TouchableOpacity
                style={styles.buttonAdd}
                onPress={() => setModalAdd(true)}
              >
                <FontAwesome name="plus" size={23} color="#374151" />
              </TouchableOpacity>
            </View>
          </View>
          {/* item todos */}
          <FlatList
            style={styles.wrapperAllItem}
            contentContainerStyle={{ display: "flex", alignItems: "center" }}
            data={todos.filter(el => el.completed === false)}
            renderItem={({ item }) => <ItemTodoUndone clearSearchHandler={clearSearchHandler} item={item} />}
            keyExtractor={(item) => item.id}
          ></FlatList>

          {/* modal add  */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalAdd}
            onRequestClose={() => {
              setModalAdd(!modalAdd);
            }}
          >
            <BlurView tint="dark" intensity={70} style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.titleAddData}>
                  <Text style={{ fontWeight: "bold" }}>Create New Todo</Text>
                </View>
                <View style={styles.formDataAdd}>
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
                    <View style={styles.wrapperInputUserTitle}>
                      <Input
                        inputContainerStyle={{
                          borderBottomWidth: 0,
                          marginTop: 3,
                        }}
                        inputStyle={{ fontSize: 15 }}
                        placeholder="todos title.."
                        placeholderTextColor="#9CA3AF"
                        onChangeText={(val) => onChangeInputCreate(val, "title")}
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
                    <View style={styles.wrapperInputUserDescription}>
                      <Input
                        multiline={true}
                        numberOfLines={4}
                        inputContainerStyle={{
                          borderBottomWidth: 0,
                          marginTop: 10,
                        }}
                        inputStyle={{ fontSize: 15 }}
                        placeholder="todos description.."
                        placeholderTextColor="#9CA3AF"
                        textAlignVertical="top"
                        onChangeText={(val) => onChangeInputCreate(val, "description")}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.buttons}>
                  <TouchableOpacity
                    style={styles.buttonCloseAdd}
                    onPress={() => setModalAdd(false)}
                  >
                    <Text style={{ fontSize: 21, color: "white" }}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonCreateAdd} onPress={handleCreateTodo}>
                    <Text style={{ fontSize: 21, color: "white" }}>Create</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </BlurView>
          </Modal>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  whenError: {
    // backgroundColor: 'blue',
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapperInputUserDescription: {
    width: "100%",
    borderRadius: 10,
    borderColor: "#9CA3AF",
    borderWidth: 1.5,
  },
  wrapperInputUserTitle: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    borderColor: "#9CA3AF",
    borderWidth: 1.5,
  },
  wrapperAllItem: {
    flex: 1,
    marginTop: 8,
    // backgroundColor: "pink",
  },
  buttonAdd: {
    backgroundColor: "#F9FAFB",
    height: 40,
    width: 40,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#374151",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapperAddTodoButton: {
    // backgroundColor: "blue",
    width: "20%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapperInputSearch: {
    width: "80%",
    height: "100%",
    borderRadius: 15,
    borderColor: "#9CA3AF",
    borderWidth: 1.5,
  },
  wrapperSearch: {
    // backgroundColor: "red",
    height: 50,
    marginVertical: 10,
    marginHorizontal: 4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#E5E7EB",
  },
  // add modal
  buttonCloseAdd: {
    backgroundColor: "#6B7280",
    height: 40,
    width: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonCreateAdd: {
    backgroundColor: "#2563EB",
    height: 40,
    width: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  titleAddData: {
    height: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  formDataAdd: {
    // backgroundColor: "blue",
    height: "85%",
  },
  buttons: {
    // backgroundColor: 'green',
    height: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
  },
  modalView: {
    height: 350,
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
