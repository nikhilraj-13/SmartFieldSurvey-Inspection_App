import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useSurvey } from "../../context/SurveyContext";
import Header from "../../components/header";
import MyInput from "../../components/MyInput";
import MyButton from "../../components/MyButton";

export default function CreateSurvey() {
  const router = useRouter();
  const { addSurvey } = useSurvey();
  const [siteName, setSiteName] = useState("");
  const [clientName, setClientName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState("");

  const submitSurvey = () => {
    if (
      siteName === "" ||
      clientName === "" ||
      description === "" ||
      priority === "" ||
      date === ""
    ) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    addSurvey({
      site: siteName,
      client: clientName,
      priority,
      description,
      date
    });

    Alert.alert("Success", "Survey Created Successfully!");

    setSiteName("");
    setClientName("");
    setDescription("");
    setPriority("");
    setDate("");
    
    router.push("/(tabs)/history");
  };

  return (
    <ScrollView style={styles.container}>
      <Header title="Create Survey" />
      <View style={styles.form}>
        <Text style={styles.label}>Site Name</Text>
        <MyInput
          placeholder="Enter Site Name"
          value={siteName}
          onChangeText={setSiteName}
        />
        <Text style={styles.label}>Client Name</Text>
        <MyInput
          placeholder="Enter Client Name"
          value={clientName}
          onChangeText={setClientName}
        />
        <Text style={styles.label}>Description</Text>
        <MyInput
          placeholder="Enter Description"
          value={description}
          onChangeText={setDescription}
        />
        <Text style={styles.label}>Priority</Text>
        <MyInput
          placeholder="High / Medium / Low"
          value={priority}
          onChangeText={setPriority}
        />
        <Text style={styles.label}>Date</Text>
        <MyInput
          placeholder="DD/MM/YYYY"
          value={date}
          onChangeText={setDate}
        />
        <MyButton
          title="Submit Survey"
          onPress={submitSurvey}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
});