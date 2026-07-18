import { View, Text, StyleSheet } from "react-native";
import Header from "../../components/header";

export default function Profile() {
    return (
        <View style={styles.container}>
            <Header title="Profile" />
            <View style={styles.bg}>
                <Text style={styles.avtar}>👨‍💻</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.text}>
                    Student Name : Nikhil Raj
                </Text>
                <Text style={styles.text}>
                    Course : React Native
                </Text>
                <Text style={styles.text}>
                    Project : Smart Field Survey App
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  bg: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 20,
  },

  avatar: {
    width: 200,
    height: 200,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#282222",
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 5, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});