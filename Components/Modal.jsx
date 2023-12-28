import React, { useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
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
    const filter = data?.filter((item) => item.id !== id);
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
    const filter = data?.filter((item) => item.id !== id);
    const finalTodo = [...filter, todosWithId];
    setTodo(finalTodo);
    actions.resetForm();
  };
  return (
    <>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(!showModal)}
        >
          {/* {input && (
            
          )} */}

          {showModal && (
            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setShowModal(!showModal);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Icon.Button
                      name="close"
                      color={"black"}
                      backgroundColor={"transparent"}
                      size={15}
                      style={{
                        justifyContent: "flex-end",
                      }}
                      onPress={() => setShowModal(!showModal)}
                    />
                    <View style={styles.modal}>
                      <Pressable style={styles.modalOption} onPress={editTodo}>
                        <Text>Edit</Text>
                        <Icon
                          name="edit"
                          style={{ marginTop: 2, marginLeft: 20 }}
                        />
                      </Pressable>
                      <Pressable
                        style={styles.modalOption}
                        onPress={deleteTodo}
                      >
                        <Text>Delete</Text>
                        <Icon
                          name="delete"
                          style={{ marginTop: 2, marginLeft: 8, color: "red" }}
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          )}
        </Modal>
      </View>

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
                  <SafeAreaView>
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
                      {({ handleChange, handleBlur, handleSubmit, values }) => (
                       <>
                          <View style={styles.container}>
                            <Field
                              name="title"
                              component={TextInput}
                              style={styles.input}
                              placeholder="Add title"
                              onBlur={handleBlur("title")}
                              value={values.title}
                              onChangeText={handleChange("title")}
                            />
                            <ErrorMessage
                              name="title"
                              component="div"
                              style={styles.errorMessage}
                            />
                          </View>
                          <View style={styles.container}>
                            <Field
                              name="title"
                              component={TextInput}
                              style={styles.input}
                              placeholder="Add description"
                              onBlur={handleBlur("title")}
                              value={values.desc}
                              onChangeText={handleChange("desc")}
                            />
                            <ErrorMessage
                              name="desc"
                              component="div"
                              style={styles.errorMessage}
                            />
                          </View>
                          <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={handleSubmit}
                          >
                            <Text style={styles.textStyle}>Submit</Text>
                          </Pressable>
                          </>
                      )}
                    </Formik>
                  </SafeAreaView>
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
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    boxShadow: "1px 7px 44px -18px rgba(0,0,0,0.75)",
    padding: 10,
  },
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    width: 100,
    alignItems: "center",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },

  closeBtn: {
    flex: 1,
    margin: 0,
    padding: 0,
    justifyContent: "center",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },

  modalBody: {
    justifyContent: "center",
  },

  modalText: {
    // fontFamily: "arial",
    fontSize: 18,
    fontWeight: 600,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },

  errorMessage: {
    color: "red",
  },

  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalOption: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
