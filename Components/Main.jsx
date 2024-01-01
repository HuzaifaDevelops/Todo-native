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
      {/* <StatusBar backgroundColor="#99ccff" /> */}
      <Hero />
    </>
  );
};

export default Main;
