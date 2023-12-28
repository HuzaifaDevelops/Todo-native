import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  Pressable,
} from "react-native";
import Hero from "./Hero";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Main = () => {
  const [showModal, setShowModal] = useState(false);
  const [todo, setTodo] = useState([]);

  const addTodo = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <StatusBar backgroundColor="#99ccff" hidden />
      <View style={styles.container}>
        <View>
          <View style={styles.topbar}>
            <Text style={styles.logo}>ToDo App</Text>
            <View style={styles.addBtn}></View>
          </View>
          <Hero />
          {/* <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyCont}
          >
            <Pressable onPress={Keyboard.dismiss}>
              <View style={styles.inner}>
                <Hero />
              </View>
            </Pressable>
          </KeyboardAvoidingView> */}
        </View>
      </View>
      {/* <SafeAreaView style={styles.main}>
      </SafeAreaView> */}
    </>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignContent: "center",
  },
  topbar: {
    backgroundColor: "#99ccff",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  logo: {
    // fontFamily: "arial",
    fontSize: 18,
    fontWeight: "600",
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
    fontSize: 18,
    color: "red",
  },

  keyCont: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
});
