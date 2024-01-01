import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import CustomModal from "./Modal";
const Card = ({ title, description, id, setTodo, todo }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <Pressable style={styles.card} onLongPress={openModal}>
        <View style={styles.cardHeader}>
          <Text style={styles.heading}>{title}</Text>
          <Entypo
            name="dots-three-vertical"
            size={15}
            color={"black"}
            backgroundColor={"transparent"}
            style={styles.options}
            onPress={openModal}
          />
        </View>
        <Text style={styles.description}>{description}</Text>
      </Pressable>
      <CustomModal
        showModal={showModal}
        setShowModal={setShowModal} 
        id={id}
        setTodo={setTodo}
        todo={todo}
      />
    </>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 5,
    marginTop: 10,
    borderColor: "#b2b4b8",
    borderWidth: 2,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  options: {
    // paddingHorizontal: 7,
    padding: 7,
  },

  heading: {
    // fontFamily: "arial",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
  },
});
