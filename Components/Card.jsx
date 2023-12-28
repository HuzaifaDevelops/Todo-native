import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import CustomModal from "./Modal";
const Card = ({ title, description, id, allData, setTodo, todo }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <View style={styles.card} key={id}>
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
      </View>
      <CustomModal
        showModal={showModal}
        setShowModal={setShowModal}
        id={id}
        data={allData}
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
    padding: 15,
    margin: 10,
    boxShadow: " 0px 0px 2px 0px rgba(0,0,0,0.75)",
  },

  cardHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  options: {
    padding: 0,
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
