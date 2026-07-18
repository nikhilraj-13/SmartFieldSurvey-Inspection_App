import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  RefreshControl,
  Alert,
} from "react-native";

import * as Contacts from "expo-contacts";
import * as Clipboard from "expo-clipboard";

import Header from "../../components/header";
import MyButton from "../../components/MyButton";

export default function ContactsScreen() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission Denied");
      return;
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers],
    });

    setContacts(data);
  };

  const refreshContacts = async () => {
    setRefreshing(true);
    await getContacts();
    setRefreshing(false);
  };

  const copyNumber = async (number) => {
    if (!number) {
      Alert.alert("No Number Available");
      return;
    }

    await Clipboard.setStringAsync(number);

    Alert.alert("Copied", "Phone number copied.");
  };

  const filteredContacts = contacts.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Header title="Contacts" />

      <TextInput
        placeholder="Search Contact..."
        style={styles.input}
        value={search}
        onChangeText={setSearch}
      />

      <Text style={styles.count}>
        Total Contacts : {filteredContacts.length}
      </Text>

      <MyButton
        title="Load Contacts"
        onPress={getContacts}
      />

      {filteredContacts.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>
            No Contacts Found
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredContacts}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refreshContacts}
            />
          }
          renderItem={({ item }) => {
            const phone =
              item.phoneNumbers &&
                item.phoneNumbers.length > 0
                ? item.phoneNumbers[0].number
                : null;

            return (
              <View style={styles.card}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {item.name.charAt(0)}
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>
                    {item.name}
                  </Text>

                  <Text>
                    {phone ? phone : "No Number"}
                  </Text>
                </View>

                <MyButton
                  title="Copy"
                  onPress={() => copyNumber(phone)}
                />
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  input: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },

  count: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10,
    marginBottom: 10,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  avatarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontSize: 20,
    color: "gray",
  },
});