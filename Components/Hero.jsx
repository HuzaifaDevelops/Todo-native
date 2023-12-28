import { ErrorMessage, Field, Formik } from "formik";
import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Yup from "yup";
import Card from "./Card";
import CustomModal from "./Modal";

const Hero = () => {
  const [todo, setTodo] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
    const myNanoID = generateNanoID();
    const todosWithId = { ...values, id: myNanoID };
    // console.log(todosWithId)
    setTodo([...todo, todosWithId]);
    actions.resetForm();
  };
  return (
    <>
      <View style={{}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalText}>Add ToDo</Text>
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
      </View>
      <View style={{ flex: 2 }}>
        <View style={{ margin: 20 }}>
          <Text style={styles.modalText}>Your ToDos</Text>
          {!todo?.length && (
            <View style={styles.section}>
              <Text style={styles.errorMessage}>No todo's available</Text>
            </View>
          )}

          {!!todo?.length && (
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
                    todo={todo}
                  />
                )}
                keyExtractor={(item) => item.id}
              />
            </SafeAreaView>
          )}
        </View>
        <CustomModal
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

export default Hero;

const styles = StyleSheet.create({
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
    width: "90%",
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
    // fontFamily: "arial",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 15,
  },

  container: {
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
