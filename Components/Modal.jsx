import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const CustomModal = ({ setShowModal, showModal, data, setTodo, id, todo }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const editTodo = () => {
    const filter = data?.filter((item) => item.id === id);
    setFiltered(filter);
    setShowModal(!showModal);
    setModalVisible(!modalVisible);
  };
  const deleteTodo = () => {
    const filter = todo?.filter((item) => item.id !== id);
    setTodo(filter);
  };

  function generateNanoID(size = 21) {
    const alphabet =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const nanoID = [];
    const max = Math.floor(alphabet.length);

    for (let i = 0; i < size; i++) {
      const randomIndex = Math.floor(Math.random() * max);
      nanoID.push(alphabet[randomIndex]);
    }

    return nanoID.join("");
  }

  const handleFormSubmit = (values, actions) => {
    const nanoID = generateNanoID();
    const todosWithId = { ...values, id: nanoID };
    const filter = todo?.filter((item) => item.id !== id);
    const finalTodo = [...filter, todosWithId];
    setTodo(finalTodo);
    actions.resetForm();
  };
  return (
    <>
      {showModal && (
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
              setShowModal(!showModal);
            }}
          >
            <View style={styles.centeredView}>
              <View style={[styles.modalView]}>
                <Icon.Button
                  name="close"
                  color={"black"}
                  backgroundColor={"transparent"}
                  onPress={() => setShowModal(!showModal)}
                />
                <View style={[styles.modalOptions]}>
                  <Pressable style={styles.modalOption} onPress={editTodo}>
                    <Text>Edit</Text>
                    <Icon name="edit" style={styles.optionIcon} />
                  </Pressable>
                  <Pressable style={styles.modalOption} onPress={deleteTodo}>
                    <Text>Delete</Text>
                    <Icon
                      name="delete"
                      style={[styles.optionIcon, styles.deleteIcon]}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}

      {modalVisible && (
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={[styles.modalView, { padding: 20 }]}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalText}>Edit ToDo</Text>
                  <Icon.Button
                    name="close"
                    color={"black"}
                    backgroundColor={"transparent"}
                    style={styles.closeBtn}
                    onPress={() => setModalVisible(!modalVisible)}
                  />
                </View>
                <View style={styles.modalBody}>
                  <Formik
                    initialValues={{
                      title: "",
                      desc: "",
                    }}
                    validationSchema={Yup.object({
                      title: Yup.string()
                        .min(2, "Too Short!")
                        .max(50, "Too Long!")
                        .required("Title is required"),
                      desc: Yup.string()
                        .min(2, "Too Short!")
                        .max(50, "Too Long!")
                        .required("Description is required"),
                    })}
                    onSubmit={handleFormSubmit}
                  >
                    {({
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      errors,
                      touched,
                      values,
                    }) => (
                      <>
                        <KeyboardAvoidingView
                          behavior={
                            Platform.OS === "ios" ? "padding" : "height"
                          }
                        >
                          <View style={styles.inputs}>
                            <TextInput
                              selectionColor={"black"}
                              placeholder="Enter name"
                              onChangeText={handleChange("title")}
                              // onBlur={handleBlur("title")}
                              value={values.title}
                              style={styles.textInput}
                            />
                            <Text style={{ color: "red" }}>
                              {touched.title && errors.title}
                            </Text>
                          </View>
                          <View style={styles.inputs}>
                            <TextInput
                              selectionColor={"black"}
                              placeholder="Enter Description "
                              onChangeText={handleChange("desc")}
                              // onBlur={handleBlur("title")}
                              value={values.desc}
                              style={styles.textInput}
                            />
                            <Text style={{ color: "red" }}>
                              {touched.desc && errors.desc}
                            </Text>
                          </View>
                          <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={handleSubmit}
                          >
                            <Text style={styles.textStyle}>Submit</Text>
                          </Pressable>
                        </KeyboardAvoidingView>
                      </>
                    )}
                  </Formik>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "flex-end",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 14,
    padding: 10,
    elevation: 2,
  },

  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    // marginBottom: ,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    // backgroundColor: "gray",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginTop: 8,
  },

  modalOptions: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },

  optionText: {
    marginLeft: 10,
    fontSize: 18,
  },

  deleteText: {
    color: "red",
  },

  optionIcon: {
    fontSize: 20,
    marginLeft: 13,
  },

  closeBtn: {
    paddingRight: 0,
  },

  deleteIcon: {
    color: "red",
  },
});
