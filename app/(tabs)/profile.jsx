import {
    View,
    Text,
    StyleSheet
} from "react-native";


import Header from "../../components/header";


export default function Profile() {


    return (

        <View style={styles.container}>


            <Header title="Profile" />


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
        backgroundColor: "#F5F5F5"
    },


    card: {
        backgroundColor: "#fff",
        margin: 20,
        padding: 20,
        borderRadius: 10
    },


    text: {
        fontSize: 18,
        marginBottom: 10
    }


});