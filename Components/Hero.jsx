import React, { useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  Pressable,
  FlatList,
  Platform,
  SafeAreaView,
} from "react-native";
import { ErrorMessage, Field, Formik } from "formik";
import { Entypo } from "@expo/vector-icons";
import * as Yup from "yup";
import Card from "./Card";

const Hero = () => {
  const [todo, setTodo] = useState([]);
  // {title: 'todo', desc: "desc21", id: 21}
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
      <SafeAreaView style={styles.container}>
        <View style={{}}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Add Todo</Text>
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
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                  <View style={styles.inputs}>
                    <TextInput
                      selectionColor={"black"}
                      placeholder="Enter Your Username"
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
                      caretHidden={false}
                      selectionColor={"black"}
                      placeholder="Enter Description"
                      onChangeText={handleChange("desc")}
                      // onBlur={handleBlur("desc")}
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
                    <Text style={{ color: "white" }}>Submit</Text>
                  </Pressable>
                </KeyboardAvoidingView>
              </>
            )}
          </Formik>
        </View>

        <View style={{ flex: 1, paddingVertical: 20 }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Your ToDos</Text>

            {/* <Pressable style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.heading}>Title</Text>
                <Entypo
                  name="dots-three-vertical"
                  size={15}
                  color={"black"}
                  backgroundColor={"transparent"}
                  style={styles.options}
                  // onPress={openModal}
                />
              </View>
              <Text style={styles.description}>description</Text>
            </Pressable> */}

            <FlatList
              data={todo}
              renderItem={({ item }) => (
                <>
                  <Card
                    title={item.title}
                    description={item.desc}
                    id={item.id}
                    setTodo={setTodo}
                    todo={todo}
                  />
                </>
              )}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={
                <View>
                  <Text style={{ color: "red" }}>No todo's available</Text>
                </View>
              }
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Hero;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    padding: 16,
    paddingHorizontal: 20,
  },

  inputs: {
    marginVertical: 3,
  },

  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    // marginBottom: ,
  },

  buttonClose: {
    backgroundColor: "#2196F3",
    padding: 10,
    width: 70,
    borderRadius: 10,
  },

  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },

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
