import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  SafeAreaView,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const CustomModal = ({
  setShowModal,
  showModal,
  todo,
  setTodo,
  input,
  options,
  id,
  data,
}) => {
  const [editModal, setEditModal] = useState(false);
  const [filtered, setFiltered] = useState();

  const handleFormSubmit = (values, actions) => {
    const todosWithId = { ...values, id: todo.length + 1 };
    // console.log(todosWithId)
    setTodo([...todo, todosWithId]);
    actions.resetForm();
    setShowModal(!showModal);
  };

  const editTodo = () => {
    // it filters and gives that todo which user wanna edit
    const selected = data.filter((todo) => todo.id === id);
    setFiltered(selected);
    // setShowModal(!showModal);
    setEditModal(true);
  };
  const deleteTodo = () => {
    const filtered = data.filter((todo) => todo.id !== id);
    console.log(filtered);
    setTodo(filtered);
    setShowModal(!showModal);
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
          {input && (
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.modalHeader}>
                  <h3 style={styles.modalText}>Add ToDo</h3>
                  <Icon.Button
                    name="close"
                    color={"black"}
                    backgroundColor={"transparent"}
                    style={styles.closeBtn}
                    onPress={() => setShowModal(!showModal)}
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
                        <Form>
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
                        </Form>
                      )}
                    </Formik>
                  </SafeAreaView>
                </View>
              </View>
            </View>
          )}

          {options && (
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

          {/* {editModal && (
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.modalHeader}>
                  <h3 style={styles.modalText}>Edit ToDo</h3>
                  <Icon.Button
                    name="close"
                    color={"black"}
                    backgroundColor={"transparent"}
                    style={styles.closeBtn}
                    onPress={() => setShowModal(!showModal)}
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
                        <Form>
                          {console.log(filtered)}
                          <View style={styles.container}>
                            <Field
                              name="title"
                              component={TextInput}
                              style={styles.input}
                              placeholder="Add title"
                              onBlur={handleBlur("title")}
                              value={filtered[0].title}
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
                              value={filtered[0].desc}
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
                        </Form>
                      )}
                    </Formik>
                  </SafeAreaView>
                </View>
              </View>
            </View>
          )} */}
        </Modal>
      </View>
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  },

  modalBody: {
    justifyContent: "center",
  },

  modalText: {
    fontFamily: "arial",
    marginBottom: 15,
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
