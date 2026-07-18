
import React, { useState } from "react";

import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    Alert,
} from "react-native";

import Header from "../../components/header";
import SurveyCard from "../../components/SurveyCard";
import MyButton from "../../components/MyButton";


export default function HistoryScreen() {


    const [surveys, setSurveys] = useState([

        {
            id: "1",
            site: "ABC Construction",
            client: "Patel Company",
            priority: "High",
        },


        {
            id: "2",
            site: "Sunrise Mall",
            client: "Reliance",
            priority: "Medium",
        },


        {
            id: "3",
            site: "Road Inspection",
            client: "Government",
            priority: "Low",
        },


    ]);


    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("All");




    const deleteSurvey = (id) => {


        Alert.alert(
            "Delete Survey",
            "Are you sure you want to delete?",

            [

                {
                    text: "Cancel",
                },


                {
                    text: "Delete",

                    onPress: () => {

                        setSurveys(
                            surveys.filter(
                                item => item.id !== id
                            )
                        );

                    }

                }

            ]

        );

    };




    const viewDetails = (item) => {


        Alert.alert(

            "Survey Details",

            `
Site:
${item.site}

Client:
${item.client}

Priority:
${item.priority}
      `

        );

    };




    const filteredData =
        surveys.filter((item) => {


            const searchMatch =
                item.site
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );


            const priorityMatch =
                filter === "All"
                ||
                item.priority === filter;


            return searchMatch && priorityMatch;


        });



    return (

        <View style={styles.container}>


            <Header title="Survey History" />


            <TextInput

                placeholder="Search Survey"

                value={search}

                onChangeText={setSearch}

                style={styles.input}

            />



            <Text style={styles.title}>
                Filter Priority
            </Text>



            <View style={styles.buttons}>


                <MyButton

                    title="All"

                    onPress={() => setFilter("All")}

                />


                <MyButton

                    title="High"

                    onPress={() => setFilter("High")}

                />


                <MyButton

                    title="Medium"

                    onPress={() => setFilter("Medium")}

                />


                <MyButton

                    title="Low"

                    onPress={() => setFilter("Low")}

                />


            </View>



            {
                filteredData.length === 0 ?


                    (

                        <View style={styles.empty}>

                            <Text style={styles.emptyText}>
                                No Survey Found
                            </Text>

                        </View>
                    )
                    :
                    (
                        <FlatList
                            data={filteredData}
                            keyExtractor={
                                item => item.id
                            }
                            renderItem={
                                ({ item }) => (
                                    <View>
                                        <SurveyCard
                                            site={item.site}
                                            client={item.client}
                                            priority={item.priority}
                                        />
                                        <MyButton
                                            title="View Details"
                                            onPress={() =>
                                                viewDetails(item)
                                            }
                                        />
                                        <MyButton
                                            title="Delete"
                                            onPress={() =>
                                                deleteSurvey(item.id)
                                            }
                                        />
                                    </View>
                                )
                            }
                        />
                    )
            }
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5"
    },
    input: {
        backgroundColor: "#fff",
        margin: 10,
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc"
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        margin: 10
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    empty: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    emptyText: {
        fontSize: 22,
        color: "gray"
    }
});