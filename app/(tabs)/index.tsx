import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../../components/header";
import SurveyCard from "../../components/SurveyCard";
import MyButton from "../../components/MyButton";

export default function Dashboard() {

  const todaySurvey = 5;

  return (
    <ScrollView style={styles.container}>

      <Header title="Smart Survey App" />

      <View style={styles.box}>
        <Text style={styles.heading}>Welcome 👋</Text>
        <Text>Name : Nikhil Raj</Text>
        <Text>Enrollment : 23CE001</Text>
        <Text>Course : React Native</Text>
      </View>

      <View style={styles.countBox}>
        <Text style={styles.count}>{todaySurvey}</Text>
        <Text>Today's Surveys</Text>
      </View>

      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <View style={styles.row}>

        <View style={styles.card}>
          <Text style={styles.icon}>📝</Text>
          <Text>New Survey</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.icon}>📷</Text>
          <Text>Camera</Text>
        </View>

      </View>

      <View style={styles.row}>

        <View style={styles.card}>
          <Text style={styles.icon}>📍</Text>
          <Text>Location</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.icon}>👥</Text>
          <Text>Contacts</Text>
        </View>

      </View>


      <Text style={styles.sectionTitle}>Recent Survey</Text>

      <SurveyCard
        site="ABC Construction"
        client="Mr. Patel"
        priority="High"
      />

      <SurveyCard
        site="Sunrise Mall"
        client="Reliance"
        priority="Medium"
      />

      <MyButton
        title="Create New Survey"
        onPress={() => alert("Navigate to Survey Screen")}
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  box: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 4,
  },

  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  countBox: {
    backgroundColor: "#2196F3",
    marginHorizontal: 15,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  count: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#fff",
    width: 150,
    height: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },

  icon: {
    fontSize: 35,
    marginBottom: 10,
  },

});