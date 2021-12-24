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
import { ItemTodoDone } from "./components";
import { BlurView } from "expo-blur";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, searchByTitle, clearAllSearch } from "../store/actions/todoAction";
import { UIActivityIndicator } from "react-native-indicators";

export default function TodosDoneScreen() {
  const dispatch = useDispatch();

  const [modalAdd, setModalAdd] = useState(false);

  const [searchData, setSearchData] = useState({
    search_by_title: "",
  });

  const searchDataByTitleHandler = () => {
    // console.log(searchData.search_by_title);
    dispatch(searchByTitle(searchData.search_by_title))
  }

  const onChangeSearchData = (val, key) => {
    const newObj = { ...searchData };
    newObj[key] = val;
    setSearchData(newObj);
  };

  const clearSearchHandler = () => {
    dispatch(clearAllSearch())
    setSearchData({
      search_by_title: "",
    })
  }

  const { todos, isLoading, isError } = useSelector((state) => state.todoState);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

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
          </View>
          {/* item todos */}
          <FlatList
            style={styles.wrapperAllItem}
            contentContainerStyle={{ display: "flex", alignItems: "center" }}
            data={todos.filter((el) => el.completed === true)}
            renderItem={({ item }) => <ItemTodoDone clearSearchHandler={clearSearchHandler} item={item} />}
            keyExtractor={(item) => item.id}
          ></FlatList>
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
  wrapperAllItem: {
    flex: 1,
    marginTop: 8,
    // backgroundColor: "pink",
  },

  wrapperInputSearch: {
    width: "85%",
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
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#DBEAFE",
  },
});
