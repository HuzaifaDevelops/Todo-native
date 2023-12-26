import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import CustomModal from "./Modal";
const Card = ({ title, description, id, allData, setTodo }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <View style={styles.card} key={id}>
        <View style={styles.cardHeader}>
          <Text style={styles.heading}>{title}</Text>
          <Icon.Button
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
        input={false}
        options={true}
        id={id}
        data={allData}
        setTodo={setTodo}
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    fontFamily: "arial",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
  },
});

export default Card;
