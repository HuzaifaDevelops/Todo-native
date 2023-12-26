import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  TextInput,
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
} from "react-native";
import Modal from "./Modal";
import Card from "./Card";

const Topbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [todo, setTodo] = useState([]);

  const addTodo = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <View style={styles.main}>
        <View style={styles.topbar}>
          <Text style={styles.logo}>ToDo App</Text>
          <View style={styles.addBtn}>
            <Icon.Button
              name="plus"
              backgroundColor={"transparent"}
              onPress={addTodo}
            />
          </View>
        </View>

        {/* <Card title={"todo"} description={"desc"} id={"1"} />
        <Card title={"todo1"} description={"desc1"} id={"2"} />
        <Card title={"todo"} description={"desc"} id={"3"} />
        <Card title={"todo"} description={"desc"} id={"4"} />
        <Card title={"todo"} description={"desc"} id={"5"} />
        <Card title={"todo"} description={"desc"} id={"6"} /> */}

        <View>
          {todo.length === 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTxt}>No todo's available</Text>
            </View>
          ) : (
            <SafeAreaView style={styles.container}>
              <FlatList
                data={todo}
                renderItem={({ item }) => (
                  <Card
                    title={item.title}
                    description={item.desc}
                    id={item.id}
                    allData={todo}
                    setTodo={setTodo}
                  />
                )}
                keyExtractor={(item) => item.id}
              />
            </SafeAreaView>
          )}
        </View>
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          todo={todo}
          setTodo={setTodo}
          input={true}
          options={false}
        />
      </View>
    </>
  );
};

export default Topbar;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "space-between",
  },
  topbar: {
    backgroundColor: "#99ccff",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
  },
  logo: {
    fontFamily: "arial",
    fontSize: "18px",
    marginTop: "8px",
    color: "white",
  },
  addBtn: {},
  section: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTxt: {
    fontSize: "18px",
    color: "red",
  },
});
