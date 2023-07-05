import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Modal, TextInput, FlatList, TouchableOpacity, Keyboard } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import filter from 'lodash/filter';
import { colors } from '../global/styles';

import CategoryController from '../backend/controllers/CategoryController';

export default function SearchAdminCategory() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [textInputFocused, setTextInputFocused] = useState(true);
  const textInput = useRef(null);
  const [categoryList, setCategoryList] = useState([]);
  const [data, setData] = useState([]);

  const loadCategoryList = async () => {
    try {
      const categories = await CategoryController.getCategoryList();
      setCategoryList(categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCategoryList();
  }, []);

  const contains = ({ name }, query) => {
    if (name.includes(query)) {
      return true;
    }
    return false;
  };

  const handleSearch = text => {
    const dataS = filter(categoryList, userSearch => {
      return contains(userSearch, text);
    });

    setData(dataS);
  };

  return (
    <View style={{ alignItems: "center" }}>
      <TouchableWithoutFeedback
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <View style={styles.SearchArea}>
          <Icon
            name="search"
            style={styles.searchIcon}
            type="material"
            iconStyle={{ marginLeft: 5 }}
            size={32}
          />
          <Text style={{ fontSize: 15 }}>What are you looking for?</Text>
        </View>
      </TouchableWithoutFeedback>

      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
      >
        <View style={styles.modal}>
          <View style={styles.view1}>
            <View style={styles.TextInput}>
              <Animatable.View
                animation={textInputFocused ? "fadeInRight" : "fadeInLeft"}
                duration={400}
              >
                <Icon
                  name={textInputFocused ? "arrow-back" : "search"}
                  onPress={() => {
                    if (textInputFocused) {
                      setModalVisible(false);
                    }
                    setTextInputFocused(true);
                  }}
                  style={styles.icon2}
                  type="material"
                  iconStyle={{ marginRight: 5 }}
                />
              </Animatable.View>

              <TextInput
                style={{ width: "90%" }}
                placeholder=""
                autoFocus={false}
                ref={textInput}
                onFocus={() => {
                  setTextInputFocused(true);
                }}
                onBlur={() => {
                  setTextInputFocused(false);
                }}
                onChangeText={handleSearch}
              />

              <Animatable.View
                animation={textInputFocused ? "fadeInLeft" : ""}
                duration={400}
              >
                <Icon
                  name={textInputFocused ? "cancel" : null}
                  iconStyle={{ color: colors.grey3 }}
                  type="material"
                  style={{ marginRight: -10 }}
                  onPress={() => {
                    textInput.current.clear();
                  }}
                />
              </Animatable.View>
            </View>
          </View>

          {/* Danh sách kết quả tìm kiếm */}
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  Keyboard.dismiss();
                  navigation.navigate("SearchCategoryResultScreen", { item: item._name });
                  setModalVisible(false);
                  setTextInputFocused(true);
                }}
              >
                <View style={styles.view2}>
                  <Text style={{ color: colors.primary_normal, fontSize: 15 }}>{item._name}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item._id}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text1: {
    color: colors.primary_light,
    fontSize: 16
  },
  TextInput: {
    borderWidth: 1,
    borderRadius: 12,
    marginHorizontal: 0,
    borderColor: "#86939e",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10
  },
  SearchArea: {
    marginTop: 10,
    width: "94%",
    height: 50,
    backgroundColor: colors.cardbackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary_bold,
    flexDirection: "row",
    alignItems: "center"
  },
  searchIcon: {
    fontSize: 24,
    padding: 5,
    color: colors.primary_normal
  },
  view1: {
    height: 70,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  view2: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center'
  },
  icon2: {
    fontSize: 24,
    padding: 5,
    color: colors.primary_normal
  },
  modal: {
    flex: 1
  }
});